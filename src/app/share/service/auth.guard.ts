import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate() {
        if (localStorage.getItem('user')) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}
