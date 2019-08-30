import { NgModule } from '@angular/core';
import { ThemeModule } from '../../share/@theme/theme.module';
import { MonitoringComponent } from './monitoring.component';
import { TopMonitoringComponent } from './top-monitoring/top-monitoring.component';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot()
  ],
  declarations: [
    MonitoringComponent,
    TopMonitoringComponent
  ],
  providers: [
  ],
})
export class MonitoringModule { }
