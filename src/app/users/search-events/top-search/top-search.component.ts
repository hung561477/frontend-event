import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../../../share/service/toggle.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventsService } from 'src/app/share/service/event.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { ItemService } from 'src/app/share/service/item.service';
import { StepService } from 'src/app/share/service/step.service';

@Component({
  selector: 'event-top-search',
  styleUrls: ['./top-search.component.scss'],
  templateUrl: './top-search.component.html',
})
export class TopSearchComponent implements OnInit {
  menuOpen = false;
  menuFilter = false;
  isShow = false;
  isFilter = false;
  fieldSearch = [];
  dateFrom = '';
  dateTo = '';
  budgetFrom = 0;
  budgetTo = 0;
  ageFrom = 0;
  ageTo = 0;
  sizeFrom = 0;
  sizeTo = 0;
  count: number;
  searchLocation: FormGroup;
  openSearch: boolean = false;
  gender: any = {
    'all': true,
    'male': false,
    'female': false
  }

  constructor(private toogleService: ToggleService, private fb: FormBuilder,
    private eventServive: EventsService, private auth: AuthenticationService,
    private service: ItemService, private step: StepService) {
  }

  ngOnInit() {
    this.toogleSearch();
    this.searchLocation = this.fb.group({
      location: ''
    });

    this.toogleService.loadDataIsShow.subscribe(val => {
      this.isShow = val;
    });

    this.toogleService.loadIsFilter.subscribe(val => {
      this.isFilter = val;
    });

    this.toogleService.loadDataFilter.subscribe(val => {
      this.dateFrom = val.date_from;
      this.dateTo = val.date_to;
    });

    this.eventServive.loadDataSearch.subscribe(val => {
      this.count = val.count;
    });

    this.toogleService.loadDataFrom.subscribe(val => {
      this.budgetFrom = val;
    })

    this.toogleService.loadDataTo.subscribe(val => {
      this.budgetTo = val;
    })

    this.toogleService.loadDataAgeFrom.subscribe(val => {
      this.ageFrom = val;
    })

    this.toogleService.loadDataAgeTo.subscribe(val => {
      this.ageTo = val;
    });

    this.step.loadCheckOpenSearch.subscribe(val => {
      this.openSearch = val;
      if (this.openSearch) {
        this.toogleSearch();
      }
    })

    this.toogleService.loadDataSizeFrom.subscribe(val => {
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

    this.toogleService.loadDataSizeTo.subscribe(val => {
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
    });

    this.service.loadDataGender.subscribe(val => {
      this.gender = val;
    });
  }


  onKey(event) {
    this.fieldSearch.push({
      keyword: '', date_from: '',
      date_to: '', venue: this.searchLocation.value.location
    });
    for (const item of this.fieldSearch) {
      this.eventServive.getSearchEvent(item).
        subscribe(
          val => {
            if (val.code === 200) {
              this.eventServive.setDataSearch(val.data);
            } else {
              this.auth.tokenExpire();
            }
          });
    }
  }

  get isSidebarVisible(): boolean {
    return this.toogleService.menuOpen;
  }


  toogleSearch() {
    this.toogleService.toggleMenuOpen();
  }

  toogleFilter() {
    this.toogleService.toogleFilterOpen(this.menuFilter);
  }
}
