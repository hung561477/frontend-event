import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/share/service/event.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-top-ongoing',
  styleUrls: ['./top-ongoing.component.scss'],
  templateUrl: './top-ongoing.component.html',
})
export class TopOngoingComponent implements OnInit {

  constructor(private event: EventsService, private router: Router, private auth: AuthenticationService) { }

  dataTopOngoing: any;
  topOngoing: any;

  ngOnInit() {
    this.event.getAllInventorySeller().subscribe(data => {
      if (data.code === 200) {
        this.dataTopOngoing = data.data;
        this.topOngoing = this.dataTopOngoing.inventory;
      } else {
        this.auth.tokenExpire();
      }
    });
  }

  goRecentEvent() {
    this.router.navigate(['/users/monitoring']);
  }

  goEventDetail(id: any) {
    this.router.navigateByUrl(`/users/event-detail/${id}`);
  }
}
