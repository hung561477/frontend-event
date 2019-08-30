import { NgModule } from '@angular/core';
import { ThemeModule } from '../../share/@theme/theme.module';
import { SearchEventsComponent } from './search-events.component';
import { TopSearchComponent } from './top-search/top-search.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { MoreSearchComponent } from './more-search/more-search.component';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { ModalModule, CarouselModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { MoreFilterComponent } from './more-filter/more-filter.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    ThemeModule,
    IonRangeSliderModule,
    TagInputModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdMiMERYaQyj_WCdUTTdVazFjYD8kl0O0'
    }),
  ],
  declarations: [
    SearchEventsComponent,
    TopSearchComponent,
    ItemSearchComponent,
    MoreFilterComponent,
    MoreSearchComponent,
  ],
  providers: [
  ],
})
export class SearchEventsModule { }
