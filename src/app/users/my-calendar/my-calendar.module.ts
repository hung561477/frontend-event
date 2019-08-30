import { NgModule } from '@angular/core';
import { ThemeModule } from '../../share/@theme/theme.module';
import { MyCalendarComponent } from './my-calendar.component';
import { TopMyCalendarComponent } from './top-my-calendar/top-my-calendar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AngularDraggableModule } from 'angular2-draggable';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FullCalendarModule,
    AngularDraggableModule
  ],
  declarations: [
    MyCalendarComponent,
    TopMyCalendarComponent,
    CalendarComponent
  ],
  providers: [
  ],
})
export class MyCalendarModule { }
