import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../../share/service/item.service';
import { EventsService } from '../../share/service/event.service';
import { Subscription } from 'rxjs';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit, OnDestroy {
  role: any;
  completedAll: any = [];
  completedWishlist: any = [];
  completedSold: any = [];
  completedReserved: any = [];
  completedOngoing: any = [];
  @Input() valueInput: any;
  private subscriptions = new Subscription();
  itemShow = 1;

  config: ToasterConfig;

  position = 'toast-bottom-right';
  animationType = 'fade';
  title = 'Update Successfully';
  content = ``;
  timeout = 3000;
  toastsLimit = 5;
  type = 'success';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  constructor(private btnChange: ItemService, private itemEvents: EventsService,
    private toasterService: ToasterService, private auth: AuthenticationService) {
      this.role = auth.getUser().role;
  }
  ngOnInit() {
    this.btnChange.openBtn.subscribe(openBtn => {
      this.itemShow = openBtn;
    });
    this.subscriptions = this.itemEvents.loadDataUpdate.subscribe(val => {
      if (val === 1) {
        this.showToast(this.type, this.title, this.content);
      }
    });
    this.itemEvents.loadDataAll.subscribe((value: any) => {
      if(this.role === "SELLER") {
        this.completedAll = value.events;
      } else {
        this.completedAll = value;
      }
      
    });
    this.itemEvents.loadDataWishlist.subscribe((value: any) => {
      this.completedWishlist = value;
    });
    this.itemEvents.loadDataSold.subscribe((value: any) => {
      this.completedSold = value;
    });
    this.itemEvents.loadDataReserved.subscribe((value: any) => {
      this.completedReserved = value;
    });
    this.itemEvents.loadDataOngoing.subscribe((value: any) => {
      this.completedOngoing = value;
    });
  }


  showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
