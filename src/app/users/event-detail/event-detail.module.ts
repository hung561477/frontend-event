import { NgModule } from '@angular/core';
import { ThemeModule } from '../../share/@theme/theme.module';
import { EventDetailComponent } from './event-detail.component';
import { TopEventDetailComponent } from './top-event-detail/top-event-detail.component';
import { ModalModule, CarouselModule } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToasterModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdMiMERYaQyj_WCdUTTdVazFjYD8kl0O0'
    }),
    CarouselModule.forRoot(),
  ],
  declarations: [
    TopEventDetailComponent,
    EventDetailComponent
  ],
  providers: [
  ],
})
export class EventDetailModule { }
