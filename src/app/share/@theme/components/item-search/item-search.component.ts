import { Component, ViewEncapsulation, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/share/service/event.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'event-item-search-event',
  styleUrls: ['./item-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './item-search.component.html',
})
export class ItemSearchEventComponent implements OnInit, OnChanges, OnDestroy {
  showNavigationIndicators = false;
  images: any;
  completed: any = [];
  @Input() valueInput: any;
  tag: any = [];
  successMessage = '';
  time: number;
  dataImg = [];
  isLike = true;
  public subscriptions = new Subscription();

  constructor(private router: Router, private editEvents: EventsService,
    private auth: AuthenticationService) { }

  ngOnInit() {
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
    this.subscriptions.add(
      this.editEvents.getEventId(id).subscribe(
        data => {
          if (data.code === 200) {
            this.editEvents.setEventDetail(data.data);
            this.router.navigateByUrl(`/users/event-detail/${id}`);
          } else {
            this.auth.tokenExpire();
          }
        })
    );
  }

  likeEvent(id: any) {
    this.editEvents.submitLikeEvent(id).subscribe(val => {
      if (val.code === 201) {
        this.editEvents.setDataLikeEvent(1);
      }
    });
  }

  // addSearch(id: any, wishlist) {
  //   const status = [];
  //   let data: any;
  //   status.push({ status: wishlist });
  //   status.forEach(element => {
  //     data = element;
  //   });
  //   this.editEvents.submitStatusEvent(id, data)
  //     .subscribe(
  //       (value) => {
  //         this.editEvents.setDataUpdate(1);
  //       });
  // }

  // reloadEvent() {
  //   this.editEvents.getAllEvent()
  //     .subscribe(
  //       (val: any) => {
  //         for (const item of val.data.event) {
  //           this.completed = item;
  //         }
  //       });
  // }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
