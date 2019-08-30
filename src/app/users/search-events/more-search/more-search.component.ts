import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';
import * as moment from 'moment';
import { ToggleService } from '../../../share/service/toggle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventsService } from 'src/app/share/service/event.service';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

declare var $: any;

@Component({
    selector: 'event-more-search',
    styleUrls: ['./more-search.component.scss'],
    templateUrl: './more-search.component.html',
})
export class MoreSearchComponent implements AfterViewInit, OnInit {
    @ViewChild('advancedSliderElement') advancedSliderElement: IonRangeSliderComponent;
    searchForm: FormGroup;
    min = 1;
    max = 10;
    menuOpen = false;
    activeMale = false;
    activeFemale = false;
    isShow = false;
    valueDateFrom = moment(Date.now()).format('YYYY/MM/DD');
    valueDateTo = moment(Date.now()).add(1, 'days').format('YYYY/MM/DD');
    fieldSearch: any = [];
    dataSearch: any = [];
    count: number = 0;
    itemsKey: string[] = [];
    itemsVenue: string[] = [];

    simpleSlider = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
    advancedSlider = { name: 'Advanced Slider', onUpdate: undefined, onFinish: undefined };

    constructor(private toggleMenu: ToggleService, private fb: FormBuilder,
        private eventServive: EventsService, private auth: AuthenticationService) {
        toggleMenu.menuOpenChange.subscribe((value) => {
            this.menuOpen = value;
        });
    }

    ngOnInit() {
        this.searchForm = this.fb.group({
            keyword: '',
            venue: '',
            dateRange: ''
        });



        this.eventServive.loadLikeEvent.subscribe(val => {
            if (val === 1) {
                this.onSubmit();
            }
        })
    }

    onSubmit() {
        this.fieldSearch = [];
        this.fieldSearch.push({
            keyword: this.searchForm.value.keyword, date_from: this.valueDateFrom,
            date_to: this.valueDateTo, venue: this.searchForm.value.venue
        });
        for (const item of this.fieldSearch) {
            this.toggleMenu.setDataFilter(item);
            this.eventServive.getSearchEvent(item).
                subscribe(
                    val => {
                        if (val.code === 200) {
                            this.count++
                            this.dataSearch = val.data;
                            this.eventServive.setDataSearch(this.dataSearch);
                            if (this.count === 1) {
                                this.toggleMenu.changeIsShow(this.isShow);
                            }
                        } else {
                            this.auth.tokenExpire();
                        }
                    });
        }
    }

    ngAfterViewInit() {
        const _th = this;
        const this_ = this;
        $('.abc').daterangepicker({
            timePicker: false,
            startDate: moment().startOf('hour'),
            endDate: moment().startOf('hour').add(32, 'hour'),
            locale: {
                format: 'DD/MM/YY'
            }
        }, function (start, end) {
            _th.valueDateFrom = start.format('YYYY/MM/DD');
            this_.valueDateTo = end.format('YYYY/MM/DD');
        });
    }

    closeSearch() {
        this.toggleMenu.menuOpenChange.next(!this.menuOpen);
    }

    update(slider, event) {
        slider.onUpdate = event;
    }

    finish(slider, event) {
        slider.onFinish = event;
    }

    setAdvancedSliderTo(from, to) {
        this.advancedSliderElement.update({ from: from, to: to });
    }

    maleClick() {
        this.activeMale = !this.activeMale;
    }
    femaleClick() {
        this.activeFemale = !this.activeFemale;
    }
}
