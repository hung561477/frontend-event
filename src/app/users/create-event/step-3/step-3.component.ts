import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadFileService } from 'src/app/share/service/upload-file.service';
import { EventsService } from 'src/app/share/service/event.service';
import { id } from '@swimlane/ngx-charts/release/utils';
import { Subscription } from 'rxjs';
import { element } from 'protractor';
import { StepService } from 'src/app/share/service/step.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ValidationService } from 'src/app/share/service/validation.service';

declare var $: any;

@Component({
    selector: 'event-step-3',
    templateUrl: './step-3.component.html',
    styleUrls: ['./step-3.component.scss']
})
export class Step3Component implements OnInit, OnDestroy {
    private subscriptions = new Subscription();
    img1: any;
    img2: any;
    img3: any;
    typeFile: any;
    typeFile1: any;
    typeFile2: any;
    dataImgAll: any = [];
    dataImg = [];
    dataImg1 = [];
    dataImg2 = [];
    items: any[] = [];
    itemsEdit: string[] = [];
    imgDetail1 = '';
    imgDetail2 = '';
    imgDetail3 = '';
    imgWrap = true;
    srcImg: any;
    paramId: string;
    urlImgArray: any = [];
    dataAmenties: any = [];
    dataAmentiesEdit: any = [];
    dataActivations: any = [];
    dataActivationsEdit: any = [];
    imgGlobal: any;
    idImg = 0;
    img: any;
    statusAmenities = true;
    statusActivations = true;
    submittedImage = false;
    valueAmenties: any = [];
    valueActivations: any = [];
    process = 0;

    event_amenities: any = {};
    event_activation: any = {};

    imgUrl: any;

    titleImg = 'Uploaded Image';
    srcs: any = [];
    domObj = [
        {
            id: null,
            hide: true,
            base64: '',
            extension: '',
            description: '',
            file: '',
            process: 0,
            url: '',
            imageId: '',
        }
    ];
    isErrorImage = false;
    idNum = 1;
    @Input() step3: FormGroup;

    autocompleteItemsAsObjects = [
        { value: 'Item1', id: 1, extra: 1 },
        { value: 'item2', id: 2, extra: 2 },
        { value: 'Item3', id: 3, extra: 3 },
        { value: 'item4', id: 4, extra: 4 },
    ];

    constructor(private upload: UploadFileService, private fb: FormBuilder, private event: EventsService,
        private step: StepService, private route: ActivatedRoute, private router: Router, private update: UploadFileService,
        private elm: ElementRef, private validate: ValidationService) {
        this.paramId = this.route.snapshot.paramMap.get('id');

        if (this.paramId === null) {
            this.event_amenities = this.valueAmenties;
            this.step.setDataAmenities(this.event_amenities);

            this.event_activation = this.valueActivations;
            this.step.setDataActivation(this.event_activation);
        }


        this.step3 = this.fb.group({});
    }

    ngOnInit() {
        this.event.loadDataImg.subscribe(val => {
            if (val !== undefined) {
                this.domObj = val;
            } else {
                this.domObj = this.domObj;
            }
        });

        this.validate.activeValidate.subscribe(value => {
            this.submittedImage = value;
        });

        this.subscriptions = this.step.loadDataActivities.subscribe(val => {
            if (val === null) {
                this.items = this.items;
            } else {
                if (typeof val === 'string') {
                    for (const item of val.split(',')) {
                        this.items.push({ display: item, value: item });
                    }
                }
            }
        });

        this.subscriptions = this.event.getAmenities().subscribe(val => {
            this.dataAmenties = [];
            val.data.forEach(value => {
                value.status = false;
                this.dataAmenties.push({ id: value.id });
            });
            this.dataAmenties = val.data;
        });

        this.subscriptions = this.event.getActivation().subscribe(val => {
            this.dataActivations = [];
            val.data.forEach(value => {
                value.status = false;
                this.dataActivations.push(value);
            });
            this.dataActivations = val.data;
        });

        if (this.paramId !== null) {
            this.subscriptions = this.step.loadDataAmenitiesEdit.subscribe(val => {
                this.dataAmentiesEdit = [];
                val.forEach(value => {
                    value.status = false;
                    this.dataAmentiesEdit.push({ id: value.id });
                    this.onActive(value.status, value.id);
                });
                this.dataAmentiesEdit = this.valueAmenties;
            });

            this.subscriptions = this.step.loadDataActivationEdit.subscribe(val => {
                this.dataActivationsEdit = [];
                val.forEach(value => {
                    value.status = false;
                    this.dataActivationsEdit.push({ id: value.id });
                    this.onActivations(value.status, value.id);
                });
                this.dataActivationsEdit = this.valueActivations;
            });
        }

        $('.image-upload-wrap').bind('dragover', function () {
            $('.image-upload-wrap').addClass('image-dropping');
        });

        $('.image-upload-wrap').bind('dragleave', function () {
            $('.image-upload-wrap').removeClass('image-dropping');
        });

        // this.upload.setDataImg(this.domObj);
    }

