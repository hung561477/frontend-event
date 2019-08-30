import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { EventsService } from 'src/app/share/service/event.service';
import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from '../e-commerce/chartist/chartist.component';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { StepService } from 'src/app/share/service/step.service';
declare var $: any;
import * as moment from 'moment';
import { Router } from '@angular/router';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'event-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit, AfterViewInit {
  activeTab = 'tab2';
  role = '';
  completedAll: any = [];
  completedWishlist: any = [];
  completedReserved: any = [];
  dataChart: any;
  valueDateRange = '10/08/2018 10:00 PM - 10/10/2018 06:00 AM';
  public charts: Chart[];
  options = {
    height: 400
  };
  flag: number;
  dataDateMap: any = {
    date_from: (moment(Date.now()).format('YYYY/MM/DD')),
    date_to: (moment(Date.now()).add(2, 'days').format('YYYY/MM/DD'))
  };

  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]

  temp: any = [];

  data = {
    "Bar": {
      "labels": this.labels,
      "series": [
        [],
        [],
        []
      ]
    }
  }


  @Input() valueInput: any;

  constructor(private itemEvents: EventsService, private auth: AuthenticationService,
    private step: StepService, private router: Router) {
    this.role = auth.getUser().role;
  }

  ngOnInit() {
    this.step.setFromDateMap(this.dataDateMap);
    // this.step.setToDateMap((moment(Date.now()).add(2, 'days').format('YYYY-MM-DD')));
    if (this.role === 'BUYER') {
      this.flag = this.step.getMyGV();
      this.itemEvents.happenningAll().subscribe((value: any) => {
        if (value.code === 200) {
          this.completedAll = value.data;
          if (this.completedAll.length === 0 && this.flag === 0) {
            this.step.setCheckOpenSearch(true);
            this.router.navigate(['/users/search-event']);
            this.step.setMyGV(1);
          }
        } else {
          this.auth.tokenExpire();
        }
      });

      this.itemEvents.happenningWishlist().subscribe((value: any) => {
        if (value.code === 200) {
          this.completedWishlist = value.data.event;
        } else {
          this.auth.tokenExpire();
        }
      });
      this.itemEvents.happenningReserved().subscribe((value: any) => {
        if (value.code === 200) {
          this.completedReserved = value.data.event;
        } else {
          this.auth.tokenExpire();
        }
      });
      this.itemEvents.getChart().subscribe(val => {
        this.dataChart = val.data;
        this.data.Bar.series[0].push(val.data.jan.reserved);
        this.data.Bar.series[0].push(val.data.feb.reserved);
        this.data.Bar.series[0].push(val.data.mar.reserved);
        this.data.Bar.series[0].push(val.data.apr.reserved);
        this.data.Bar.series[0].push(val.data.may.reserved);
        this.data.Bar.series[0].push(val.data.jun.reserved);
        this.data.Bar.series[0].push(val.data.jul.reserved);
        this.data.Bar.series[0].push(val.data.aug.reserved);
        this.data.Bar.series[0].push(val.data.sep.reserved);
        this.data.Bar.series[0].push(val.data.oct.reserved);
        this.data.Bar.series[0].push(val.data.nov.reserved);
        this.data.Bar.series[0].push(val.data.dec.reserved);

        this.data.Bar.series[1].push(val.data.jan.wishlist);
        this.data.Bar.series[1].push(val.data.feb.wishlist);
        this.data.Bar.series[1].push(val.data.mar.wishlist);
        this.data.Bar.series[1].push(val.data.apr.wishlist);
        this.data.Bar.series[1].push(val.data.may.wishlist);
        this.data.Bar.series[1].push(val.data.jun.wishlist);
        this.data.Bar.series[1].push(val.data.jul.wishlist);
        this.data.Bar.series[1].push(val.data.aug.wishlist);
        this.data.Bar.series[1].push(val.data.sep.wishlist);
        this.data.Bar.series[1].push(val.data.oct.wishlist);
        this.data.Bar.series[1].push(val.data.nov.wishlist);
        this.data.Bar.series[1].push(val.data.dec.wishlist);

        this.data.Bar.series[2].push(val.data.jan.sold);
        this.data.Bar.series[2].push(val.data.feb.sold);
        this.data.Bar.series[2].push(val.data.mar.sold);
        this.data.Bar.series[2].push(val.data.apr.sold);
        this.data.Bar.series[2].push(val.data.may.sold);
        this.data.Bar.series[2].push(val.data.jun.sold);
        this.data.Bar.series[2].push(val.data.jul.sold);
        this.data.Bar.series[2].push(val.data.aug.sold);
        this.data.Bar.series[2].push(val.data.sep.sold);
        this.data.Bar.series[2].push(val.data.oct.sold);
        this.data.Bar.series[2].push(val.data.nov.sold);
        this.data.Bar.series[2].push(val.data.dec.sold);
        this.charts = [
          {
            data: this.data.Bar,
            options: this.options,
            type: 'Bar'
          }
        ];
      });
    }
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
      _this.dataDateMap.date_from = start.format('YYYY/MM/DD');
      _this.dataDateMap.date_from = end.format('YYYY/MM/DD');
      _this.step.setFromDateMap(_this.dataDateMap);
      // _this.step.setToDateMap(Date.parse(end.format('YYYY-MM-DD')));
    });
  }

  onUSD(temp) {
    this.step.setExchange(temp);
  }
}
