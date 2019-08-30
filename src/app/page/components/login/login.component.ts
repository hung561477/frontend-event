import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'md5-typescript';
import { UserLogin } from '../../../share/model/user-login.model';
import { AuthenticationService } from '../../../share/service/authentication.service';
import { AlertService } from '../../../share/service/alert.service';
import { ModalDirective } from 'ngx-bootstrap';
import { EventsService } from 'src/app/share/service/event.service';
import { StepService } from 'src/app/share/service/step.service';

@Component({
    selector: 'event-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    forgotForm: FormGroup;
    error = '';
    hash: any = [];
    dataLogin: any = [];
    passwordHash: any;
    rememberUser: any = {
        username: '',
        password: ''
    }
    lastName = '';
    isUsername = 0;
    isPassword = 0;
    role = '';
    typeEye = true;
    textAlert: string;
    isDone = false;
    isChecked = false;
    @Input() valueInput: any;
    @ViewChild('childModal') childModal: ModalDirective;
    @ViewChild('childModal1') childModal1: ModalDirective;
    public credential: UserLogin = <UserLogin>{};
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private event: EventsService,
        private step: StepService) { }

    ngOnInit() {
        this.isChecked = this.authenticationService.getRememberMe();
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.forgotForm = this.formBuilder.group({
            email: ['', Validators.required]
        })
        if (this.isChecked) {
            const userMember = JSON.parse(localStorage.getItem('remember_user'));
            this.loginForm.controls['username'].setValue(userMember.username);
            this.loginForm.controls['password'].setValue(userMember.password);
            // this.passwordHash = userMember.password;
        } else {
            this.loginForm.controls['username'].setValue('');
            this.loginForm.controls['password'].setValue('');
        }
    }

    get f() { return this.loginForm.controls; }

    setEye() {
        this.typeEye = !this.typeEye;
    }

    username(event) {
        if (event.target.value === '') {
            this.isUsername = 2;
        } else {
            this.isUsername = 1;
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

    checkField() {
        if (this.isUsername === 1 && this.isPassword === 1) {
            this.isDone = false;
        } else {
            this.isDone = true;
        }
    }

    showChildModal(): void {
        this.childModal.show();
    }

    hideChildModal(): void {
        this.childModal.hide();
    }

    hideChildModal1(): void {
        this.childModal1.hide();
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.credential = this.loginForm.getRawValue();
            this.passwordHash = Md5.init(this.credential.password);
            // this.passwordHash = this.passwordHash;
            this.hash.push({ username: this.credential.username, password: this.passwordHash });
            for (const login of this.hash) {
                this.dataLogin = login;
            }
            this.authenticationService.login(this.dataLogin)
                .subscribe(
                    res => {
                        if (res.code === 200) {
                            localStorage.setItem('user', JSON.stringify(res.data));
                            this.lastName = res.data.first_name;
                            this.role = res.data.role;
                            this.valueInput.hide();
                            this.step.setTokenExpire(false);
                            this.authenticationService.getUserInfo().subscribe(val => {
                                localStorage.setItem('userInfo', JSON.stringify(val.data));
                                this.router.navigate(['/users']);
                            })
                        } else {
                            this.textAlert = res.message + ' Please try again!';
                        }
                    },
                    error => {
                        this.alertService.error(error);
                    }
                );
        } else {
            return;
        }
    }

    onSubmitForgot() {
        let email: any;
        if (this.forgotForm.valid) {
            email = this.forgotForm.getRawValue().email;
            this.authenticationService.forgotPassword(email).subscribe(val => {
                this.childModal1.show();
            })
            this.forgotForm.reset();
            this.childModal.hide();
        }
    }

    rememberMe(event) {

        if (event.target.checked) {
            this.authenticationService.setRemember(event.target.checked);
            this.isChecked = this.authenticationService.getRememberMe();
            if (this.loginForm.valid) {
                this.credential = this.loginForm.getRawValue();
                this.rememberUser.username = this.credential.username;
                this.rememberUser.password = Md5.init(this.credential.password);
                localStorage.setItem('remember_user', JSON.stringify(this.rememberUser));
            }
        } else {
            localStorage.removeItem('remember_user');
            this.authenticationService.setRemember(event.target.checked);
            this.isChecked = this.authenticationService.getRememberMe();
        }
    }
}
