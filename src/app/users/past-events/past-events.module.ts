import { NgModule } from '@angular/core';
import { ThemeModule } from '../../share/@theme/theme.module';
import { TopPastEventsComponent } from './top-past-events/top-past-events.component';
import { PastEventsComponent } from './past-events.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    PastEventsComponent,
    TopPastEventsComponent,
  ],
  providers: [
  ],
})
export class PastEventsModule { }
