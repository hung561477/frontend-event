import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/share/service/event.service';
import { BsModalRef } from 'ngx-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-top-event-detail',
  styleUrls: ['./top-event-detail.component.scss'],
  templateUrl: './top-event-detail.component.html',
})
export class TopEventDetailComponent implements OnInit {

  id: number;
  modalRef: BsModalRef;
  closeResult: string;
  role: any;
  private subscriptions = new Subscription();
  constructor(private router: Router, private eventId: EventsService, private modalService: NgbModal,
    private auth: AuthenticationService, private activeRoute: ActivatedRoute) {
    this.role = auth.getUser().role;
  }
  paramId = this.activeRoute.snapshot.paramMap.get('id');

  ngOnInit() {
    this.eventId.loadDataId.subscribe(val => {
      this.id = val;
    });
  }

  goEditEvent() {
    this.subscriptions.add(
      this.eventId.getEventId(this.paramId).subscribe(
        data => {
          if (data.code === 200) {
            this.router.navigateByUrl(`/users/create-event/${this.paramId}`);
          } else {
            this.auth.tokenExpire();
          }
        })
    );
  }

  delEvent() {
    this.eventId.delEventId(this.paramId).subscribe(val => {
      if (val.code === 205) {
        this.modalService.dismissAll();
        this.backMonitoring();

      } else {
        this.auth.tokenExpire();
      }
    });
  }

  backMonitoring() {
    this.router.navigate(['/users/monitoring']);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

}
