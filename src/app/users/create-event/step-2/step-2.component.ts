import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventsService } from 'src/app/share/service/event.service';
import { ValidationService } from 'src/app/share/service/validation.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { StepService } from 'src/app/share/service/step.service';

declare var $: any;

@Component({
    selector: 'event-step-2',
    templateUrl: './step-2.component.html',
    styleUrls: ['./step-2.component.scss']
})
export class Step2Component implements OnInit, AfterViewInit, OnDestroy {
    private subscriptions = new Subscription();
    items: any[] = [];
    itemsTags: any[] = [];
    statusGender = true;
    male: number;
    female: number;
    other: number;
    totalGender = 0;
    statusCareer = false;
    careerPublish: boolean;
    statusCivil = false;
    single: number;
    married: number;
    separated: number;

    submitted = false;
    submittedAge = false;
    submittedGender = false;
    submittedTag = false;
    submittedTags = false;
    income: any;

    age: any = {};
    gender: any = {};
    career: any = {};
    civil: any = {};
    houseIncome: any = {};
    residence: any = {};
    residenceLocation: any = {
        local: false,
        regional: false,
        national: false,
        international: false
    }
    valuesAge: [
        '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100+'
    ];

    @Input() step2: FormGroup;

    statusAge = true;
    statusHouseIncome: any;
    min = 10 / 10 - 1;
    max = 10 / 10 - 1;
    statusIncome = false;
    minHouseIncome = 30;
    maxHouseIncome = 30;
    minHouse = 30 / 30 - 1;
    maxHouse = 30 / 30 - 1;
    paramId: string;
    value: any[];
    valueCareer: any;
    careerProfile: any = [];
    careerCreate: any = [];
    dataCareer: any = [];
    valueDefault: any;
    validateGender = true;
    validateCivil = true;
    public exampleData: Array<Select2OptionData>;
    public options: Select2Options;

    simpleSlider = { name: 'Simple Slider', onUpdate: undefined, onFinish: undefined };
    advancedSlider = { name: 'Advanced Slider', onUpdate: undefined, onFinish: undefined };

    //

    audience: number;
    validateNumber: boolean;

    constructor(private event: EventsService, private fb: FormBuilder, private validate: ValidationService,
        private route: ActivatedRoute, private step: StepService) {
        this.paramId = this.route.snapshot.paramMap.get('id');


        this.validate.setValidateStepActive(true);
        this.step2 = this.fb.group({
            tag: ['', Validators.required],
            tag_search: ['', Validators.required],
            audience: ['', Validators.required],
            age_range: ['', Validators.required],
        });

    }

    get g() { return this.step2.controls; }

    onKey(event: any) {
        if (event.target.value !== '') {
            this.submitted = true;
        }
    }

    onAge(event: any) {
        if (event.target.value !== '') {
            this.submittedAge = true;
        }
    }

