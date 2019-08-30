import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/share/service/event.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-recently-sold',
  styleUrls: ['./recently-sold.component.scss'],
  templateUrl: './recently-sold.component.html',
})
export class RecentlySoldComponent implements OnInit {

  constructor(private event: EventsService, private router: Router, private auth: AuthenticationService) { }

  dataRecentlySold: any;
  recentlySold: any;

  ngOnInit() {
    this.event.getRecentlySold().subscribe(data => {
      if (data.code === 200) {
        this.dataRecentlySold = data.data;
        this.recentlySold = this.dataRecentlySold.event;
      } else {
        this.auth.tokenExpire();
      }
    });
  }

  delEvent(id: any) {
    this.event.delEventId(id).subscribe(val => {
      if (val.code === 205) {
        this.ngOnInit();
      } else {
        this.auth.tokenExpire();
      }
    });
  }

  goRecentEvent() {
    this.router.navigate(['/users/monitoring']);
  }
}
