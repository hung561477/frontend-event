import { Component, ViewEncapsulation, Input, OnInit, AfterViewInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventsService } from 'src/app/share/service/event.service';
import { StepService } from 'src/app/share/service/step.service';
import { ActivatedRoute } from '@angular/router';
import { id } from '@swimlane/ngx-charts/release/utils/id';
import { UploadFileService } from 'src/app/share/service/upload-file.service';
import * as moment from 'moment';
import { ValidationService } from 'src/app/share/service/validation.service';
import { from } from 'rxjs';
import { state } from '@angular/animations';
declare var $: any;

@Component({
    selector: 'event-modal-enventory',
    styleUrls: ['./modal-enventory.component.scss'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './modal-enventory.component.html',
})
export class ModalEventoryComponent implements OnInit, AfterViewInit {
    @Input() valueInput: any;
    paramId: string;
    itemsTags = [];
    itemsActivities = [];
    advancedSlider = [];
    formInventory: FormGroup;
    createInventory: any = {};
    valueDateRange = '10/08/2018 10:00 PM - 10/10/2018 06:00 AM';
    from = 10;
    to = 50;
    fromDate = Date.parse(moment(Date.now()).format('YYYY-MM-DD'));
    toDate = Date.parse(moment(Date.now()).add(2, 'days').format('YYYY-MM-DD'));
    tag: any;
    loading = false;
    tagArray: any = [];
    tagCreate = '';
    active: any;
    activeArray: any = [];
    activeCreate = '';
    valueKind: any = [];
    valueAmen: any = [];
    valueActi: any = [];
    kind: any = [];
    amenties: any = [];
    activation: any = [];
    arrayInven: any = [];
    idInvent: number;
    inventId: number;
    dataInven: any = [];
    activeDom = 0;
    idEdit: number;
    dateSpon: any = moment(Date.now()).format('YYYY-MM-DD');

    male: number;
    female: number;
    other: number;

    single: number;
    married: number;
    separated: number;
    keyAudience = 1;

    gender: any = {};
    career: any = {};
    statusCareer: boolean = false;
    isChecked = true;

    dataAge: any = {};
    dataGender: any = {};
    dataCareer: any;
    careerCreate: any = [];
    dataCareerCreate: any;
    dataCivil: any = {};
    dataHouseIncome: any = {};
    dataResidence = {
        local: false,
        regional: false,
        national: false,
        international: false
    };
    houseIncome: any = {};

    dataCareerEdit: any = [];
    dataDetail: any;

    validateGender = true;
    validateCivil = true;
    validateNumber: boolean;
    size: number;
    idImg = 0;
    min = 10 / 10 - 1;
    max = 10 / 10 - 1;
    minHouse = 30 / 30 - 1;
    maxHouse = 30 / 30 - 1;
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
            process: 0
        }
    ];
    idNum = 1;
    srcImg: any;
    objImg: any = [];
    isErrorImage = false;
    urlImgArray: any = [];
    imgGlobal: any;
    residenceLocation: any = {
        local: false,
        regional: false,
        national: false,
        international: false
    }

    submitted = false;
    submittedDes = false;
    submittedAudience = false;
    submittedDeadline = false;
    deadlineVali = true;
    process = 0;
    value: any = [];
    valueCareer: any;
    careerProfile: any = [];

    public exampleData: Array<Select2OptionData>;
    public carreeData: Array<Select2OptionData>;
    public activationData: Array<Select2OptionData>;
    public options: Select2Options;

    constructor(private formBuilder: FormBuilder, private event: EventsService, private step: StepService,
        private route: ActivatedRoute, private upload: UploadFileService, private valdate: ValidationService) {
        this.paramId = this.route.snapshot.paramMap.get('id');
        this.kind.push({ id: 10, value: this.isChecked })
        this.formInventory = this.formBuilder.group({
            modalName: '',
            tags: '',
            inKind: '',
            single: '',
            price: '',
            married: '',
            separated: '',
            male: '',
            female: '',
            other: '',
            modalDescription: '',
            modalDeadline: '',
            modalSize: '',
            active: ''
        });

        this.step.loadDataCareerInvent.subscribe(data => {
            this.dataCareerEdit = [];
            for (const item of data) {
                this.dataCareerEdit.push(item.text);
            }
            this.dataCareer = this.dataCareerEdit.toString().replace(/,/g, '  / ');
        });


        this.options = {
            multiple: true,
            theme: 'classic',
            closeOnSelect: true
        };

        this.dataAge.from = 0;
        this.dataAge.to = 0;

        this.dataGender.male = 0;
        this.dataGender.female = 0;
        this.dataGender.order = 0;

        this.dataCivil.single = 0;
        this.dataCivil.married = 0;
        this.dataCivil.separated = 0;

        this.dataHouseIncome.from = 0;
        this.dataHouseIncome.to = 0;

        this.dataResidence.local = false;
        this.dataResidence.regional = false;
        this.dataResidence.national = false;
        this.dataResidence.international = false;
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

    activeAudience(key) {
        this.keyAudience = key;
    }

    onAudience(event: any) {
        if (event.target.value !== '') {
            this.submittedAudience = true;
        }
    }

    onDeadline() {
        if (this.formInventory.value.modalDeadline !== '') {
            this.deadlineVali = false;
            this.submittedDeadline = true;
        } else {
            this.deadlineVali = true;
            this.submittedDeadline = true;
        }
    }

    get inventForm() { return this.formInventory.controls; }


    ngOnInit() {
        const _th = this;

        this.carreeData = [
            { id: '1', text: 'Young Professional' },
            { id: '2', text: 'Middle Mgt' },
            { id: '3', text: 'Senior Mgt' },
            { id: '4', text: 'Entrepreneur' },
            { id: '5', text: 'Seft-employed' }
        ]

        this.step.loadDataAge.subscribe(data => {
            this.dataAge = data;
        });

        this.valdate.activeValidateModal.subscribe(val => {
            this.submitted = val;
            this.submittedAudience = val;
            this.submittedDeadline = val;
            this.submittedDes = val;
        })

        this.step.loadDataGender.subscribe(data => {
            this.dataGender = data;
        });

        this.upload.loadDataImgInventory.subscribe(val => {
            this.domObj = val;
        });

        if (this.paramId) {
            const inventTable = this.step.getInventTable();
            inventTable.forEach(element => {
                this.dataInven.push(element);
            });
        }



        this.step.loadDataCareerIdInvent.subscribe(data => {
            this.dataCareerCreate = data;
        });

        this.step.loadDataCivil.subscribe(data => {
            this.dataCivil = data;
        });

        this.step.loadDataHouseIncome.subscribe(data => {
            this.dataHouseIncome = data;
        });

        this.step.loadDataResidence.subscribe(data => {
            this.dataResidence = data;
        });

        this.event.loadDataIdInven.subscribe(data => {
            this.idInvent = data;
        });

        this.activeDom = this.step.getOpen();
        if (this.activeDom === 1) {
            this.dataDetail = this.step.getMyInvent();
            this.setForm();
        } else if (this.activeDom === 2) {
            this.dataDetail = this.step.getInventory();
            this.inventId = this.dataDetail.id;
            this.formInventory.controls['modalName'].setValue(this.dataDetail.name);
            this.formInventory.controls['modalDescription'].setValue(this.dataDetail.description);
            this.formInventory.controls['modalSize'].setValue(this.dataDetail.size);
            this.formInventory.controls['male'].setValue(this.dataDetail.gender.male);
            this.formInventory.controls['female'].setValue(this.dataDetail.gender.female);
            this.formInventory.controls['other'].setValue(this.dataDetail.gender.order);
            this.formInventory.controls['single'].setValue(this.dataDetail.civil.single);
            this.formInventory.controls['married'].setValue(this.dataDetail.civil.married);
            this.formInventory.controls['separated'].setValue(this.dataDetail.civil.separated);
            this.formInventory.controls['price'].setValue(this.dataDetail.budget_to);
            this.dateSpon = moment(this.dataDetail.sponsorship_deadline).format('YYYY-MM-DD')
            this.valueDateRange = moment(this.dataDetail.date_from).format('MM/DD/YYYY hh:mm A') + ' - ' +
                moment(this.dataDetail.date_to).format('MM/DD/YYYY hh:mm A');
            console.log(this.valueDateRange)
            this.fromDate = Date.parse(moment(this.dataDetail.date_from).format('MM/DD/YYYY hh:mm A'));
            this.toDate = Date.parse(moment(this.dataDetail.date_to).format('MM/DD/YYYY hh:mm A'));
            this.min = this.dataDetail.age.from / 10;
            this.max = this.dataDetail.age.to / 10;
            this.minHouse = this.dataDetail.household_income.from / 20 - 1;
            this.maxHouse = this.dataDetail.household_income.to / 20 - 1;



            this.dataDetail.kind_sponsorship.forEach(element => {
                if (element.value === 'true' || element.value === true) {
                    this.isChecked = true;
                } else {
                    this.isChecked = false;
                }
            });

            // this.dataDetail.activations.forEach(element => {
            //     this.valueActi.push(element.id.toString());
            // });

            // this.dataDetail.amenities.forEach(element => {
            //     this.valueAmen.push(element.id.toString());
            // });

            if (this.dataDetail.tag === null) {
                this.itemsTags = this.itemsTags;
            } else {
                if (typeof this.dataDetail.tag === 'string') {
                    this.itemsTags = [];
                    for (const item of this.dataDetail.tag.split(',')) {
                        this.itemsTags.push({ display: item, value: item });
                    }
                }
            }
            if (this.dataDetail.activeties === null) {
                this.itemsActivities = this.itemsActivities;
            } else {
                if (typeof this.dataDetail.activeties === 'string') {
                    for (const item of this.dataDetail.activeties.split(',')) {
                        this.itemsActivities.push({ display: item, value: item });
                    }
                }
            }
            if (this.dataDetail.images !== undefined) {
                this.domObj = this.dataDetail.images;
            }



            this.dataDetail.career.forEach(element => {
                const id = element.id.toString();
                this.value.push(id);
            });

            if (this.dataDetail.residence_location.local) {
                $('#local1').iCheck('check');
            }
            if (this.dataDetail.residence_location.national) {
                $('#national1').iCheck('check');
            }
            if (this.dataDetail.residence_location.regional) {
                $('#regional1').iCheck('check');
            }
            if (this.dataDetail.residence_location.international) {
                $('#international1').iCheck('check');
            }
        }

        $('.image-upload-wrap').bind('dragover', function () {
            $('.image-upload-wrap').addClass('image-dropping');
        });

        $('.image-upload-wrap').bind('dragleave', function () {
            $('.image-upload-wrap').removeClass('image-dropping');
        });
    }


    ngAfterViewInit() {
        const _th = this;

        $('.publish').iCheck({
            checkboxClass: 'icheckbox_square-red',
        });

        $('#local1').on('ifClicked', (event) => {
            _th.dataResidence.local = !event.target.checked;
        });
        $('#regional1').on('ifClicked', (event) => {
            _th.dataResidence.regional = !event.target.checked;
        });
        $('#national1').on('ifClicked', (event) => {
            _th.dataResidence.national = !event.target.checked;
        });
        $('#international1').on('ifClicked', (event) => {
            _th.dataResidence.international = !event.target.checked;
        });

        $('.modal-date').daterangepicker({
            singleDatePicker: true,
            startDate: moment().startOf('hour'),
            locale: {
                format: 'YYYY-MM-DD'
            }
        }, function (start) {
            _th.dateSpon = start.format('YYYY-MM-DD');
        });

        $('.dateRange').daterangepicker({
            timePicker: true,
            startDate: moment(_th.fromDate).format('MM/DD/YYYY hh:mm A'),
            endDate: moment(_th.toDate).format('MM/DD/YYYY hh:mm A'),
            locale: {
                format: 'MM/DD/YYYY hh:mm A'
            }
        }, function (start, end) {
            _th.valueDateRange = start.format('DD/MM/YYYY hh:mm A') + ' - ' + end.format('DD/MM/YYYY hh:mm A');
            _th.fromDate = Date.parse(start.format('YYYY-MM-DD hh:mm A'));
            _th.toDate = Date.parse(end.format('YYYY-MM-DD hh:mm A'))
        });

        $('#range_04').ionRangeSlider({
            type: 'double',
            min: 0,
            max: 250,
            from: _th.from,
            to: _th.to,
            prefix: "$",
            postfix: "K",
            step: 5,
            onFinish: function (data) {
                _th.from = data.from;
                _th.to = data.to
            },
        });

        $('#agerange').ionRangeSlider({
            type: 'double',
            grid: true,
            min: 0,
            max: 70,
            from: _th.min,
            to: _th.max,
            step: 5,
            values: [
                '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100+'
            ],
            onFinish: function (data) {
                _th.dataAge.from = data.from_value;
                _th.dataAge.to = data.to_value;
            },
        });

        $('#houseincome').ionRangeSlider({
            type: 'double',
            grid: true,
            min: 10000,
            max: 15000,
            from: _th.minHouse,
            to: _th.maxHouse,
            values: [
                '30K', '60K', '90K', '120K', '150K', '180K', '210K', '240K', '270K', '300K+'
            ],
            onFinish: function (data) {
                _th.dataHouseIncome.from = Number(data.from_value.split('K')[0]);
                _th.dataHouseIncome.to = Number(data.to_value.split('K')[0]);
            },
        });
    }

    setForm() {
        const _th = this;
        console.log(this.dataDetail)
        this.formInventory.controls['modalName'].setValue(this.dataDetail.name);
        this.formInventory.controls['modalDescription'].setValue(this.dataDetail.description);
        this.formInventory.controls['modalSize'].setValue(this.dataDetail.size);
        this.formInventory.controls['male'].setValue(this.dataDetail.gender.male);
        this.formInventory.controls['female'].setValue(this.dataDetail.gender.female);
        this.formInventory.controls['other'].setValue(this.dataDetail.gender.order);
        this.formInventory.controls['single'].setValue(this.dataDetail.civil.single);
        this.formInventory.controls['married'].setValue(this.dataDetail.civil.married);
        this.formInventory.controls['price'].setValue(this.dataDetail.budget_to);
        this.formInventory.controls['separated'].setValue(this.dataDetail.civil.separated);
        this.dateSpon = moment(this.dataDetail.sponsor_deadline).format('YYYY-MM-DD');
        this.valueDateRange = moment(this.dataDetail.date_from).format('MM/DD/YYYY hh:mm A') + ' - ' +
            moment(this.dataDetail.date_to).format('MM/DD/YYYY hh:mm A');

        this.fromDate = Date.parse(moment(this.dataDetail.date_from).format('MM/DD/YYYY hh:mm A'));
        this.toDate = Date.parse(moment(this.dataDetail.date_to).format('MM/DD/YYYY hh:mm A'));
        this.from = 10;
        this.to = 50;

        this.min = this.dataDetail.age.from / 10;
        this.max = this.dataDetail.age.to / 10;

        this.minHouse = this.dataDetail.household_income.from / 20 - 1;
        this.maxHouse = this.dataDetail.household_income.to / 20 - 1;

        this.dataDetail.career.value.forEach(element => {
            this.value.push(element.id);
        });

        if (this.dataDetail.tag === null) {
            this.itemsTags = this.itemsTags;
        } else {
            if (typeof this.dataDetail.tag === 'string') {
                this.itemsTags = [];
                for (const item of this.dataDetail.tag.split(',')) {
                    this.itemsTags.push({ display: item, value: item });
                }
            }
        }
        if (this.dataDetail.activeties === null) {
            this.itemsActivities = this.itemsActivities;
        } else {
            if (typeof this.dataDetail.activeties === 'string') {
                for (const item of this.dataDetail.activeties.split(',')) {
                    this.itemsActivities.push({ display: item, value: item });
                }
            }
        }
        if (this.dataDetail.images !== undefined) {
            this.domObj = [];
            this.domObj = this.dataDetail.images;
        }

        if (this.dataDetail.residence_location.local) {
            $('#local1').iCheck('check');
        }
        if (this.dataDetail.residence_location.national) {
            $('#national1').iCheck('check');
        }
        if (this.dataDetail.residence_location.regional) {
            $('#regional1').iCheck('check');
        }
        if (this.dataDetail.residence_location.international) {
            $('#international1').iCheck('check');
        }
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
                        this.upload.setDataImgInventory(obj);
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
            if (itemD.id === idx) {
                this.domObj.splice(idx, 1);
                this.removeUpload(itemD);
            }
        });
    }

    removeUpload(i: any) {
        this.domObj.splice(i, 1)
        this.upload.setDataImgInventory(this.domObj);
    }

    addDom() {
        this.domObj.push({
            id: (++this.idNum),
            hide: true,
            base64: '',
            extension: '',
            description: '',
            file: '',
            process: 0
        });
    }

    changed(data) {
        this.kind = [];
        this.kind.push({ id: String(10), value: String(this.isChecked) })
        for (const item of data.data) {
            this.kind.push({ id: item.id, value: item.text });
        }
    }

    checkStatus(event) {
        this.kind = [];
        this.isChecked = event.target.checked;
        this.kind.push({ id: String(10), value: String(this.isChecked) })
    }

    changedAmen(data) {
        this.amenties = [];
        for (const item of data.data) {
            this.amenties.push({ id: item.id, value: item.text });
        }
    }

    changedActi(data) {
        this.activation = [];
        for (const item of data.data) {
            this.activation.push({ id: item.id, value: item.text });
        }
    }

    onSubmit() {
        this.onDeadline();
        if (this.formInventory.value.modalName !== '' && this.formInventory.value.modalDescription !== '' &&
            this.formInventory.value.modalSize !== '' && this.dateSpon !== '') {
            this.step.setLoading(true);
            this.valueForm();
            this.dataInven.push({ ...this.createInventory });
            this.step.setDataEventory(this.dataInven);
            this.event.setDataInventory(this.dataInven);
            this.step.setLoading(false);
            this.step.setIsActive(false);
            this.valueInput.hide();

        } else {
            this.valdate.setValidateActiveModal(true);
        }
    }

    onEdit() {
        this.onDeadline();
        if (this.formInventory.value.modalName !== '' && this.formInventory.value.modalDescription !== '' &&
            this.formInventory.value.modalSize !== '' && this.dateSpon !== '') {
            this.step.setLoading(true);
            this.valueForm();
            this.createInventory.id = this.inventId;
            for (let i = 0; i < this.dataInven.length; i++) {
                if (this.dataInven[i].id == this.inventId) {
                    this.dataInven[i] = this.createInventory;
                }
            }
            // this.dataInven.push({ ...this.createInventory });
            this.step.setDataEventory(this.dataInven);
            this.event.setDataInventory(this.dataInven);
            this.step.setLoading(false);
            this.resetForm();
            this.step.setIsActive(false);
            this.valueInput.hide();
        } else {
            this.valdate.setValidateActiveModal(true);
        }
    }

    valueForm() {
        this.tag = this.formInventory.value.tags;
        for (const item of this.tag) {
            this.tagArray.push(item.value.toString());
        }
        this.tagCreate = this.tagArray.toString();
        this.active = this.formInventory.value.active;
        for (const item of this.active) {
            this.activeArray.push(item.value.toString());
        }
        this.activeCreate = this.activeArray.toString();
        this.createInventory.name = this.formInventory.value.modalName;
        this.createInventory.tag = this.tagCreate;
        this.createInventory.date_from = this.fromDate;
        this.createInventory.date_to = this.toDate;
        this.createInventory.budget_from = 0;
        this.createInventory.budget_to = this.formInventory.value.price;
        this.createInventory.kind_sponsorship = this.kind;
        this.createInventory.description = this.formInventory.value.modalDescription;
        this.createInventory.sponsorship_deadline = this.dateSpon;
        this.createInventory.size = this.formInventory.value.modalSize;
        this.createInventory.images = this.domObj;
        if (this.activeDom === 1) {
            this.createInventory.age = this.dataDetail.age;
            this.createInventory.career = this.dataDetail.career.value;
            this.createInventory.civil = this.dataDetail.civil;
            this.createInventory.gender = this.dataDetail.gender;
            this.createInventory.household_income = this.dataDetail.household_income;
            this.createInventory.residence_location = this.dataDetail.residence_location;
            this.createInventory.amenities = this.dataDetail.amenties;
            this.createInventory.activations = this.dataDetail.activation;
        } else {
            this.createInventory.age = this.dataAge;
            this.createInventory.career = this.dataCareerCreate;
            this.createInventory.civil = this.dataCivil;
            this.createInventory.gender = this.dataGender;
            this.createInventory.household_income = this.dataHouseIncome;
            this.createInventory.residence_location = this.dataResidence;
            this.createInventory.amenities = this.amenties;
            this.createInventory.activations = this.activation;
        }

        if (this.keyAudience === 1) {
            this.dataDetail = this.step.getMyInvent();
            this.createInventory.age = this.dataDetail.age;
            this.createInventory.career = this.dataDetail.career.value;
            this.createInventory.civil = this.dataDetail.civil;
            this.createInventory.gender = this.dataDetail.gender;
            this.createInventory.household_income = this.dataDetail.household_income;
            this.createInventory.residence_location = this.dataDetail.residence_location;
            this.createInventory.amenities = this.dataDetail.amenties;
            this.createInventory.activations = this.dataDetail.activation;
        } 
    }

    resetForm() {
        this.value = [];
        this.valueKind = [];
        this.valueAmen = [];
        this.valueActi = [];
        this.itemsTags = [];
        this.formInventory.controls['modalName'].setValue('');
        this.objImg = [];
        this.from = 10;
        this.to = 50;
        this.min = 0;
        this.max = 0;
        this.minHouse = 0;
        this.maxHouse = 0;
        this.formInventory.controls['modalDescription'].setValue('');
        this.formInventory.controls['modalDeadline'].setValue('');
        this.formInventory.controls['modalSize'].setValue(0);
        this.formInventory.controls['male'].setValue('');
        this.formInventory.controls['female'].setValue('');
        this.formInventory.controls['other'].setValue('');
        this.formInventory.controls['single'].setValue('');
        this.formInventory.controls['married'].setValue('');
        this.formInventory.controls['separated'].setValue('');
        $('#local1').iCheck('uncheck');
        $('#national1').iCheck('uncheck');
        $('#regional1').iCheck('uncheck');
        $('#international1').iCheck('uncheck');
        this.domObj = [
            {
                id: null,
                hide: true,
                base64: '',
                extension: '',
                description: '',
                file: '',
                process: 0
            }
        ];
    }

    closeModal() {
        this.resetForm();
        this.valueInput.hide();
        this.step.setIsActive(false);
    }

    checkValidateNumber(number) {
        if (this.inventForm['modalSize'].value === 0) {
            this.validateNumber = true;
        } else {
            this.validateNumber = false;
        }
    }

    equalGender() {
        if (this.male === undefined) {
            this.male = 0;
        } else if (this.female === undefined) {
            this.female = 0;
        } else if (this.other === undefined) {
            this.other = 0;
        }
        const total = this.male + this.female + this.other;
        if (total > 100 || total < 100 || isNaN(total)) {
            this.validateGender = false;
        } else {
            this.validateGender = true;
        }
    }

    equalCivil() {
        if (this.single === undefined) {
            this.single = 0;
        } else if (this.married === undefined) {
            this.married = 0;
        } else if (this.separated === undefined) {
            this.separated = 0;
        }
        const total = this.single + this.married + this.separated;
        if (total > 100 || total < 100 || isNaN(total)) {
            this.validateCivil = false;
        } else {
            this.validateCivil = true;
        }
    }

    singleChange(event) {
        this.dataCivil.single = event.target.valueAsNumber;
        this.single = this.dataCivil.single;
        this.dataCivil.married = this.married;
        this.dataCivil.separated = this.separated;
        this.equalCivil();
    }

    marriedChange(event) {
        this.dataCivil.single = this.single;
        this.dataCivil.married = event.target.valueAsNumber;
        this.married = this.dataCivil.married;
        this.dataCivil.separated = this.separated;
        this.equalCivil();
    }

    separatedChange(event) {
        this.dataCivil.single = this.single;
        this.dataCivil.married = this.married;
        this.dataCivil.separated = event.target.valueAsNumber;
        this.separated = this.dataCivil.separated;
        this.equalCivil();
    }

    maleChange(event) {
        this.dataGender.male = event.target.valueAsNumber;
        this.male = this.dataGender.male;
        this.dataGender.female = this.female;
        this.dataGender.order = this.other;
        this.equalGender();
    }

    femaleChange(event) {
        this.dataGender.male = this.male;
        this.dataGender.female = event.target.valueAsNumber;
        this.female = this.dataGender.female;
        this.dataGender.order = this.other;
        this.equalGender();
    }

    otherChange(event) {
        this.dataGender.male = this.male;
        this.dataGender.female = this.female;
        this.dataGender.order = event.target.valueAsNumber;
        this.other = this.dataGender.order;
        this.equalGender();
    }

    changedCarree(data) {
        this.careerCreate = [];
        this.dataCareer = [];
        const idCareer: any = [];
        for (const item of data.data) {
            this.dataCareer.push(item);
            idCareer.push({ id: item.id });
            this.careerCreate.push({ id: item.id });
        }
        this.career.publish = this.statusCareer;
        this.career.value = this.careerCreate;
        this.step.setCareerInven(this.dataCareer, idCareer);
        // this.step.setCareerUpdate(this.career);
    }
}
