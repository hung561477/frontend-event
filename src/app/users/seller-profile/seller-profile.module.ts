import { NgModule } from '@angular/core';
import { ThemeModule } from '../../share/@theme/theme.module';
import { SellerProfileComponent } from './seller-profile.component';
import { TopSellerProfileComponent } from './top-seller-profile/top-seller-profile.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
      SellerProfileComponent,
      TopSellerProfileComponent
  ],
  providers: [
  ],
})
export class SellerProfileModule { }
