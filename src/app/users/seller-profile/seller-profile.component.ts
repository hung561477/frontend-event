import { Component, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../share/service/authentication.service';
import { first } from 'rxjs/operators';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../share/model/user-login.model';
import { Md5 } from 'md5-typescript';
import { EventsService } from 'src/app/share/service/event.service';
import { StepService } from 'src/app/share/service/step.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'event-seller-profile',
    templateUrl: './seller-profile.component.html',
    styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements AfterViewInit {
    closeResult = '';
    // img1: any;
    modalName = '';
    user: any = {};
    avatar: any;
    avatarBuyer: any;
    disableEdit = true;
    company: any = {
        'address': '',
        'description': '',
        'email': '',
        'id': null,
        'image': null,
        'name': '',
        'industry': '',
        'website': ''
    };

    userBuyer: any = {
        'category': '',
        'company': '',
        'company_name': '',
        'create_date': '',
        'first_name': '',
        'id': null,
        'image': '',
        'last_name': '',
        'phone': '',
        'password': '',
        'new_password': '',
        'confirm_password': '',
        'role': {}
    };

    userModel: any = {
        'first_name': '',
        'last_name': '',
        'phone': null,
        'id': null,
        'username': '',
        'password': ''
    };

    buyerModel: any = {
        'first_name': '',
        'last_name': '',
        'phone': null,
        'password': ''
    };

    validate: any = {
        buyer: {
            'first_name': '',
            'last_name': '',
            'password': '',
            'new_password': '',
            'confirm_password': '',
            'phone': ''
        }
    }
    buyerId: number;
    listUser = [];
    image: any = {};
    formAddUser: FormGroup;
    updateBuyerForm: FormGroup;
    reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d.!@#$%^&*()_+]{6,}$/;
    isPasswordBuyer = 0;
    isPasswordBuyerConfirm = 0;

    constructor(private modalService: NgbModal, private auth: AuthenticationService,
        private formBuilder: FormBuilder, private event: EventsService, private step: StepService) {
        this.user = auth.getUser();
        this.loadUserInfo();
        this.loadUserList();
        this.updateFormBuyerUser();
    }

    ngAfterViewInit() {

    }

    updateFormBuyerUser() {
        this.updateBuyerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            new_password: ['', [Validators.required, Validators.pattern(this.reg)]],
            confirm_password: ['', [Validators.required, Validators.pattern(this.reg)]],
            phone: ['', Validators.required],
        });
    }

    get g() { return this.updateBuyerForm.controls; }

    passwordBuyer(event) {
        if (event.target.value === '') {
            this.isPasswordBuyer = 2;
        } else {
            this.isPasswordBuyer = 1;
        }
    }

    passwordBuyerConfirm(event) {
        if (event.target.value === '') {
            this.isPasswordBuyerConfirm = 2;
        } else {
            this.isPasswordBuyerConfirm = 1;
        }
    }

    checkValidate(value, validate, field, text = '') {
        if (!value) {
            if (text) {
                this.validate[validate][field] = text;
            } else {
                this.validate[validate][field] = 'field is required!';
            }
            return false;
        } else {
            this.validate[validate][field] = '';
            return true;
        }
    }



    createForm() {
        this.formAddUser = this.formBuilder.group({
            name_user: new FormControl(this.userModel.first_name, [
                Validators.required
            ]),
            last_name_input: new FormControl(this.userModel.last_name, [
                Validators.required
            ]),
            phone_input: new FormControl(this.userModel.phone, [
                Validators.required,
                Validators.pattern('^(0|[1-9][0-9]*)$')
            ]),
            email_input: new FormControl(this.userModel.username, [
                Validators.required,
                Validators.email
            ]),
            email_confirm_input: new FormControl(this.userModel.username, [
                Validators.required,
                Validators.email
            ]),
            password_input: new FormControl(this.userModel.password, [
                Validators.required,
                Validators.minLength(5)
            ]),
            password_confirm_input: new FormControl(this.userModel.password, [
                Validators.required,
                Validators.minLength(5)
            ])
        });
    }

    onSubmit() {
        const first_name = this.updateBuyerForm.getRawValue().first_name;
        const last_name = this.updateBuyerForm.getRawValue().last_name;
        // const password = this.updateBuyerForm.getRawValue().password;
        const new_password = this.updateBuyerForm.getRawValue().new_password;
        const confirm_password = this.updateBuyerForm.getRawValue().confirm_password;
        const phone = this.updateBuyerForm.getRawValue().phone;
        if (
            this.checkValidate(first_name, 'buyer', 'first_name')
            && this.checkValidate(last_name, 'buyer', 'last_name')
            && this.checkValidate(phone, 'buyer', 'phone')
            && this.checkValidate(new_password, 'buyer', 'new_password')
            && this.checkValidate(confirm_password, 'buyer', 'confirm_password')
            && this.checkValidate(new_password === confirm_password, 'buyer', 'confirm_password',
                'Your password confirmation is different from the original. Please try again')
        ) {
            const passwordHash = Md5.init(this.updateBuyerForm.getRawValue().new_password);
            this.buyerModel.first_name = first_name;
            this.buyerModel.last_name = last_name;
            this.buyerModel.phone = phone;
            this.buyerModel.id = this.buyerId;
            this.buyerModel.password = passwordHash;
            this.auth.editUser(this.buyerModel)
                .subscribe((res) => {
                    if (res.code === 201) {
                        this.loadUserInfo();
                    } else {
                        this.auth.tokenExpire();
                    }
                });

        }
    }

    openModal(content, name, user?) {
        this.modalName = name;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result
            .then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        switch (name) {
            case 'Add Users': {
                this.disableEdit = false;
                this.userModel = {};
                this.createForm();
                break;
            }
            case 'Edit User': {
                this.disableEdit = true;
                this.createForm();
                this.userModel = user;
                break;
            }
        }
    }

    openDelete(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result
            .then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    imageChanged(event) {
        const file = event.target.files;

        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file[0]);
        }
    }

    _handleReaderLoaded(readerEvt) {
        // const binaryString = readerEvt.target.result;
        // this.img1 = btoa(binaryString);
    }

    loadUserInfo() {
        this.auth.getUserInfo()
            .pipe(first())
            .subscribe(async (user: any) => {
                if (user.data.role.role === 'BUYER') {
                    this.userBuyer = user.data;
                    this.avatar = user.data.image;
                    $('.dropify4').dropify({
                        defaultFile: this.avatar,
                    });
                    this.buyerId = user.data.id;
                    this.updateBuyerForm.controls['first_name'].setValue(this.userBuyer.first_name);
                    this.updateBuyerForm.controls['last_name'].setValue(this.userBuyer.last_name);
                    this.updateBuyerForm.controls['phone'].setValue(this.userBuyer.phone);
                }
                this.company = await user.data.company;
                this.step.setCover(this.company.image);
                this.event.setReloadAvatar(true);
            });
    }

    loadUserList() {
        this.auth.getListUser()
            .pipe(first())
            .subscribe(async (userList: any) => {
                this.listUser = await userList.data;
            });
    }

    inputFile(event: any) {
        const fileReader = new FileReader();
        const file = event.target.files[0];
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            this.image.description = event.target.files[0].name;
            const formModel = new FormData();
            formModel.set('image', event.target.files[0]);
            this.event.submitAvatar(formModel).subscribe(val => {
                this.avatarBuyer = val.data.url;
            });
        };
    }

    saveEdit(editName: string) {
        switch (editName) {
            case 'Company': {
                if (this.avatarBuyer !== '') {
                    this.company.image = this.avatarBuyer;
                }
                this.auth.editCompany(this.company).subscribe(res => {
                    if (res.code === 200) {
                        this.loadUserInfo();
                        this.modalService.dismissAll();
                    } else {
                        this.auth.tokenExpire();
                    }
                });
                break;
            }
            case 'User': {
                if (this.disableEdit) {
                    this.auth.editUser(this.userModel)
                        .subscribe((res) => {
                            if (res.code === 201) {
                                this.loadUserList();
                                this.modalService.dismissAll();
                            } else {
                                this.auth.tokenExpire();
                            }
                        });
                } else {
                    const passwordHash = Md5.init(this.userModel.password);
                    const body = new UserInterface(
                        this.userModel.first_name,
                        this.userModel.last_name,
                        this.userModel.phone,
                        this.userModel.email,
                        passwordHash,
                        this.company.id,
                        '');
                    this.auth.addUser(body)
                        .subscribe((res) => {
                            if (res.code === 201) {
                                this.loadUserList();
                                this.modalService.dismissAll();
                            } else {
                                this.auth.tokenExpire();
                            }
                        });
                }
                break;
            }
        }


    }
}
