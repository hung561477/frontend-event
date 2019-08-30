import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../share/service/event.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { BsModalRef } from 'ngx-bootstrap';
import { ItemService } from 'src/app/share/service/item.service';
import { ToggleService } from 'src/app/share/service/toggle.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'event-search-events',
  templateUrl: './search-events.component.html',
  styleUrls: ['./search-events.component.scss']
})
export class SearchEventsComponent implements OnInit, OnDestroy {
  completed: any = [];
  dataLocation: any = [];
  dataAll: any = [];
  modalRef: BsModalRef;
  lat = -75.19217659999998;
  lng = 39.9540923;
  gender: any = {
    'all': true,
    'male': false,
    'female': false
  }
  budgetFrom: number = 0;
  budgetTo: number = 0;
  sizeFrom: number = 0;
  sizeTo: number = 0;
  ageFrom: number = 0;
  ageTo: number = 0;
  private subscriptions = new Subscription();
  markers = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]

  @Input() valueInput: any;

  constructor(private itemEvents: EventsService,
    private auth: AuthenticationService,
    private service: ItemService,
    private toggle: ToggleService) {
      this.getAll();
  }

  ngOnInit() {
    this.getSearch();
    this.subscriptions = this.itemEvents.loadLikeEvent.subscribe(val => {
      if (val === 1) {
        this.getSearch();
      }
    });
    // this.itemEvents.loadDataAll.subscribe((value: any) => {
    //   console.log(value);
    //   this.completed = value.event;
    // });

    this.service.loadDataGender.subscribe(val => {
      this.gender = val;
    });

    this.toggle.loadDataAgeFrom.subscribe(val => {
      this.ageFrom = val;
    })

    this.toggle.loadDataAgeTo.subscribe(val => {
      this.ageTo = val;
    })

    this.toggle.loadDataFrom.subscribe(val => {
      this.budgetFrom = Number(val);
    })

    this.toggle.loadDataTo.subscribe(val => {
      this.budgetTo = Number(val);
    })

    this.toggle.loadDataSizeFrom.subscribe(val => {
      switch (val) {
        case 0:
          this.sizeFrom = Number(val);
          break;
        case 16.666666666666668:
          this.sizeFrom = 250;
          break;
        case 33.333333333333336:
          this.sizeFrom = 500;
          break;
        case 50:
          this.sizeFrom = 1000;
          break;
        case 66.66666666666667:
          this.sizeFrom = 1250;
          break;
        case 83.33333333333334:
          this.sizeFrom = 1500;
          break;
        case 100:
          this.sizeFrom = 2000;
          break;
      }
    })

    this.toggle.loadDataSizeTo.subscribe(val => {
      switch (val) {
        case 0:
          this.sizeTo = Number(val);
          break;
        case 16.666666666666668:
          this.sizeTo = 250;
          break;
        case 33.333333333333336:
          this.sizeTo = 500;
          break;
        case 50:
          this.sizeTo = 1000;
          break;
        case 66.66666666666667:
          this.sizeTo = 1250;
          break;
        case 83.33333333333334:
          this.sizeTo = 1500;
          break;
        case 100:
          this.sizeTo = 2000;
          break;
      }
    })

    this.toggle.loadDataFilterSubmit.subscribe(async val => {
      this.subscriptions = this.itemEvents.getAllEventBuyer().subscribe(data => {
        if (data.code === 200) {
          this.dataAll = data.data;
          this.completed = this.dataAll.events
          this.itemEvents.setDataAll(this.completed);


          for (const item of this.completed) {
            this.dataLocation.push({
              lat: item.location.latitude,
              lng: item.location.longtitude
            });
          }


          if (val) {
            if (this.gender.male) {
              for (let i = 0; i < this.completed.length; i++) {
                if (this.completed[i].gender.male !== 100) {
                  this.completed.splice(i, 1);
                }
              }
            } else if (this.gender.female) {
              for (let i = 0; i < this.completed.length; i++) {
                if (this.completed[i].gender.female !== 100) {
                  this.completed.splice(i, 1);
                }
              }
            } else if ((this.ageFrom && this.ageTo) > 0) {
              for (let i = 0; i < this.completed.length; i++) {
                if (this.completed[i].age.from >= this.ageTo || this.completed[i].age.to <= this.ageFrom) {
                  this.completed.splice(i, 1);
                }
              }
            } else if ((this.sizeFrom && this.sizeTo) > 0) {
              for (let i = 0; i < this.completed.length; i++) {
                if (!(this.completed[i].size >= this.sizeFrom && this.completed[i].size <= this.sizeTo)) {
                  this.completed.splice(i, 1);
                }
              }
            } else if ((this.budgetFrom && this.budgetTo) > 0) {
              for (let i = 0; i < this.completed.length; i++) {
                for (let j = 0; j < this.completed[i].inventory.length; j++) {
                  if (this.completed[i].inventory[j].budget_from >= this.budgetTo ||
                    this.completed[i].inventory[j].budget_to <= this.budgetFrom) {
                    this.completed.splice(i, 1);
                    break;
                  }
                }
              }
            }



          }

        } else {
          this.auth.tokenExpire();
        }
      });
    })
  }

  getSearch() {
    this.itemEvents.loadDataSearch.subscribe(val => {
      this.completed = val.event;
    });
  }

  getAll() {
    this.subscriptions = this.itemEvents.getAllEventBuyer().subscribe(data => {
      if (data.code === 200) {
        this.dataAll = data.data;
        this.completed = this.dataAll.events;
        for (const item of this.completed) {
          if (item.location !== null) {
            this.dataLocation.push({
              lat: item.location.latitude,
              lng: item.location.longtitude
            });
          }
        }
        this.itemEvents.setDataAll(this.completed);
      } else {
        this.auth.tokenExpire();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
