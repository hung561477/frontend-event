import { NgModule } from '@angular/core';
import { ThemeModule } from '../../share/@theme/theme.module';
import { MiscellaneousRoutingModule, routedComponents } from './miscellaneous-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    MiscellaneousRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class MiscellaneousModule { }