    ngOnInit() {
        const _th = this;

        this.validate.loadKeyStep.subscribe(val => {
            this.validate.activeValidate.subscribe(value => {
                if (val > 1) {
                    if (value && this.step2.value.audience !== '') {
                        this.submitted = value;
                    } else {
                        this.submitted = false;
                    }

                    if (value && this.items.length === 0) {
                        this.submittedTag = value;
                    } else {
                        this.submittedTag = false;
                    }

                    if (value && this.items.length === 0) {
                        this.submittedTags = value;
                    } else {
                        this.submittedTags = false;
                    }

                    if (value && this.age.to === 0) {
                        this.submittedAge = value;
                    } else {
                        this.submittedAge = false;
                    }

                    if (value && this.totalGender === 0) {
                        this.submittedGender = value;
                    } else {
                        this.submittedGender = false;
                    }
                }
            });
        })
        if (this.paramId === null) {
            this.age.status = this.statusAge;
            this.age.from = this.min;
            this.age.to = this.max;
            this.step.setAge(this.age);
            this.gender.status = this.statusGender;
            this.gender.male = 0;
            this.gender.female = 0;
            this.gender.order = 0;
            this.step.setGender(this.gender);
            this.career.publish = this.statusCareer;
            this.career.value = [];
            this.step.setCareerUpdate(this.career);
            this.step.setCareerInven(this.career, null);
            this.civil.status = this.statusCivil;
            this.civil.single = 0;
            this.civil.married = 0;
            this.civil.separated = 0;
            this.step.setCivil(this.civil);
            this.houseIncome.publish = this.statusIncome;
            this.houseIncome.from = this.minHouseIncome;
            this.houseIncome.to = this.maxHouseIncome;
            this.step.setHouseIncome(this.houseIncome);
            this.residenceLocation.local = this.residenceLocation.local;
            this.residenceLocation.national = this.residenceLocation.national;
            this.residenceLocation.regional = this.residenceLocation.regional;
            this.residenceLocation.international = this.residenceLocation.international
            this.step.setResidence(this.residenceLocation);
        }


        this.event.getCarrer().subscribe(val => {
            this.valueCareer = val.data;
            for (const item of this.valueCareer) {
                this.careerProfile.push({ id: item.id, text: item.name });
            }
            this.exampleData = this.careerProfile;
            this.value = [];
        });

        this.options = {
            multiple: true,
            theme: 'classic',
        };

        if (this.paramId !== null) {
            this.subscriptions = this.step.loadDataTag.subscribe(val => {
                if (val === null) {
                    this.items = this.items;
                    this.submittedTag = false;
                } else {
                    if (typeof val === 'string') {
                        for (const item of val.split(',')) {
                            this.items.push({ display: item, value: item });
                        }
                    }
                }
            });

            this.subscriptions = this.step.loadDataTagSearch.subscribe(val => {
                if (val === null) {
                    this.itemsTags = this.itemsTags;
                    this.submittedTags = false;
                } else {
                    if (typeof val === 'string') {
                        for (const item of val.split(',')) {
                            this.itemsTags.push({ display: item, value: item });
                        }
                    }
                }
            });

            this.subscriptions = this.step.loadDataAge.subscribe(val => {
                this.age.status = val.status;
                this.age.from = val.from;
                this.age.to = val.to;
                this.statusAge = val.status;
                this.min = val.from / 10;
                this.max = val.to / 10;
                $('#range_01').ionRangeSlider({
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
                        _th.age.status = _th.statusAge;
                        if (data.to_value === '100+') {
                            _th.age.from = data.from_value;
                            _th.age.to = Number(data.to_value.split('+')[0]);
                        } else if (data.from_value === '100+') {
                            _th.age.from = Number(data.from_value.split('+')[0]);
                            _th.age.to = data.to_value;
                        } else {
                            _th.age.from = data.from_value;
                            _th.age.to = data.to_value;
                        }
                        _th.step.setAge(_th.age);
                    },
                });
            });

            this.subscriptions = this.step.loadDataGender.subscribe(val => {
                this.statusGender = val.status;
                this.male = val.male;
                this.female = val.female;
                this.other = val.order;
                this.equalGender();
            });

            this.subscriptions = this.step.loadDataCareer.subscribe(val => {
                this.career.publish = val.publish;
                this.statusCareer = val.publish;
                val.value.forEach(element => {
                    this.value.push(element.id);
                });
                this.career.value = val.value;
                this.value = [];
                val.value.forEach(element => {
                    this.value.push(element.id.toString());
                });
                if (this.career.publish) {
                    $('#career').iCheck('check');
                }
            });

            this.subscriptions = this.step.loadDataCivil.subscribe(val => {
                this.statusCivil = val.status;
                this.single = val.single;
                this.married = val.married;
                this.separated = val.separated;
                this.equalCivil();
                if (this.statusCivil) {
                    $('#civil').iCheck('check');
                }
            });

            this.subscriptions = this.step.loadDataHouseIncome.subscribe(val => {
                this.houseIncome.publish = val.publish;
                this.statusIncome = val.publish;
                this.houseIncome.from = val.from;
                this.houseIncome.to = val.to;
                this.minHouse = val.from / 20 - 1;
                this.maxHouse = val.to / 20 - 1;
                $('#range_02').ionRangeSlider({
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
                        _th.houseIncome.publish = _th.statusIncome;
                        _th.houseIncome.from = Number(data.from_value.split('K')[0]);
                        _th.houseIncome.to = Number(data.to_value.split('K')[0]);
                        _th.step.setHouseIncome(_th.houseIncome);
                    },
                });
                if (this.houseIncome.publish) {
                    $('#houseIncome').iCheck('check');
                }
            });

