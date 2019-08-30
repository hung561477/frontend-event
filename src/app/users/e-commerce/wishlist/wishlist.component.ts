import { Component } from '@angular/core';
import { EventsService } from 'src/app/share/service/event.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-wishlist-card',
  styleUrls: ['./wishlist.component.scss'],
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent {

  flipped = false;
  count: any;
  countNum: number;

  constructor(private event: EventsService, private auth: AuthenticationService) {
    this.event.getWishlistInvent().subscribe(data => {
      if (data.code === 200) {
        this.count = data.data;
        this.countNum = this.count.count;
      } else {
        this.auth.tokenExpire();
      }
    });
  }

  toggleFlipView() {
    this.flipped = !this.flipped;
  }
}
