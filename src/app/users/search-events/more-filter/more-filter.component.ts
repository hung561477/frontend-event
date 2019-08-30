import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToggleService } from 'src/app/share/service/toggle.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { e } from '@angular/core/src/render3';
import { ItemService } from 'src/app/share/service/item.service';

declare var $: any;

@Component({
    selector: 'event-more-filter',
    styleUrls: ['./more-filter.component.scss'],
    templateUrl: './more-filter.component.html',
})
export class MoreFilterComponent implements OnInit, AfterViewInit {
    searchForm: FormGroup;
    menuFilter = false;
    from = 0;
    to = 0;
    ageFrom = 0;
    ageTo = 0;
    all = true;
    male = false;
    female = false;
    sizeFrom = 0;
    sizeTo = 0;
    gender: any = {
        'all': true,
        'male': false,
        'female': false
    }

    constructor(private toggleMenu: ToggleService, private fb: FormBuilder,
        private service: ItemService) {
    }

    ngOnInit() {
        this.searchForm = this.fb.group({
            keyword: '',
            venue: '',
            dateRange: ''
        });
        this.toggleMenu.loadDataMenuFilter.subscribe((value) => {
            this.menuFilter = value;
        });
        this.service.setGender(this.gender);
    }

    ngAfterViewInit() {
        const _this = this;
        $('#range_01').ionRangeSlider({
            type: 'double',
            grid: true,
            min: 0,
            max: 100,
            step: 5,
            from: _this.ageFrom,
            to: _this.ageTo,
            values: [
                '0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50',
                '55', '60', '65', '70', '75', '80', '85', '90', '95', '100+'
            ],
            onFinish: function (data) {
                _this.ageFrom = data.from_percent;
                _this.ageTo = data.to_percent;
                _this.toggleMenu.setAge(_this.ageFrom, _this.ageTo);
            },
        });

        $('#range_02').ionRangeSlider({
            type: 'double',
            min: 20,
            max: 2000,
            from: _this.sizeFrom,
            to: _this.sizeTo,
            values: [
                '20', '50', '100', '150', '200', '250', '300', '350',
                '400', '450', '500', '550', '600', '650', '700',
                '750', '800', '850', '900', '950', '1000', '1050',
                '1100', '1150', '1200', '1250', '1300', '1350',
                '1400', '1450', '1500', '1550', '1600', '1650', '1700',
                '1750', '1800', '1850', '1900', '1950', '2K'
            ],
            onFinish: function (data) {
                _this.sizeFrom = data.from_percent;
                _this.sizeTo = data.to_percent;
                _this.toggleMenu.setSize(_this.sizeFrom, _this.sizeTo);
            },
        });

        $('#range_05').ionRangeSlider({
            type: 'double',
            grid: true,
            min: 1,
            max: 250,
            prefix: "$",
            postfix: "K",
            step: 5,
            values: [
                '0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50',
                '55', '60', '65', '70', '75', '80', '85', '90', '95', '100',
                '105', '110', '115', '120', '125', '130', '135', '140', '145', '150',
                '155', '160', '165', '170', '175', '180', '185', '190', '195', '200',
                '205', '210', '215', '220', '225', '230', '235', '240', '245', '250+',
            ],
            onFinish: function (data) {
                _this.from = data.from_value;
                _this.to = data.to_value
                _this.toggleMenu.setBudget(_this.from, _this.to);
            },
        });
    }

    addAll(event) {
        if (event.target.checked) {
            this.gender.all = true;
            this.gender.male = false;
            this.gender.female = false;
            this.service.setGender(this.gender);
        }
    }

    addMale(event) {
        if (event.target.checked) {
            this.gender.all = false;
            this.gender.male = true;
            this.gender.female = false;
            this.service.setGender(this.gender);
        }
    }

    addFemale(event) {
        if (event.target.checked) {
            this.gender.all = false;
            this.gender.male = false;
            this.gender.female = true;
            this.service.setGender(this.gender);
        }
    }

    // updateBudget(slider, event) {
    //     this.from = event.from;
    //     this.to = event.to;
    //     this.toggleMenu.setBudget(this.from, this.to);
    // }

    // finishBudget(slider, event) {
    //     this.from = event.from;
    //     this.to = event.to;
    //     this.toggleMenu.setBudget(this.from, this.to);
    // }

    closeSearch() {
        this.toggleMenu.toogleFilterOpen(this.menuFilter);
    }

    onSubmit() {
        this.toggleMenu.toogleFilterOpen(!this.menuFilter);
        this.toggleMenu.setFilter(true);
        this.toggleMenu.changeShowFilter();
    }
}