            this.subscriptions = this.step.loadDataResidence.subscribe(val => {
                this.residenceLocation.local = val.local;
                this.residenceLocation.national = val.national;
                this.residenceLocation.regional = val.regional;
                this.residenceLocation.international = val.international;

                if (this.residenceLocation.local) {
                    $('#local').iCheck('check');
                }
                if (this.residenceLocation.national) {
                    $('#national').iCheck('check');
                }
                if (this.residenceLocation.regional) {
                    $('#regional').iCheck('check');
                }
                if (this.residenceLocation.international) {
                    $('#international').iCheck('check');
                }
            });
        }
    }

    onAdd(item) {
        this.submittedTag = false;
        this.step.setDataTag(this.items);
    }

    onRemove(item) {
        if (this.items.length === 0) {
            this.submittedTag = true;
        }
        this.step.setDataTag(this.items);
    }

    onAddTag(item) {
        this.submittedTags = false;
        // this.step.setDataTag(this.items);
    }

    onRemoveTag(item) {
        if (this.itemsTags.length === 0) {
            this.submittedTags = true;
        }
        // this.step.setDataTag(this.items);
    }

    changed(data) {
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
        this.step.setCareerUpdate(this.career);
    }

    ngAfterViewInit() {
        const _th = this;
        $('.publish').iCheck({
            checkboxClass: 'icheckbox_square-red',
        });
        $('#local').on('ifClicked', (event) => {
            _th.residenceLocation.local = !event.target.checked;
            _th.step.setResidence(_th.residenceLocation);
        });
        $('#regional').on('ifClicked', (event) => {
            _th.residenceLocation.regional = !event.target.checked;
            _th.step.setResidence(_th.residenceLocation);
        });
        $('#national').on('ifClicked', (event) => {
            _th.residenceLocation.national = !event.target.checked;
            _th.step.setResidence(_th.residenceLocation);
        });
        $('#international').on('ifClicked', (event) => {
            _th.residenceLocation.international = !event.target.checked;
            _th.step.setResidence(_th.residenceLocation);
        });

        if (this.paramId === null) {

            $('#range_01').ionRangeSlider({
                type: 'double',
                grid: true,
                min: 0,
                max: 70,
                step: 5,
                from: _th.min,
                to: _th.max,
                values: [
                    '0', '5', '10', '15', '20', '25', '30', '35',
                    '40', '45', '50', '55', '60', '65', '70', '75',
                    '80', '85', '90', '95', '100+'
                ],
                onFinish: function (data) {
                    _th.age.status = _th.statusAge;
                    if (data.to_value === '100+') {
                        _th.age.from = data.from_value;
                        _th.age.to = Number(data.to_value.split('+')[0]);
                    } else if (data.from_value === '100+') {
                        _th.age.from = Number(data.from_value.split('+')[0]);
                        _th.age.to = data.to_value;
                    } else {
                        _th.age.from = data.from_value;
                        _th.age.to = data.to_value;
                    }
                    _th.step.setAge(_th.age);
                },
            });

            $('#range_02').ionRangeSlider({
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
                    _th.houseIncome.publish = _th.statusIncome;
                    _th.houseIncome.from = Number(data.from_value.split('K')[0]);
                    _th.houseIncome.to = Number(data.to_value.split('K')[0]);
                    _th.step.setHouseIncome(_th.houseIncome);
                },
            });
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
        this.totalGender = total;
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

    maleChange(event) {
        this.gender.male = event.target.valueAsNumber;
        this.male = this.gender.male;
        this.gender.female = this.female;
        this.gender.order = this.other;
        this.equalGender();
        this.step.setGender(this.gender);
    }

    femaleChange(event) {
        this.gender.male = this.male;
        this.gender.female = event.target.valueAsNumber;
        this.female = this.gender.female;
        this.gender.order = this.other;
        this.equalGender();
        this.step.setGender(this.gender);
    }

    otherChange(event) {
        this.gender.male = this.male;
        this.gender.female = this.female;
        this.gender.order = event.target.valueAsNumber;
        this.other = this.gender.order;
        this.equalGender();
        this.step.setGender(this.gender);
    }

    singleChange(event) {
        this.civil.status = this.statusCivil;
        this.civil.single = event.target.valueAsNumber;
        this.single = this.civil.single;
        this.civil.married = this.married;
        this.civil.separated = this.separated;
        this.equalCivil();
        this.step.setCivil(this.civil);
    }

    marriedChange(event) {
        this.civil.status = this.statusCivil;
        this.civil.single = this.single;
        this.civil.married = event.target.valueAsNumber;
        this.married = this.civil.married;
        this.civil.separated = this.separated;
        this.equalCivil();
        this.step.setCivil(this.civil);
    }

    separatedChange(event) {
        this.civil.status = this.statusCivil;
        this.civil.single = this.single;
        this.civil.married = this.married;
        this.civil.separated = event.target.valueAsNumber;
        this.separated = this.civil.separated;
        this.equalCivil();
        this.step.setCivil(this.civil);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
