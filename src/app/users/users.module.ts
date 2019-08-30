import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { UsersRouting } from './users.routing';
import { ThemeModule } from '../share/@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { SearchEventsModule } from './search-events/search-events.module';
import { PastEventsModule } from './past-events/past-events.module';
import { EventDetailModule } from './event-detail/event-detail.module';
import { MyCalendarModule } from './my-calendar/my-calendar.module';
import { CreateEventModule } from './create-event/create-event.module';
import { SellerProfileModule } from './seller-profile/seller-profile.module';
import { ContactModule } from './contact/contact.module';
import { ToasterModule } from 'angular2-toaster';
import { HttpModule } from '@angular/http';

const PAGES_COMPONENTS = [
  UsersComponent
];

@NgModule({
  imports: [
    HttpModule,
    UsersRouting,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MonitoringModule,
    SearchEventsModule,
    MiscellaneousModule,
    PastEventsModule,
    EventDetailModule,
    MyCalendarModule,
    CreateEventModule,
    SellerProfileModule,
    ContactModule,
    ToasterModule.forRoot(),
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ],
})
export class UsersModule {
}
