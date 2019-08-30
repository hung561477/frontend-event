import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-top-seller-profile',
  styleUrls: ['./top-seller-profile.component.scss'],
  templateUrl: './top-seller-profile.component.html',
})
export class TopSellerProfileComponent implements OnInit {
  dataUser: any;
  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.dataUser = this.auth.getUser();
  }
}
