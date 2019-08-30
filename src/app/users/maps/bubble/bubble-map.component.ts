import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as moment from 'moment';
import { NgxEchartsService } from 'ngx-echarts';
import { combineLatest } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { CountryService } from 'src/app/share/service/country.service';
import { EventsService } from 'src/app/share/service/event.service';
import { StepService } from 'src/app/share/service/step.service';

@Component({
    selector: 'event-bubble-map',
    styleUrls: ['./bubble-map.component.scss'],
    template: `
        <nb-card>
            <nb-card-body>
                <div echarts [options]="options" [merge]="updateOptions" class="echarts" style="height: 300px;"></div>
            </nb-card-body>
        </nb-card>
    `,
})
export class BubbleMapComponent implements OnDestroy, AfterViewInit {

    latlong: any = {};
    mapData: any[];
    mapChart: { 'code': string, 'name': any, 'value': any, 'color': string }[] = [];
    nameMap: any;
    max = -Infinity;
    min = Infinity;
    options: any;
    countryName: any;
    latlongMap: any = {};
    fromDate: any;
    toDate: any;
    supscription: any;
    supscriptionInitChart: any;

    bubbleTheme: any;
    geoColors: any[];
    dataDateMap: any = {
        date_from: '',
        date_to: ''
    };

    updateOptions;

    private alive = true;

    constructor(private theme: NbThemeService,
                private http: HttpClient,
                private es: NgxEchartsService,
                private country: CountryService,
                private event: EventsService,
                private step: StepService) {

        this.countryName = this.country.getLongNameCountry();

        this.registEventSearch();
        this.intiChart();

        const date = {
            date_from: moment().startOf('hour').format('YYYY/MM/DD'),
            date_to: moment().startOf('hour').add(32, 'hour').format('YYYY/MM/DD')
        };

        this.searchMapEvent(date);

    }


    registEventSearch() {

        if (this.supscription) {
            this.supscription.unsubscribe();
        }
        this.supscription = this.step.loadDataFromDateMap.subscribe(value => {
            this.searchMapEvent(value);
        });
    }

    intiChart() {
        if (this.supscriptionInitChart) {
            this.supscriptionInitChart.unsubscribe();
        }
        this.supscriptionInitChart = combineLatest([
            this.http.get('assets/asia.json'),
            this.theme.getJsTheme(),
        ])
            .pipe(takeWhile(() => this.alive))
            .subscribe(([map, config]: [any, any]) => {

                this.es.registerMap('world', map);

                const colors = config.variables;
                this.bubbleTheme = config.variables.bubbleMap;
                this.geoColors = [colors.primary, colors.info, colors.success, colors.warning, colors.danger];

                // this.latlong = this.latlongMap;

                this.mapData = [...this.mapChart];

                this.mapData.forEach((itemOpt) => {
                    if (itemOpt.value > this.max) {
                        this.max = itemOpt.value;
                    }
                    if (itemOpt.value < this.min) {
                        this.min = itemOpt.value;
                    }
                });

                console.log(this.mapChart);
                console.log(this.mapData);

                this.options = {
                    title: {
                        text: '',
                        left: 'center',
                        top: 'top',
                        textStyle: {
                            color: this.bubbleTheme.titleColor,
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: params => {
                            return `${params.name}: ${params.value[2]}`;
                        },
                    },
                    zoomControl: false,
                    visualMap: {
                        show: false,
                        min: 0,
                        max: this.max,
                        inRange: {
                            symbolSize: [6, 60],
                        },
                    },
                    geo: {
                        name: 'World Population (2010)',
                        type: 'map',
                        map: 'world',
                        roam: true,
                        label: {
                            emphasis: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                areaColor: this.bubbleTheme.areaColor,
                                borderColor: this.bubbleTheme.areaBorderColor,
                            },
                            emphasis: {
                                areaColor: this.bubbleTheme.areaHoverColor,
                            },
                        },
                        zoom: 1.1,
                    },
                    series: [
                        {
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: this.mapData.map(itemOpt => {
                                return {
                                    name: itemOpt.name,
                                    value: [
                                        this.latlongMap[itemOpt.code].longitude,
                                        this.latlongMap[itemOpt.code].latitude,
                                        itemOpt.value,
                                    ],
                                    itemStyle: {
                                        normal: {
                                            color: itemOpt.color,
                                        },
                                    },
                                };
                            })
                        },
                    ],
                };
            });
    }

    searchMapEvent(date) {
        this.event.getEventMap(date).subscribe(val => {
            console.log('get event data', val);
            this.mapChart = [];
            this.nameMap = val;
            this.nameMap.data.forEach(element => {
                this.latlongMap[element.code] = { latitude: element.longtitude, longitude: element.latitude };

                element.code = element.code.substr(0, 2);

                this.mapChart.push({
                    'code': element.code, 'name': this.countryName[element.code].name, 'value': element.value,
                    'color': element.status === 'RESERVED' ? '#4897D8' : (element.status === 'WISHLIST' ? '#258039' : '#F25C00')
                });
            });

            this.mapData = [...this.mapChart];

            this.updateOptions = {
                series: [{
                    data: this.mapData.map(itemOpt => {
                        return {
                            name: itemOpt.name,
                            value: [
                                this.latlongMap[itemOpt.code].longitude,
                                this.latlongMap[itemOpt.code].latitude,
                                itemOpt.value,
                            ],
                            itemStyle: {
                                normal: {
                                    color: itemOpt.color,
                                },
                            },
                        };
                    })
                }]
            };

        });
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this.alive = false;
        if (this.supscription) {
            this.supscription.unsubscribe();
        }
    }

    private getRandomGeoColor() {
        const index = Math.round(Math.random() * this.geoColors.length);
        return this.geoColors[index];
    }
}
