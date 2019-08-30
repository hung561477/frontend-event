import { NgModule } from '@angular/core';
import { ThemeModule } from '../../share/@theme/theme.module';
import { TopContactComponent } from './top-contact/top-contact.component';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ContactComponent,
    TopContactComponent
  ],
  providers: [
  ],
})
export class ContactModule { }
