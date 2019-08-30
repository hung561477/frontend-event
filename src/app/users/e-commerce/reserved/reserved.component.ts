import { Component } from '@angular/core';
import { EventsService } from 'src/app/share/service/event.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-reserved-card',
  styleUrls: ['./reserved.component.scss'],
  templateUrl: './reserved.component.html',
})
export class ReservedComponent {

  flipped = false;
  count: any;
  countNum: number;

  constructor(private event: EventsService, private auth: AuthenticationService) {
    this.event.getReservedInvent().subscribe(data => {
      if (data.code === 200) {
        this.count = data.data;
        this.countNum = this.count.count;
      } else {
        this.auth.tokenExpire();
      }
    });
  }

  toggleView() {
    this.flipped = !this.flipped;
  }
}
