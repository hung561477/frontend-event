import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../share/service/validation.service';
import { EventsService } from 'src/app/share/service/event.service';
import { StepService } from 'src/app/share/service/step.service';
import { MapsAPILoader } from '@agm/core';
import { LocationModel } from 'src/app/share/model/contact.model';
// import {} from '@types/googlemaps';

declare var $: any;
@Component({
    selector: 'event-step-1',
    templateUrl: './step-1.component.html',
    styleUrls: ['./step-1.component.scss']
})
export class Step1Component implements OnInit, AfterViewInit {
    items: string[] = [];
    itemsVenue: string[] = [];
    itemsSocial: string[] = [];
    value = '';
    venue: any = [];
    submitted = false;
    submittedDes = false;
    submittedUrl = false;
    submittedLocation = false;
    submittedDeadline = false;
    submittedEdition = false;
    locationVali = true;
    deadlineVali = true;
    dateDealine: any;
    dateDeadlineValid = '';

    latitude = 39.8282;
    longitude = -98.5795;
    edition = 0;
    validEdition: number = 0;
    nameLocation: string;
    valueDateRange = '10/08/2018 10:00 PM - 10/10/2018 06:00 AM';
    public componentData4: any = '';
    public userSettings4: any = {
        showSearchButton: false,
        currentLocIconUrl: 'https://cdn4.iconfinder.com/data/icons/proglyphs-traveling/512/Current_Location-512.png',
        locationIconUrl: 'http://www.myiconfinder.com/uploads/iconsets/369f997cef4f440c5394ed2ae6f8eecd.png',
        noOfRecentSearchSave: 8
    };

    @Input() step1: FormGroup;
    @ViewChild('search') public searchElement: ElementRef;

    constructor(private fb: FormBuilder, private validate: ValidationService, private event: EventsService, private step: StepService,
        private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
        const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        this.step1 = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            edition: ['', Validators.required],
            deadline: ['', Validators.required],
            location: ['', Validators.required],
            url: ['', [Validators.required, Validators.pattern(reg)]],
        });
    }

    get f() { return this.step1.controls; }

    autoCompleteCallback4(data: any): any {
        this.componentData4 = JSON.stringify(data);
    }

    onKey(event: any) {
        if (event.target.value !== '') {
            this.submitted = true;
        }
    }

    onKeyDes(event: any) {
        if (event.target.value !== '') {
            this.submittedDes = true;
        }
    }

    onKeyUrl(event: any) {
        if (event.target.value !== '') {
            this.submittedUrl = true;
        } else {
            this.submittedUrl = false;
        }
    }

    onLocation(event: any) {
        if (event.target.value !== '') {
            this.locationVali = false;
            this.submittedLocation = true;
        } else {
            this.locationVali = true;
            this.submittedLocation = true;
        }
    }

    onDeadline(event: any) {
        if (event.target.value !== '') {
            this.deadlineVali = false;
            this.submittedDeadline = true;
        } else {
            this.deadlineVali = true;
            this.submittedDeadline = true;
        }
    }

    onEdition(event: any) {
        this.validEdition = Number(this.step1.value.edition);
        if (Number(event.target.value) === 0) {
            this.submittedEdition = true;
        }
    }

    changePlus() {
        this.step1.controls['edition'].setValue(Number(this.step1.value.edition) + 1);
        this.validEdition = Number(this.step1.value.edition);
        if (this.validEdition === 0) {
            this.submittedEdition = true;
        }
    }

    changeMinus() {
        if (this.step1.value.edition > 0) {
            this.step1.controls['edition'].setValue(Number(this.step1.value.edition) - 1);
        }
        this.validEdition = Number(this.step1.value.edition);
        if (this.validEdition === 0) {
            this.submittedEdition = true;
        }
    }

    ngOnInit() {
        this.step.setFromDate(Date.parse((moment(Date.now()).format('YYYY-MM-DD hh:mm A'))));
        this.step.setToDate(Date.parse((moment(Date.now()).add(2, 'days').format('YYYY-MM-DD hh:mm A'))));
        this.step.setSponDeadline((moment(Date.now()).format('YYYY-MM-DD')));
        $('.vertical-spin').TouchSpin({
            verticalbuttons: true,
            verticalupclass: 'd-none',
            verticaldownclass: 'd-none'
        });
        this.validate.activeValidate.subscribe(value => {
            this.submitted = value;
            this.submittedDes = value;
            this.submittedLocation = value;
            // this.submittedUrl = value;
            this.submittedDeadline = value;
            this.submittedEdition = value;
        });
        this.step.loadDataVenue.subscribe(val => {
            this.itemsVenue.push(val);
        });
        this.step.loadDataLocation.subscribe(val => {
            this.items.push(val);
        });
        this.step.loadDataSocialLink.subscribe(val => {
            this.itemsSocial.push(val);
        });
        this.event.loadDataDateRange.subscribe(val => {
            this.valueDateRange = val;
        });
        this.event.loadDataEdition.subscribe(val => {
            this.edition = val;
        });

        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["establishment"] });

            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    place.address_components.forEach(element => {
                        if (element.types[0] === 'country' && element.short_name.length === 2) {
                            this.step.setCountryCode(element.short_name);
                        }
                    });

                    const location = new LocationModel(
                        this.nameLocation = place.formatted_address,
                        this.longitude = place.geometry.location.lng(),
                        this.latitude = place.geometry.location.lat()
                    );
                    this.step.setLocationMap(location);
                });
            });
        }
        );

    }

    ngAfterViewInit() {

        const _this = this;
        $('.abc').daterangepicker({
            timePicker: true,
            startDate: moment().startOf('hour'),
            endDate: moment().startOf('hour').add(32, 'hour'),
            locale: {
                format: 'MM/DD/YYYY hh:mm A'
            }
        }, function (start, end) {
            _this.valueDateRange = start.format('DD/MM/YYYY hh:mm A') + ' - ' + end.format('DD/MM/YYYY hh:mm A');
            _this.step.setFromDate(Date.parse(start.format('YYYY-MM-DD hh:mm A')));
            _this.step.setToDate(Date.parse(end.format('YYYY-MM-DD hh:mm A')));
        });

        $("#datepicker").datepicker({
            dateFormat: "dd-MM-yy",
        }).on("change", function (e) {
            if (e.target.value !== '') {
                _this.dateDealine = $("#datepicker").datepicker().val();
                _this.deadlineVali = false;
                _this.submittedDeadline = true;
                _this.step.setSponDeadline((moment(_this.dateDealine)).format('YYYY-MM-DD'));
            } else {
                _this.deadlineVali = true;
                _this.submittedDeadline = true;
                _this.dateDeadlineValid = $("#datepicker").datepicker().val();
            }
        }).datepicker('setDate', new Date());


        this.dateDeadlineValid = $("#datepicker").datepicker().val();
    }
}
