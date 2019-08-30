import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Md5 } from 'md5-typescript';
import { AuthenticationService } from '../../../share/service/authentication.service';
import { UserInfo, UserInterface } from '../../../share/model/user-login.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EventsService } from 'src/app/share/service/event.service';

declare var $: any;

@Component({
    selector: 'event-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss'],
})

export class SignUpComponent implements OnInit {
    registerBuyerForm: FormGroup;
    registerCompanyForm: FormGroup;
    registerSellerForm: FormGroup;
    modalRef: BsModalRef;
    closeResult = '';
    isSubscribe = false;
    isAcceptTerm = false;
    isSignup = true;
    public userRegister: UserInfo = <UserInfo>{};
    isActive = true;
    typeEye = 'password';
    image: any = {};
    submitted = false;
    isFirstName = 0;
    isLastName = 0;
    isCompanyName = 0;
    isCategoryName = 0;
    isEmail = 0;
    isReEmail = 0;
    isPhone = 0;
    isPassword = 0;
    isPasswordSeller = 0;
    isCompanyNameSeller = 0;
    isPasswordSellerConfirm = 0;
    isAddress = 0;
    isWebsite = 0;
    isIndustry = 0;
    isComDes = 0;
    isDone = true;
    isActivePass = 'password';
    isPass = false;
    avatarBuyer: any;
    loading = false;
    company: any = {
        'name': '',
        'address': '',
        'website': '',
        'industry': '',
        'description': '',
        'image': []
    };
    validate: any = {
        company: {
            'name': '',
            'address': '',
            'website': '',
            'industry': '',
            'description': '',
            'image': ''
        },
        seller: {
            'seller_first_name': '',
            'seller_last_name': '',
            'seller_phone': '',
            'seller_username': '',
            'seller_confirm_username': '',
            'seller_password': '',
            'seller_confirm_password': ''
        }
    };
    userModel: any = {
        'first_name': '',
        'last_name': '',
        'phone': null,
        'username': '',
        'company': null,
        'password': ''
    };

    message: any = {
        'code': 0,
        'message': 'Nothing'
    };
    messageBuyer: any = {
        'code': 0,
        'message': 'Nothing'
    };
    phone_number: any;
    phone_number_standard = '';
    phone_number_preffered = '';
    preferredCountries = ['us', 'au', 'ru', 'gb'];
    reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d.!@#$%^&*()_+]{6,}$/;
    @Input() valueInput: any;
    @Output() loginForm = new EventEmitter<boolean>();

    constructor(private authService: AuthenticationService,
        private modalService: NgbModal,
        private modalServices: BsModalService,
        private formBuilder: FormBuilder,
        private event: EventsService) {
        this.createFormCompany();
        this.createFormSellerUser();
        this.createFromBuyerUser();
    }

    ngOnInit() {
    }

