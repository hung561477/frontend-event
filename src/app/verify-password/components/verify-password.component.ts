import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Md5 } from 'md5-typescript';

@Component({
    selector: 'event-verify-password',
    templateUrl: './verify-password.component.html',
    styleUrls: ['./verify-password.component.scss']
})
export class VerifyPasswordComponent implements OnInit {
    paramHash: any;
    isActive = false;
    forgotForm: FormGroup;
    newPassword: any = {
        new_password: ''
    };
    message: any = '';
    isPassword = 0;
    isRePassword = 0;
    isDone = true;
    reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d.!@#$%^&*()_+]{6,}$/;

    constructor(private route: ActivatedRoute,
        private auth: AuthenticationService,
        private router: Router,
        private formBuilder: FormBuilder) {
        this.paramHash = this.route.snapshot.params.keyhash;
    }

    ngOnInit() {
        this.forgotForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.pattern(this.reg)]],
            re_password: ['', [Validators.required, Validators.pattern(this.reg), this.passwordConfirming]]
        });
    }

    get f() { return this.forgotForm.controls; }

    password(event) {
        if (event.target.value === '') {
            this.isPassword = 2;
        } else {
            this.isPassword = 1;
        }
        this.checkField();
    }

    re_password(event) {
        if (event.target.value === '') {
            this.isRePassword = 2;
        } else {
            this.isRePassword = 1;
        }
        this.checkField();
    }

    checkField() {
        if (this.isPassword === 1 && this.isRePassword === 1) {
            this.isDone = false;
        } else {
            this.isDone = true;
        }
    }

    passwordConfirming(c: AbstractControl): any {
        if(!c.parent || !c) return;
        const pwd = c.parent.get('password');
        const cpwd = c.parent.get('re_password');
    
        if(!pwd || !cpwd) return ;
        if (pwd.value !== cpwd.value) {
            return { invalid: true };
        }
    }


    onSubmit() {
        if (this.forgotForm.valid) {
            this.newPassword.new_password = Md5.init(this.forgotForm.getRawValue().password);
            this.auth.submitPassword(this.paramHash, this.newPassword).subscribe(val => {
                if (val.code === 200) {
                    this.message = val.message;
                    this.router.navigate(['']);
                } else {
                    this.message = val.message;
                }
            })
        }
    }

    backHome() {
        this.router.navigate(['']);
    }
}
