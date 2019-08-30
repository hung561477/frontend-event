import { NgModule } from '@angular/core';
import { ThemeModule } from '../../share/@theme/theme.module';
import { CreateEventComponent } from './create-event.component';
import { TopCreateEventComponent } from './top-create-event/top-create-event.component';
import { TagInputModule } from 'ngx-chips';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Step1Component } from './step-1/step-1.component';
import { Step2Component } from './step-2/step-2.component';
import { Step3Component } from './step-3/step-3.component';
import { Step4Component } from './step-4/step-4.component';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { NgbdDatepickerRangeComponent } from './date-range/date-range.component';
import { ModalModule } from 'ngx-bootstrap';
import { Select2Module } from 'ng2-select2';
import { NgxLoadingModule } from 'ngx-loading';
import { AgmCoreModule } from '@agm/core';
import {ProgressBarModule} from "angular-progress-bar";

@NgModule({
  imports: [
    ThemeModule,
    ReactiveFormsModule,
    TagInputModule,
    ProgressBarModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdMiMERYaQyj_WCdUTTdVazFjYD8kl0O0',
      libraries: ["places"]
    }),
    IonRangeSliderModule,
    Select2Module
  ],
  declarations: [
    CreateEventComponent,
    TopCreateEventComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    NgbdDatepickerRangeComponent
  ],
  providers: [
  ],
})
export class CreateEventModule { }
