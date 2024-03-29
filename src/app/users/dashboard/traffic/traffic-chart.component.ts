import { delay, takeWhile } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../share/@core/data/layout.service';

const points = [300, 520, 435, 530, 730, 620, 660, 860];

@Component({
  selector: 'event-traffic-chart',
  styleUrls: ['./traffic.component.scss'],
  template: `
    <div echarts
         [options]="option"
         class="echart"
         (chartInit)="onChartInit($event)">
    </div>
  `,
})
export class TrafficChartComponent implements AfterViewInit, OnDestroy {

  private alive = true;

  type = 'month';
  types = ['week', 'month', 'year'];
  option: any = {};
  echartsIntance: any;

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(
        delay(1),
        takeWhile(() => this.alive),
      )
      .subscribe(config => {
        const trafficTheme: any = config.variables.traffic;

        this.option = Object.assign({}, {
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: points,
          },
          yAxis: {
            boundaryGap: [0, '5%'],
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: trafficTheme.colorBlack,
                opacity: 0.06,
                width: '1',
              },
            },
          },
          tooltip: {
            axisPointer: {
              type: 'shadow',
            },
            textStyle: {
              color: trafficTheme.tooltipTextColor,
              fontWeight: trafficTheme.tooltipFontWeight,
              fontSize: 16,
            },
            position: 'top',
            backgroundColor: trafficTheme.tooltipBg,
            borderColor: trafficTheme.tooltipBorderColor,
            borderWidth: 3,
            formatter: '{c0} MB',
            extraCssText: trafficTheme.tooltipExtraCss,
          },
          series: [
            {
              type: 'line',
              symbol: 'circle',
              symbolSize: 8,
              sampling: 'average',
              silent: true,
              itemStyle: {
                normal: {
                  color: trafficTheme.shadowLineDarkBg,
                },
                emphasis: {
                  color: 'rgba(0,0,0,0)',
                  borderColor: 'rgba(0,0,0,0)',
                  borderWidth: 0,
                },
              },
              lineStyle: {
                normal: {
                  width: 2,
                  color: trafficTheme.shadowLineDarkBg,
                },
              },
              data: points.map(p => p - 15),
            },
            {
              type: 'line',
              symbol: 'circle',
              symbolSize: 6,
              sampling: 'average',
              itemStyle: {
                normal: {
                  color: trafficTheme.itemColor,
                  borderColor: trafficTheme.itemBorderColor,
                  borderWidth: 2,
                },
                emphasis: {
                  color: 'white',
                  borderColor: trafficTheme.itemEmphasisBorderColor,
                  borderWidth: 2,
                },
              },
              lineStyle: {
                normal: {
                  width: 2,
                  color: trafficTheme.lineBg,
                  shadowColor: trafficTheme.lineBg,
                  shadowBlur: trafficTheme.lineShadowBlur,
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: trafficTheme.gradFrom,
                  }, {
                    offset: 1,
                    color: trafficTheme.gradTo,
                  }]),
                  opacity: 1,
                },
              },
              data: points,
            },
          ],
        });
    });
  }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
