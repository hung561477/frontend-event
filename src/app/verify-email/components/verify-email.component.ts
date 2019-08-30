import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
    selector: 'event-verify',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyComponent implements OnInit {
    paramHash: any;
    isActive = false;

    constructor(private route: ActivatedRoute,
        private auth: AuthenticationService,
        private router: Router) {
        this.paramHash = this.route.snapshot.queryParams.hash
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params.hashcode === 'verify') {
                this.auth.verifyEmail(this.paramHash).subscribe(val => {
                    if (val.code !== 204) {
                        this.isActive = !this.isActive;
                    } else {
                        this.isActive = this.isActive;
                    }
                });
            }
        });
    }

    backHome() {
        this.router.navigate(['']);
    }
}
