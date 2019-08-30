import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/share/service/event.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-not-published',
  styleUrls: ['./not-published.component.scss'],
  templateUrl: './not-published.component.html',
})
export class NotPublishedComponent implements OnInit {

  constructor(private event: EventsService, private router: Router, private auth: AuthenticationService) { }

  dataDraft: any;
  notPublished: any;
  isPublish: any = {};

  ngOnInit() {
    this.event.getNotPublishedEvent().subscribe(data => {
      if (data.code === 200) {
        this.dataDraft = data.data;
        this.notPublished = this.dataDraft.event;
      } else {
        this.auth.tokenExpire();
      }
    });
  }

  changePublish(id: any) {
    this.isPublish.status = 'PUBLISH';
    this.event.submitPublishEvent(id, this.isPublish).subscribe(val => {
      this.ngOnInit();
    });
  }

  goRecentEvent() {
    this.router.navigate(['/users/monitoring']);
  }
}
