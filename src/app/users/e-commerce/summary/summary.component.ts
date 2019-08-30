import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/share/service/event.service';
import { StepService } from 'src/app/share/service/step.service';
import { pipe } from '@angular/core/src/render3/pipe';

@Component({
    selector: 'event-summary',
    styleUrls: ['./summary.component.scss'],
    templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
    dataSummary: any = {
        'wishlist': {
            'budget': 0,
            'atendees': 0,
            'gender': {
                'male': 0,
                'female': 0
            },
            'event': 0,
            'cost': 0,
            'age': 0
        },
        'reserved': {
            'budget': 0,
            'atendees': 0,
            'gender': {
                'male': 0,
                'female': 0
            },
            'event': 0,
            'cost': 0,
            'age': 0
        },
        'completed': {
            'budget': 0,
            'atendees': 0,
            'gender': {
                'male': 0,
                'female': 0
            },
            'event': 0,
            'cost': 0,
            'age': 0
        },
        'total': {
            'budget': 0,
            'atendees': 0,
            'gender': {
                'male': 0,
                'female': 0
            },
            'event': 0,
            'cost': 0,
            'age': 0
        }
    };
    dataRate: any;
    rateExchange: number = 1;
    pipeRate: any = 'USD';

    constructor(private event: EventsService,
        private step: StepService) {
        event.getExchangeRate().subscribe(val => {
            this.dataRate = val;
            this.rateExchange = this.dataRate.rates.USD;
        })
    }

    ngOnInit() {
        this.event.getSummary().subscribe(val => {
            this.dataSummary = val.data;
        });

        this.step.loadDataExchange.subscribe(val => {
            switch (val) {
                case 'usd':
                    this.pipeRate = val.toUpperCase();
                    this.event.getExchangeRate().subscribe(val => {
                        this.dataRate = val;
                        this.rateExchange = this.dataRate.rates.USD;
                    })
                    break;
                case 'eur':
                    this.pipeRate = val.toUpperCase();
                    this.event.getExchangeRate().subscribe(val => {
                        this.dataRate = val;
                        this.rateExchange = this.dataRate.rates.EUR;
                    })
                    break;
                case 'sgd':
                    this.pipeRate = val.toUpperCase();
                    this.event.getExchangeRate().subscribe(val => {
                        this.dataRate = val;
                        this.rateExchange = this.dataRate.rates.SGD;
                    })
                    break;

            }
        })
    }

    changeBackground(id) {
        return { 'width': id, 'height': '6px' };
    }

}
