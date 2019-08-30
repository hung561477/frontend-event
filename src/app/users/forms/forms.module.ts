import { NgModule } from '@angular/core';

import { ThemeModule } from '../../share/@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
