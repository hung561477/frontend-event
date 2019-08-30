import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../../../share/service/item.service';
import { EventsService } from '../../../share/service/event.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-top-monitoring',
  styleUrls: ['./top-monitoring.component.scss'],
  templateUrl: './top-monitoring.component.html',
})
export class TopMonitoringComponent implements OnDestroy {
  role = '';
  id = 1;
  completedAll: any = [];
  completedWishlist: any = [];
  completedSold: any = [];
  completedReserved: any = [];
  completedOngoing: any = [];
  countAll: number;
  countSold: number;
  countWish: number;
  countRes: number;
  countOngoing: number;
  private subscriptions = new Subscription();

  constructor(private itemEvent: ItemService, private itemEvents: EventsService,
    private router: Router, private auth: AuthenticationService) {
    this.role = auth.getUser().role;
    this.addClass(this.id);
    this.get();
    this.itemEvents.loadDataUpdate.subscribe((value: any) => {
      if (value === 1) {
        this.get();
      }
    });
  }

  getAllSeller() {
    this.subscriptions.add(
      this.itemEvents.getAllEventSeller().subscribe(data => {
        if (data.code === 200) {
          this.completedAll = data.data;
          this.countAll = this.completedAll.count;
          this.itemEvents.setDataAll(this.completedAll);
        } else {
          this.auth.tokenExpire();
        }
      })
    );
  }

  getAllBuyer() {
    this.subscriptions.add(
      this.itemEvents.getAllInventoryBuyer().subscribe(data => {
        if (data.code === 200) {
          this.completedAll = data.data;
          this.countAll = this.completedAll.count;
          this.itemEvents.setDataAll(this.completedAll.inventory);
        } else {
          this.auth.tokenExpire();
        }
      })
    );
  }

  getSold() {
    this.subscriptions.add(
      this.itemEvents.getSoldEvent().subscribe(data => {
        if (data.code === 200) {
          this.completedSold = data.data;
          this.countSold = this.completedSold.count;
          this.itemEvents.setDataSold(this.completedSold.event);
        } else {
          this.auth.tokenExpire();
        }
      })
    );
  }

  getOngoing() {
    this.subscriptions.add(
      this.itemEvents.getOngoingEvent().subscribe(data => {
        if (data.code === 200) {
          this.completedOngoing = data.data;
          this.countOngoing = this.completedOngoing.count;
          this.itemEvents.setDataOngoing(this.completedOngoing.event);
        } else {
          this.auth.tokenExpire();
        }
      })
    );
  }

  getWishlist() {
    this.subscriptions.add(
      this.itemEvents.getWishlistInvent().subscribe(data => {
        if (data.code === 200) {
          this.completedWishlist = data.data;
          this.countWish = this.completedWishlist.count;
          this.itemEvents.setDataWishlist(this.completedWishlist.inventory);
        } else {
          this.auth.tokenExpire();
        }
      })
    );
  }

  getReserved() {
    this.subscriptions.add(
      this.itemEvents.getReservedInvent().subscribe(data => {
        if (data.code === 200) {
          this.completedReserved = data.data;
          this.countRes = this.completedReserved.count;
          this.itemEvents.setDataReserved(this.completedReserved.inventory);
        } else {
          this.auth.tokenExpire();
        }
      })
    );
  }

  get() {
    if (this.role === 'SELLER') {
      this.getAllSeller();
      this.getSold();
      this.getOngoing();
    } else {
      this.getAllBuyer();
      this.getWishlist();
      this.getReserved();
    }
  }

  addClass(id: any) {
    this.id = id;
    this.itemEvent.setBtn(this.id);
    switch (id) {
      case 1:
        if (this.role === 'SELLER') {
          this.getAllSeller();
        } else {
          this.getAllBuyer();
        }
        break;
      case 2:
        this.getSold();
        break;
      case 3:
        this.getWishlist();
        break;
      case 4:
        this.getReserved();
        break;
      case 5:
        this.getOngoing();
        break;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
