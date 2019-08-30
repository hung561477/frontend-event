import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyPasswordComponent } from './components/verify-password.component';
const routes: Routes = [
  {
    path: '',
    component: VerifyPasswordComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VerifyPasswordRoutingModule { }
