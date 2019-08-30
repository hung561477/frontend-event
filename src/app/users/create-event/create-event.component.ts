import { Component, OnChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { ValidationService } from '../../share/service/validation.service';
import { EventsService } from 'src/app/share/service/event.service';
import { UploadFileService } from 'src/app/share/service/upload-file.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { StepService } from 'src/app/share/service/step.service';
import { create } from 'domain';
import { toDate } from '@angular/common/src/i18n/format_date';
import { ToggleService } from 'src/app/share/service/toggle.service';

@Component({
    selector: 'event-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {
    statusUpdate = false;
    createEvent: FormGroup;
    isActive = 1;
    items: string[] = [];
    submitted = false;
    dataCreate = [];
    houseFrom: number;
    houseTo: number;
    imgAll: any;
    valueVenue: any;
    valueMedia: any;
    valueLocation: any;
    validateStep = true;
    paramId: string;
    objImg: any = [];
    fromDate = moment(Date.now()).format('YYYY-MM-DD');
    toDate = moment(Date.now()).add(2, 'days').format('YYYY-MM-DD');
    sponDate = moment(Date.now()).format('YYYY-MM-DD');
    edition = 0;
    tag: any = [];
    dataInvent = [];
    tagSearch: any = [];
    social_link: any = [];
    dataTag = '';
    dataTagSearch = '';
    dataSocialLink = '';
    dataInventory: any = [];
    countryCode: any;
    dataInventoryEdit: any = [];
    activities: any = [];
    dataActivities = '';
    dataAmenities: any;
    dataActivation: any;
    age: any;
    gender: any;
    career: any;
    civil: any;
    houseIncome: any;
    dataHouse: any;
    residence: any;
    eventId: number;
    dataVenue: any = [];
    dataMedia: any = [];
    dataLocation: any = [];
    isDone = false;
    loading = false;
    // domObj = [
    //     {
    //         id: 1,
    //         hide: true,
    //         base64: '',
    //         extension: '',
    //         description: '',
    //         file: '',
    //     }
    // ];
    domObj: any = [];
    isPublish: any = {};
    idImg = 0;
    // event_menities: any
    private subscriptions = new Subscription();

    constructor(private http: Http, private formBuilder: FormBuilder,
        private router: Router,
        private valdate: ValidationService,
        private event: EventsService, private upload: UploadFileService,
        private route: ActivatedRoute, private auth: AuthenticationService,
        private step: StepService, private toggle: ToggleService) {
        const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

        this.valdate.activeValidateStep.subscribe((val) => {
            this.validateStep = val;
        });

        this.createEvent = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            location: '',
            venue: '',
            datepicker: '',
            avg: '',
            age_range: ['', Validators.required],
            edition: ['', Validators.required],
            deadline: '',
            url: ['', [Validators.required, Validators.pattern(reg)]],
            media: '',
            tag: '',
            tag_search: '',
            audience: '',
            ageFrom: '',
            ageTo: '',
            male: '',
            female: '',
            other: '',
            profile1: '',
            profile2: '',
            profile3: '',
            single: '',
            married: '',
            separated: '',
            household_income: '',
            undergradute: '',
            diploma: '',
            degree: '',
            activities: '',
            amenities: '',
        });

        this.paramId = this.route.snapshot.paramMap.get('id');
        if (this.paramId) {
            this.statusUpdate = true;
            this.subscriptions.add(
                this.event.getEventId(this.paramId).subscribe(
                    data => {
                        if (data.code === 200) {
                            this.event.setEventDetailEdit(data.data);
                        } else {
                            this.auth.tokenExpire();
                        }
                    })
            );
        }
    }

    get f() { return this.createEvent.controls; }

    ngOnInit() {
        this.step.loadDataFromDate.subscribe(val => {
            this.fromDate = val;
        });

        this.step.loadDataToDate.subscribe(val => {
            this.toDate = val;
        });

        this.step.loadDataSponDate.subscribe(val => {
            this.sponDate = val;
        });

        this.step.loadDataAge.subscribe(val => {
            this.age = val;
        });

        this.step.loadDataGender.subscribe(val => {
            this.gender = val;
        });

        this.step.loadDataCareerUpdate.subscribe(val => {
            this.career = val;
        });

        this.step.loadDataCivil.subscribe(val => {
            this.civil = val;
        });

        this.step.loadDataHouseIncome.subscribe(val => {
            this.houseIncome = val;
        });

        this.step.loadDataResidenceLocation.subscribe(val => {
            // console.log(val);
        })

        this.step.loadDataResidence.subscribe(val => {
            this.residence = val;
        });

        this.step.loadDataVenue.subscribe(val => {
            this.valueVenue = val;
        });

        this.step.loadDataSocialLink.subscribe(val => {
            this.valueMedia = val;
        })

        this.upload.loadDataImg.subscribe(val => {
            this.domObj = [];
            val.forEach(element => {
                this.domObj.push({ url: element.url })
            });
        });

        this.step.loadDataLocationMap.subscribe(val => {
            this.valueLocation = val;
        })

        this.step.loadDataAmenities.subscribe(val => {
            this.dataAmenities = val;
        });

        this.step.loadDataActivation.subscribe(val => {
            this.dataActivation = val;
        });

        this.step.loadDataLoading.subscribe(val => {
            this.loading = val;
        });

        this.step.loadDataEventInventory.subscribe(val => {
            this.dataInventory = val;
            if (this.dataInventory.length !== 0) {
                this.toggle.setCheckInventory(false);
            }
        });

        this.event.loadDataAllInven.subscribe(val => {
            // console.log(val);
            this.dataInventory = val;
            if (this.dataInventory.length !== 0) {
                this.toggle.setCheckInventory(false);
            }
            this.step.setInventory(val);
            this.step.setInventTable(val);

        });

        this.step.loadDataCountryCode.subscribe(val => {
            this.countryCode = val;
        })

        if (this.paramId) {
            this.subscriptions = this.event.loadDataDetailEdit.subscribe(val => {
                this.eventId = val.id;
                this.createEvent.controls['name'].setValue(val.name);
                this.createEvent.controls['description'].setValue(val.description);
                this.step.setDataVenue(val.venue);
                this.step.setDataLocation(val.location);
                this.event.setEdition(val.edition);
                this.event.setDataDateRange(moment(val.date_from).format('MM/DD/YYYY hh:mm A') + ' - ' +
                    moment(val.date_to).format('MM/DD/YYYY hh:mm A'));
                this.step.setAge(val.age);
                this.step.setGender(val.gender);
                this.step.setCareer(val.career);
                this.step.setCivil(val.civil);
                this.step.setHouseIncome(val.household_income);
                this.step.setResidence(val.residence_location);
                this.createEvent.controls['url'].setValue(val.url);
                this.step.setSocialLink(val.social_link);
                this.step.setDataTag(val.tag);
                this.step.setDataTagSearch(val.tag_search);
                this.createEvent.controls['female'].setValue(val.gender.female);
                this.createEvent.controls['male'].setValue(val.gender.male);
                this.createEvent.controls['other'].setValue(val.gender.order);
                this.createEvent.controls['single'].setValue(val.civil.single);
                this.createEvent.controls['married'].setValue(val.civil.married);
                this.createEvent.controls['separated'].setValue(val.civil.separated);
                this.createEvent.controls['audience'].setValue(val.size);
                this.createEvent.controls['location'].setValue(val.location.name);
                this.createEvent.controls['avg'].setValue(val.ticket_price);
                this.step.setLocationMap(val.location);
                this.event.setDataIncome(val.household_income);
                this.step.setDataAge(val.age_from, val.age_to);
                this.step.setActivities(val.active);
                for (let i = 0; i < val.image.length; i++) {
                    if (val.image[i].base64 !== undefined) {
                        val.image[i] = {
                            url: val.image[i].url,
                            id: val.image[i].imageId
                        };
                    }
                }
                this.event.setDataImg(val.image);
                this.domObj = val.image;
                this.step.setDataAmenitiesEdit(val.amenities);
                this.step.setDataActivationEdit(val.activations);
                this.step.setInventory(val.inventory);
                this.step.setInventTable(val.inventory);
                this.createEvent.controls['deadline'].setValue(moment(val.sponsor_deadline).format('DD-MMMM-YYYY'));
            });

        }
    }


    nextStep() {
        this.submitted = true;
        this.valueCreate();
        this.valdate.setValidateActive(this.submitted);
        this.step.setMyInvent(this.dataCreate[0]);
        if (this.validateStep) {
            if (this.createEvent.value.name !== '' && this.createEvent.value.description !== '' &&
                this.createEvent.value.location !== '' && this.createEvent.value.edition > 0 && this.isActive === 1) {
                this.valdate.setKeyStep(2);
                this.isActive = 2;
            } else if (this.createEvent.value.audience !== '' && this.dataTag.length !== 0 && this.dataTagSearch.length !== 0 &&
                this.isActive === 2 && this.age.to > 0) {
                if (this.gender.male !== 0 && this.gender.male !== null || this.gender.female !== 0 && this.gender.female !== null) {
                    if (this.gender.male + this.gender.female + this.gender.order === 100) {
                        this.valdate.setKeyStep(2);
                        this.isActive = 3;
                    }
                }
            } else if (this.domObj.length > 0 && this.isActive === 3) {
                this.isActive = 4
            }
        }
    }

    preStep() {
        this.valueCreate();
        this.step.setMyInvent(this.dataCreate[0]);
        if (this.isActive > 1) {
            this.valdate.setValidateActive(!this.submitted);
            this.submitted = false;
            this.validateStep = true;
            this.isActive = --this.isActive;
            this.isDone = true;
        }
    }

    checkvenue() {
        if (this.createEvent.value.venue.length > 0) {
            this.createEvent.value.venue.forEach(element => {
                if (element === `${element}`) {
                    this.valueVenue = element;
                } else {
                    this.valueVenue = element.value;
                }
            });
        } else {
            this.valueVenue = '';
        }
    }

    checkMedia() {
        if (this.createEvent.value.media.length > 0) {
            this.createEvent.value.media.forEach(element => {
                if (element === `${element}`) {
                    this.valueMedia = element;
                } else {
                    this.valueMedia = element.value;
                }
            });
        } else {
            this.valueMedia = '';
        }
    }

    checkLocation() {
        if (this.createEvent.value.location.length > 0) {
            this.createEvent.value.location.forEach(element => {
                if (element === `${element}`) {
                    this.valueLocation = element;
                } else {
                    this.valueLocation = element.value;
                }
            });
        } else {
            this.valueLocation = '';
        }
    }

    editImagesFile() {
        this.dataCreate.map(item => {
            if (item.images.length > 0) {
                item.images.map(image => {
                    image.file = image.file.split(',')[1];
                });
            }
        });
    }

    onSubmit() {
        this.loading = true;
        if (this.dataInventory.length !== 0) {
            this.checkvenue();
            this.checkMedia();
            this.valueCreate();
            for (const event of this.dataCreate) {
                this.event.submitCreateEvent(event).subscribe(val => {
                    for (const inventory of this.dataInventory) {
                        inventory.eventId = val.data.id;
                    }
                    this.event.submitCreateInventory(this.dataInventory).subscribe(data => {
                        this.loading = false;
                        this.router.navigate(['/users/monitoring']);
                    });
                });
            }
        } else {
            this.toggle.setCheckInventory(true);
            this.loading = false;
        }
    }

    onPublishCreate() {
        this.loading = true;
        if (this.dataInventory.length !== 0) {
            this.checkvenue();
            this.checkMedia();
            this.valueCreate();
            for (const event of this.dataCreate) {
                this.event.submitCreateEvent(event).subscribe(val => {
                    for (const inventory of this.dataInventory) {
                        inventory.eventId = val.data.id;
                    }
                    this.event.submitCreateInventory(this.dataInventory).subscribe(data => {
                        this.changePublish(val.data.id);
                        this.loading = false;
                        this.router.navigate(['/users/monitoring']);
                    });
                });
            }
        } else {
            this.toggle.setCheckInventory(true);
            this.loading = false;
        }
    }

    onPublishEdit() {
        this.loading = true;
        if (this.dataInventory.length !== 0) {
            this.checkvenue();
            this.checkMedia();
            this.valueCreate();
            for (const event of this.dataCreate) {
                this.event.submitEditEvent(this.eventId, event).subscribe(val => {
                    for (const inventory of this.dataInventory) {
                        if (inventory.id) {
                            this.event.submitEditInventory(inventory.id, inventory).subscribe(val => {
                            });
                        } else {
                            inventory.eventId = this.eventId;
                            this.dataInventoryEdit.push(inventory);
                            this.event.submitCreateInventory(this.dataInventoryEdit).subscribe(val => {
                            });
                        }
                    }
                    this.changePublish(val.data.event.id);
                    this.loading = false;
                    this.router.navigate(['/users/monitoring']);
                });
            }
        } else {
            this.toggle.setCheckInventory(true);
            this.loading = false;
        }
    }

    onSubmitEdit() {
        this.loading = true;
        if (this.dataInventory.length !== 0) {
            this.checkvenue();
            this.checkMedia();
            this.valueCreate();
            for (const event of this.dataCreate) {
                this.event.submitEditEvent(this.eventId, event).subscribe(val => {
                    for (const inventory of this.dataInventory) {
                        if (inventory.id) {
                            this.event.submitEditInventory(inventory.id, inventory).subscribe(val => {
                            });
                        } else {
                            inventory.eventId = this.eventId;
                            this.dataInventoryEdit.push(inventory);
                            this.event.submitCreateInventory(this.dataInventoryEdit).subscribe(val => {
                            });
                        }
                    }
                    this.loading = false;
                    this.router.navigate(['/users/monitoring']);
                });
            }
        } else {
            this.toggle.setCheckInventory(true);
            this.loading = false;
        }
    }

    dataPreview() {
        this.checkvenue();
        this.checkMedia();
        this.valueCreate();
    }

    valueCreate() {
        this.dataCreate = [];
        this.edition = Number(this.createEvent.value.edition);
        this.tag = [];
        this.createEvent.value.tag.forEach(element => {
            this.tag.push(element.value);
        });
        this.dataTag = this.tag.toString();

        this.tagSearch = [];
        this.createEvent.value.tag_search.forEach(element => {
            this.tagSearch.push(element.value);
        });
        this.dataTagSearch = this.tagSearch.toString();

        this.activities = [];
        this.createEvent.value.activities.forEach(element => {
            this.activities.push(element.value);
        });
        this.dataActivities = this.activities.toString();

        this.dataCreate.push({
            name: this.createEvent.value.name, location: this.valueLocation,
            ticket_price: this.createEvent.value.avg,
            venue: this.valueVenue, date_from: this.fromDate, date_to: this.toDate, edition: this.edition,
            sponsor_deadline: this.sponDate,
            description: this.createEvent.value.description, url: this.createEvent.value.url,
            social_link: this.valueMedia,
            tag: this.dataTag, tag_search: this.dataTagSearch, size: this.createEvent.value.audience,
            age: this.age, gender: this.gender, career: this.career, civil: this.civil,
            household_income: this.houseIncome, residence_location: this.residence, active: this.dataActivities,
            country_code: this.countryCode,
            event_amenities: this.dataAmenities, event_activations: this.dataActivation,
            images: this.domObj
        });
    }

    goPreview() {
        this.valueCreate();
        this.step.setDataPreview(this.dataCreate[0]);
        const dataLocal = [...this.dataCreate];
        // dataLocal[0].images = this.domObj;
        localStorage.setItem('event-preview', JSON.stringify(dataLocal[0]));
        localStorage.setItem('inventory-preview', JSON.stringify(this.dataInventory));
        window.open(window.location.origin + '/users/event-detail/preview', '_blank');
    }

    changePublish(id: any) {
        this.isPublish.status = 'PUBLISH';
        this.event.submitPublishEvent(id, this.isPublish).subscribe(val => {
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}