    onAdd(item) {
        this.step.setActivities(this.items);
    }

    onRemove(item) {
        this.step.setActivities(this.items);
    }

    onActive(status, idAmenties) {
        if (status) {
            this.valueAmenties.splice(this.valueAmenties.findIndex(function (i) {
                return i.id === idAmenties;
            }), 1);
        } else {
            this.valueAmenties.push({ id: idAmenties });
        }
        this.event_amenities = this.valueAmenties;
        switch (idAmenties) {
            case 1:
                this.dataAmenties[0].status = !this.dataAmenties[0].status;
                break;
            case 2:
                this.dataAmenties[1].status = !this.dataAmenties[1].status;
                break;
            case 3:
                this.dataAmenties[2].status = !this.dataAmenties[2].status;
                break;
            case 4:
                this.dataAmenties[3].status = !this.dataAmenties[3].status;
                break;
            case 5:
                this.dataAmenties[4].status = !this.dataAmenties[4].status;
                break;
            case 6:
                this.dataAmenties[5].status = !this.dataAmenties[5].status;
                break;
            case 7:
                this.dataAmenties[6].status = !this.dataAmenties[6].status;
                break;
            case 8:
                this.dataAmenties[7].status = !this.dataAmenties[7].status;
                break;
        }
        this.step.setDataAmenities(this.event_amenities);
    }

    onActivations(status, idActivation) {
        if (status) {
            this.valueActivations.splice(this.valueActivations.findIndex(function (i) {
                return i.id === idActivation;
            }), 1);
        } else {
            this.valueActivations.push({ id: idActivation });
        }
        this.event_activation = this.valueActivations;
        switch (idActivation) {
            case 1:
                this.dataActivations[0].status = !this.dataActivations[0].status;
                break;
            case 2:
                this.dataActivations[1].status = !this.dataActivations[1].status;
                break;
            case 3:
                this.dataActivations[2].status = !this.dataActivations[2].status;
                break;
            case 4:
                this.dataActivations[3].status = !this.dataActivations[3].status;
                break;
            case 5:
                this.dataActivations[4].status = !this.dataActivations[4].status;
                break;
            case 6:
                this.dataActivations[5].status = !this.dataActivations[5].status;
                break;
        }
        this.step.setDataActivation(this.event_activation);
    }

    readURL(input, i, idx) {
        if (input.target.files[0].size <= 5000000) {
            const fileReader = new FileReader();
            const file = input.target.files[0];
            fileReader.readAsDataURL(file);
            fileReader.onload = (e) => {
                this.srcImg = fileReader.result;
                i.id = idx;
                i.base64 = this.srcImg;
                i.file = this.srcImg.split(',')[1];
                i.hide = false;
                i.description = input.target.files[0].name;
                i.extension = i.description.split('.')[1];
                i.process = 0;
                this.isErrorImage = false;
                this.imgGlobal = Object.assign({}, i);
                const formModel = new FormData();
                formModel.set('image', input.target.files[0]);
                this.event.submitImageEvent(formModel).subscribe(val => {
                    if (Number.isInteger(val)) {
                        i.process = val;
                    } else {
                        i.process = val.status;
                    }
                    if (val.body) {
                        this.urlImgArray.push({
                            url: val.body.data.url,
                            id: this.imgGlobal.id
                        });
                        i.url = val.body.data.url;
                        i.imageId = this.imgGlobal.id;
                        let obj;
                        if (this.paramId) {
                            obj = this.domObj.slice();
                            obj.map((ele, idx) => {
                                if (ele.base64) {
                                    obj.splice(idx, 1);
                                }
                            });
                            obj.push(this.urlImgArray[0]);
                        } else {
                            obj = this.urlImgArray;
                        }
                        this.upload.setDataImg(obj);
                    }
                });
            };
        } else {
            this.removeUpload(id);
            this.isErrorImage = true;
        }
    }

    removeUploadFile(idx) {
        this.domObj.map((itemD, i) => {
            if (itemD.id === idx.id) {
                this.domObj.splice(i, 1);
                this.removeUpload(itemD);
            }
        });
    }

    removeUpload(i: any) {
        // this.domObj.splice(i, 1)
        this.upload.setDataImg(this.domObj);
    }

    addDom() {
        this.domObj.push({
            id: (++this.idNum),
            hide: true,
            base64: '',
            extension: '',
            description: '',
            file: '',
            process: 0,
            url: '',
            imageId: '',
        });

    }

    goContact() {
        window.open(window.location.origin + '/users/contact', '_blank');
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}