import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './share/service/auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren: './page/page.module#PageModule'
  },
  {
    path: 'users', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard]
  },
  {
    path: ':hashcode', loadChildren: './verify-email/verify-email.module#VerifyModule'
  },
  {
    path: 'forgot/:keyhash', loadChildren: './verify-password/verify-password.module#VerifyPasswordModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
