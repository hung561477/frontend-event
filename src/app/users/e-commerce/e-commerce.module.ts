import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule, BubbleChartComponent } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../share/@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';
import { ReservedComponent } from './reserved/reserved.component';
import { ECommerceChartsPanelComponent } from './charts-panel/charts-panel.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ChartModule } from 'angular2-chartjs';
import { SlideOutComponent } from './slide-out/slide-out.component';

import { CountryOrdersComponent } from './country-orders/country-orders.component';
import { CountryOrdersMapComponent } from './country-orders/map/country-orders-map.component';
import { CountryOrdersMapService } from './country-orders/map/country-orders-map.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CountryOrdersChartComponent } from './country-orders/chart/country-orders-chart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SoldComponent } from './sold/sold.component';
import { CompletedComponent } from './completed/completed.component';
import { TopDashboardComponent } from './top-dashboard/top-dashboard.component';
import { BubbleMapComponent } from '../maps/bubble/bubble-map.component';
import { ItemSoonComponent } from './item-soon/item-soon.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { ECommerceUserActivityComponent } from './user-activity/user-activity.component';
import { ECommerceProgressSectionComponent } from './progress-section/progress-section.component';
import { ChartjsBarComponent } from '../charts/chartjs/chartjs-bar.component';
import { NotPublishedComponent } from './not-published/not-published.component';
import { ChartistComponent } from './chartist/chartist.component';
import { TopOngoingComponent } from './top-ongoing/top-ongoing.component';
import { RecentlySoldComponent } from './recently-sold/recently-sold.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule
  ],
  declarations: [
    ECommerceComponent,
    ReservedComponent,
    SoldComponent,
    CompletedComponent,
    TopDashboardComponent,
    ECommerceChartsPanelComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    CountryOrdersComponent,
    CountryOrdersMapComponent,
    CountryOrdersChartComponent,
    SlideOutComponent,
    BubbleMapComponent,
    ChartjsBarComponent,
    SoldComponent,
    WishlistComponent,
    ItemSoonComponent,
    ProfitChartComponent,
    ECommerceUserActivityComponent,
    ECommerceProgressSectionComponent,
    NotPublishedComponent,
    ChartistComponent,
    TopOngoingComponent,
    RecentlySoldComponent,
    SummaryComponent
  ],
  providers: [
    CountryOrdersMapService,
  ],
})
export class ECommerceModule { }