    createFormCompany() {
        this.registerCompanyForm = this.formBuilder.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            website: ['', Validators.required],
            industry: ['', Validators.required],
            description: ['', Validators.required],
            company_accept_term: [false, Validators.required],
            company_subscribe: [false, Validators.required],
        });
    }

    createFormSellerUser() {
        this.registerSellerForm = this.formBuilder.group({
            seller_first_name: ['', Validators.required],
            seller_last_name: ['', Validators.required],
            seller_phone: ['', Validators.required],
            seller_username: ['', Validators.required],
            seller_confirm_username: ['', Validators.required],
            seller_password: ['', [Validators.required, Validators.pattern(this.reg)]],
            seller_confirm_password: ['', [Validators.required, Validators.pattern(this.reg)]]
        });
    }

    createFromBuyerUser() {
        this.registerBuyerForm = this.formBuilder.group({
            buyer_first_name: ['', Validators.required],
            buyer_last_name: ['', Validators.required],
            buyer_company_name: ['', Validators.required],
            buyer_category: ['', Validators.required],
            email_buyer: this.formBuilder.group({
                buyer_username: ['', Validators.required],
                buyer_confirm_username: ['', Validators.required],
            }),
            buyer_phone: ['', Validators.required],
            buyer_password: ['', [Validators.required, Validators.pattern(this.reg)]],
            buyer_image: this.avatarBuyer,
            buyer_subscribe: [false, Validators.required],
            buyer_accept_term: [false, Validators.required]
        });
    }

    get f() { return this.registerBuyerForm.controls; }
    get g() { return this.registerSellerForm.controls; }

    setEye(input: string) {
        this.typeEye = input;
    }

    firstName(event) {
        if (event.target.value === '') {
            this.isFirstName = 2;
        } else {
            this.isFirstName = 1;
        }
        this.checkField();
    }

    lastName(event) {
        if (event.target.value === '') {
            this.isLastName = 2;
        } else {
            this.isLastName = 1;
        }
        this.checkField();
    }

    companyField(event) {
        if (event.target.value === '') {
            this.isCompanyName = 2;
        } else {
            this.isCompanyName = 1;
        }
        this.checkField();
    }

    category(event) {
        if (event.target.value === '') {
            this.isCategoryName = 2;
        } else {
            this.isCategoryName = 1;
        }
        this.checkField();
    }

    email(event) {
        if (event.target.value === '') {
            this.isEmail = 2;
        } else {
            this.isEmail = 1;
        }
        this.checkField();
    }

    reEmail(event) {
        if (event.target.value === '') {
            this.isReEmail = 2;
        } else {
            this.isReEmail = 1;
        }
        this.checkField();
    }

    phone(event) {
        if (event.target.value === '') {
            this.isPhone = 2;
        } else {
            this.isPhone = 1;
        }
        this.checkField();
    }

    companySeller(event) {
        if (event.target.value === '') {
            this.isCompanyNameSeller = 2;
        } else {
            this.isCompanyNameSeller = 1;
        }
        this.checkField();
    }

    addressSeller(event) {
        if (event.target.value === '') {
            this.isAddress = 2;
        } else {
            this.isAddress = 1;
        }
        this.checkField();
    }

    websiteSeller(event) {
        if (event.target.value === '') {
            this.isWebsite = 2;
        } else {
            this.isWebsite = 1;
        }
        this.checkField();
    }

    industrySeller(event) {
        if (event.target.value === '') {
            this.isIndustry = 2;
        } else {
            this.isIndustry = 1;
        }
        this.checkField();
    }

    comDesSeller(event) {
        if (event.target.value === '') {
            this.isComDes = 2;
        } else {
            this.isComDes = 1;
        }
        this.checkField();
    }

    password(event) {
        if (event.target.value === '') {
            this.isPassword = 2;
        } else {
            this.isPassword = 1;
        }
        this.checkField();
    }

    passwordSeller(event) {
        if (event.target.value === '') {
            this.isPasswordSeller = 2;
        } else {
            this.isPasswordSeller = 1;
        }
    }

    passwordSellerConfirm(event) {
        if (event.target.value === '') {
            this.isPasswordSellerConfirm = 2;
        } else {
            this.isPasswordSellerConfirm = 1;
        }
    }

    checkField() {
        if (this.isFirstName === 1 && this.isLastName === 1 &&
            this.isCompanyName === 1 && this.isCategoryName === 1 &&
            this.isEmail === 1 && this.isReEmail === 1 &&
            this.isPhone === 1 && this.isPassword === 1) {
            this.isDone = false;
        } else {
            this.isDone = true;
        }
    }

    changeHide() {
        this.isPass = !this.isPass;
        if (this.isPass) {
            this.isActivePass = 'type';
        } else {
            this.isActivePass = 'password';
        }
    }

    checkbox() {
        if (this.registerBuyerForm.getRawValue().buyer_accept_term &&
            $('#buyer_first_name').val() && $('#buyer_last_name').val() && $('#buyer_company_name').val() && $('#buyer_category').val()
            && $('#buyer_username').val() && $('#buyer_confirm_username').val() && $('#buyer_phone').val() && $('#buyer_password').val()) {
            this.isSignup = false;
        } else {
            this.isSignup = true;
        }
    }

    checkboxCompany() {

    }

    inputFile(event: any) {
        const fileReader = new FileReader();
        const file = event.target.files[0];
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            // this.image.file = fileReader.result.split(',')[1];
            this.image.description = event.target.files[0].name;
            // this.image.extension = event.target.files[0].name.split('.')[1];
            const formModel = new FormData();
            formModel.set('image', event.target.files[0]);
            this.event.submitAvatar(formModel).subscribe(val => {
                this.avatarBuyer = val.data.url;
            });
        };
    }

    onSubmit(content: TemplateRef<any>) {
        this.loading = true;
        const passwordHash = Md5.init(this.registerBuyerForm.getRawValue().buyer_password);
        const body = new UserInterface(
            this.registerBuyerForm.getRawValue().buyer_first_name,
            this.registerBuyerForm.getRawValue().buyer_last_name,
            this.registerBuyerForm.getRawValue().buyer_phone,
            this.registerBuyerForm.getRawValue().email_buyer.buyer_username,
            passwordHash,
            this.registerBuyerForm.getRawValue().buyer_company_name,
            this.registerBuyerForm.getRawValue().buyer_category,
            this.avatarBuyer)
        this.authService.submitRegister(body)
            .subscribe(res => {
                if (res.code === 201) {
                    this.modalRef = this.modalServices.show(content);
                    this.modalService.dismissAll();
                    this.loading = false;
                    this.valueInput.hide();
                    this.loginForm.emit(true);
                } else if (res.code === 409 || res.code === 408 || res.code === 407) {
                    this.messageBuyer = res;
                    this.loading = false;
                }
            });
    }

    addUser(content: TemplateRef<any>) {
        this.loading = true;
        const firstName = this.registerSellerForm.getRawValue().seller_first_name;
        const lastName = this.registerSellerForm.getRawValue().seller_last_name;
        const phone = this.registerSellerForm.getRawValue().seller_phone;
        const username = this.registerSellerForm.getRawValue().seller_username;
        const confirmUsername = this.registerSellerForm.getRawValue().seller_confirm_username;
        const password = this.registerSellerForm.getRawValue().seller_password;
        const confirmPassword = this.registerSellerForm.getRawValue().seller_confirm_password;
        if (
            this.checkValidate(firstName, 'seller', 'seller_first_name')
            && this.checkValidate(lastName, 'seller', 'seller_last_name')
            && this.checkValidate(phone, 'seller', 'seller_phone')
            && this.checkValidate(username, 'seller', 'seller_username')
            && this.checkValidate(confirmUsername, 'seller', 'seller_confirm_username')
            && this.checkValidate(username === confirmUsername, 'seller', 'seller_confirm_username',
                'username and confirm username has equal')
            && this.checkValidate(password, 'seller', 'seller_password')
            && this.checkValidate(confirmPassword, 'seller', 'seller_confirm_password')
            && this.checkValidate(password === confirmPassword, 'seller', 'seller_confirm_password',
                'Your password confirmation is different from the original. Please try again')
        ) {
            const passwordHash = Md5.init(this.registerSellerForm.getRawValue().seller_password);
            const body = new UserInterface(
                this.registerSellerForm.getRawValue().seller_first_name,
                this.registerSellerForm.getRawValue().seller_last_name,
                this.registerSellerForm.getRawValue().seller_phone,
                this.registerSellerForm.getRawValue().seller_username,
                passwordHash,
                this.userModel.company,
                '');
            this.authService.addUser(body)
                .subscribe(res => {
                    if (res.code === 201) {
                        this.loading = false;
                        this.modalRef = this.modalServices.show(content);
                        this.modalService.dismissAll();
                        this.valueInput.hide();
                        this.loginForm.emit(true);
                    } else if (res.code === 409 || res.code === 408 || res.code === 407) {
                        this.message = res;
                        this.loading = false;
                    }
                });
        }
    }

    openModal(content) {
        this.loading = true;
        if (
            this.checkValidate(this.registerCompanyForm.getRawValue().name, 'company', 'name')
            && this.checkValidate(this.registerCompanyForm.getRawValue().address, 'company', 'address')
            && this.checkValidate(this.registerCompanyForm.getRawValue().website, 'company', 'website')
            && this.checkValidate(this.registerCompanyForm.getRawValue().industry, 'company', 'industry')
            && this.checkValidate(this.registerCompanyForm.getRawValue().description, 'company', 'description')
            && this.checkValidate(this.image.description, 'company', 'image')
        ) {
            const temp = this.avatarBuyer;
            this.company = this.registerCompanyForm.getRawValue();
            this.company.image = temp;
            this.authService.createCompany(this.company)
                .subscribe(res => {
                    this.userModel.company = res.data.id;
                    if (res.code === 201) {
                        this.loading = false;
                        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
                            .result
                            .then((result) => {
                                this.closeResult = `Closed with: ${result}`;
                            }, (reason) => {
                                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                            });
                    }
                });
        } else {
            this.loading = false;
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

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}
