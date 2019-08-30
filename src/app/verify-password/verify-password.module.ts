import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyPasswordRoutingModule } from './verify-password.routing';
import { VerifyPasswordComponent } from './components/verify-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VerifyPasswordRoutingModule
    ],
    declarations: [
        VerifyPasswordComponent
    ]
})
export class VerifyPasswordModule {
}
