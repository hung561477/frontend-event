import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyComponent } from './components/verify-email.component';
const routes: Routes = [
  {
    path: '',
    component: VerifyComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VerifyRoutingModule { }
