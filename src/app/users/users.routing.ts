import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UsersComponent } from './users.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { SearchEventsComponent } from './search-events/search-events.component';
import { PastEventsComponent } from './past-events/past-events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [{
    path: 'dashboard',
    component: ECommerceComponent,
  }, {
    path: 'monitoring',
    component: MonitoringComponent,
  }, {
    path: 'search-event',
    component: SearchEventsComponent,
  }, {
    path: 'past-event',
    component: PastEventsComponent,
  }, {
    path: 'event-detail/:id',
    component: EventDetailComponent,
  }, {
    path: 'event-detail/preview',
    component: EventDetailComponent,
  }, {
    path: 'calendar',
    component: MyCalendarComponent,
  }, {
    path: 'create-event',
    component: CreateEventComponent,
  }, {
    path: 'create-event/:id',
    component: CreateEventComponent,
  }, {
    path: 'seller-profile',
    component: SellerProfileComponent,
  }, {
    path: 'contact',
    component: ContactComponent,
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRouting {
}
