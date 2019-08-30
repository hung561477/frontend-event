import { NgModule } from '@angular/core';
import { VerifyRoutingModule } from './verify-email.routing';
import { VerifyComponent } from './components/verify-email.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        VerifyRoutingModule
    ],
    declarations: [
        VerifyComponent
    ]
})
export class VerifyModule {
}
