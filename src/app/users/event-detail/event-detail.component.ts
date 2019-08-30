import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { EventsService } from '../../share/service/event.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { StepService } from 'src/app/share/service/step.service';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'event-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  public eventDetail: any = [];
  @Input() valueInput: any;
  closeResult: string;
  paramId: string;
  isCollapsed: boolean = true;
  role = '';
  tag: any = [];
  countTag: number;
  active: any = [];
  countActive: number;
  dataEvent: any;
  completed: any = [];
  eventAmentities: any = [];
  locationName: string = '';
  lng: any;
  lat: any;
  time: number;
  dataImg: any = [];
  pattern = /^((http|https|ftp):\/\/)/;

  config: ToasterConfig;

  position = 'toast-bottom-right';
  animationType = 'fade';
  title = 'Update Successfully';
  content = ``;
  timeout = 3000;
  toastsLimit = 1;
  type = 'success';
  inventDetail: any = [];


  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  isFacebook = false;
  isInsta = false;
  isTwitter = false;
  isYoutube = false;
  isPinterest = false;
  isLinkedin = false;

  social: string;
  private subscriptions = new Subscription();

  constructor(private modalService: NgbModal, private itemEvents: EventsService, private route: ActivatedRoute,
    private auth: AuthenticationService, private step: StepService,
    private toasterService: ToasterService, config: NgbCarouselConfig) {
    this.role = auth.getUser().role;
    config.interval = 1;
    config.pauseOnHover = false;
  }

  ngOnInit() {

    this.itemEvents.loadDataUpdateDetail.subscribe(val => {
      if (val === 1) {
        this.showToast(this.type, this.title, this.content);
        this.loadEventDetail();
      }
    });
    this.paramId = this.route.snapshot.paramMap.get('id');
    if (this.paramId === 'preview') {
      const dataPreview = JSON.parse(localStorage.getItem('event-preview'));
      if (dataPreview) {
        this.eventDetail = dataPreview;
        this.tag = this.eventDetail.tag.split(',');
        this.countTag = this.tag.length;
        this.active = this.eventDetail.active.split(',');
        this.lat = dataPreview.location.latitude;
        this.lng = dataPreview.location.longtitude;
        if (this.active === null) {
          this.countActive = 0;
        } else {
          this.countActive = this.active.length;
        }
        this.eventDetail.images.forEach(element => {
          if (element.url) {
            this.dataImg.push({ url: element.url });
          } else {
            this.dataImg.push({ image: element.file.split(',')[1] });
          }
        });
        localStorage.removeItem('event-preview');
      }

      const inventPreview = JSON.parse(localStorage.getItem('inventory-preview'));
      if (inventPreview) {
        this.inventDetail = inventPreview;
      }
    } else {
      this.loadEventDetail();
    }

    this.subscriptions = this.itemEvents.loadDataDetail.subscribe(value => {
      this.eventDetail = value;
      this.eventAmentities = value.amenities.value;
      this.tag = this.eventDetail.tag.split(',');
      this.countTag = this.tag.length;
      this.active = this.eventDetail.active.split(',');
      if (this.active === null) {
        this.countActive = 0;
      } else {
        this.countActive = this.active.length;
      }
      this.itemEvents.setDataId(this.eventDetail.id);
    });
  }

  loadEventDetail() {
    this.subscriptions = this.itemEvents.getEventId(this.paramId).subscribe(
      data => {
        if (data.code === 200) {
          const objData = data.data
          this.eventDetail = objData;
          if (!this.pattern.test(this.eventDetail.social_link)) {
            if (this.eventDetail.social_link.split('.')[0] === 'www') {
              this.social = this.eventDetail.social_link.split('.')[1];
            } else {
              this.eventDetail.social_link = 'http://' + this.eventDetail.social_link;
              this.social = this.eventDetail.social_link.split('/')[2].split('.')[0];
            }
          } else {
            this.social = this.eventDetail.social_link.split('/')[2].split('.')[1];
          }
          switch (this.social) {
            case 'facebook':
              this.isFacebook = true;
              break;
            case 'fb':
              this.isFacebook = true;
              break;
            case 'instagram':
              this.isInsta = true;
              break;
            case 'twitter':
              this.isTwitter = true;
              break;
            case 'youtube':
              this.isYoutube = true;
              break;
            case 'pinterest':
              this.isPinterest = true;
              break;
            case 'linkedin':
              this.isLinkedin = true;
              break;
          }
          this.eventAmentities = this.eventDetail.amenities;
          this.tag = this.eventDetail.tag.split(',');
          this.countTag = this.tag.length;
          this.active = this.eventDetail.active.split(',');
          this.locationName = this.eventDetail.location.name;
          this.lng = this.eventDetail.location.longtitude;
          this.lat = this.eventDetail.location.latitude;

          const oneDay = 24 * 60 * 60 * 1000;
          const date1 = moment(new Date());
          const date2 = moment(new Date(this.eventDetail.date_from));
          this.time = Math.round((date2.diff(date1)) / oneDay);
          if (this.time === -0) {
            this.time = 0;
          }

          this.completed = this.eventDetail;
          if (this.active === null) {
            this.countActive = 0;
          } else {
            this.countActive = this.active.length;
          }
          this.eventDetail.image.forEach(element => {
            this.dataImg.push({ image: element.url });
          });
          this.itemEvents.setDataId(this.eventDetail.id);
        } else {
          this.auth.tokenExpire();
        }
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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
