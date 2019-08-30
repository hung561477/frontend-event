import { Component, ViewEncapsulation, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/share/service/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'event-item-recent-event',
  styleUrls: ['./item-recent.component.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './item-recent.component.html',
})
export class ItemRecentEventComponent implements OnChanges, OnDestroy {
  showNavigationIndicators = false;
  images: any;
  completed: any = [];
  @Input() valueInput: any;
  pathUrl: any;
  tag: any = [];
  successMessage = '';
  time: number;
  dataImg = [];
  private subscriptions = new Subscription();

  constructor(private router: Router, private editEvents: EventsService, private route: ActivatedRoute,
    private auth: AuthenticationService) {
    this.pathUrl = this.route.snapshot.routeConfig.path;
  }

  ngOnChanges(changes: SimpleChanges) {
    const temp = changes.valueInput.currentValue;
    this.completed = temp;
    this.tag = this.completed.tag.split(',');
    const oneDay = 24 * 60 * 60 * 1000;
    const date1 = moment(new Date());
    const date2 = moment(new Date(this.completed.date_from));
    this.time = Math.round((date2.diff(date1))/oneDay);
    if (this.time === -0) {
      this.time = 0;
    }
    if (this.completed.image !== undefined) {
      for (const item of this.completed.image) {
        this.dataImg.push(item.url);
      }
    }

    this.images = this.dataImg;
  }

  goEventDetail(id: any) {
    this.router.navigateByUrl(`/users/event-detail/${id}`);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
