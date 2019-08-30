import { Component, ViewEncapsulation, OnChanges, Input, ViewChild, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { TopMonitoringComponent } from '../../../../users/monitoring/top-monitoring/top-monitoring.component';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../service/event.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-item-mark',
  styleUrls: ['./item-mark.component.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './item-mark.component.html',
})
export class ItemMarkComponent implements OnChanges, OnInit, OnDestroy {
  completed: any = [];
  @Input() valueInput: any;
  tag: any = [];
  successMessage = '';
  time: number;
  dataImg: any = [];
  role: any;
  param: any;
  from = 0;
  to = 0;

  private subscriptions = new Subscription();

  constructor(private router: Router, private editEvents: EventsService, private auth: AuthenticationService,
    private route: ActivatedRoute) {
    this.role = auth.getUser().role;
    this.param = this.route.snapshot.routeConfig.path.split('/')[0];
  }

  @ViewChild(TopMonitoringComponent)
  private temp: TopMonitoringComponent;

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    const temp = changes.valueInput.currentValue;
    this.completed = temp;
    this.tag = this.completed.tag.split(',');
    const date1 = new Date(this.completed.date_from);
    const date2 = new Date(this.completed.date_to);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.time = diffDays;
    if (this.completed.image !== undefined) {
      this.completed.image.forEach(element => {
        this.dataImg.push({ image: element.url });
      });
    } else if (this.completed.images === undefined) {
      this.dataImg;
    } else {
      this.completed.images.forEach(element => {
        this.dataImg.push({ image: element.url });
      });
    }
    if (this.completed === null) {
      this.from = 0;
      this.to = 0;
    } else {
      this.from = this.completed.budget_from;
      this.to = this.completed.budget_to;
    }
  }

  goEventDetail(id: any) {
    this.subscriptions = this.editEvents.getEventId(id).subscribe(
      data => {
        if (data.code === 200) {
          this.editEvents.setEventDetail(data.data);
          this.router.navigateByUrl(`/users/event-detail/${id}`);
        } else {
          this.auth.tokenExpire();
        }
      });
  }

  addWishlist(id: any, wishlist) {
    const status = [];
    let data: any;
    status.push({ status: wishlist });
    status.forEach(element => {
      data = element;
    });
    this.editEvents.submitStatusEvent(id, data)
      .subscribe(
        (value) => {
          if (value.code === 201 || value.code === 200) {
            if (this.param === 'event-detail') {
              this.editEvents.setDataUpdateDetail(1);
            } else {
              this.editEvents.setDataUpdate(1);
            }
          }
        });
  }

  removeWishlist(id: any) {
    this.editEvents.removeStatusInvent(id)
      .subscribe(
        (value) => {
          if (value.code === 201 || value.code === 200) {
            if (this.param === 'event-detail') {
              this.editEvents.setDataUpdateDetail(1);
            } else {
              this.editEvents.setDataUpdate(1);
            }
          }
        });
  }

  reloadEvent() {
    this.editEvents.getAllEventSeller()
      .subscribe(
        (val: any) => {
          if (val.code === 200) {
            for (const item of val.data.event) {
              this.completed = item;
            }
          } else {
            this.auth.tokenExpire();
          }
        });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
