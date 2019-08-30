import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageRoutingModule } from './page.routing';
import { SidebarModule } from 'ng-sidebar';
import { ProgressbarModule, ModalModule } from 'ngx-bootstrap';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { PageComponent } from './components/page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { eventdablesComponent } from './components/eventdables/eventdables.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { ParallaxScrollModule } from 'ng2-parallaxscroll';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxLoadingModule } from 'ngx-loading';
import { InternationalPhoneModule } from 'ng4-intl-phone';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    SwiperModule,
    InternationalPhoneModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdMiMERYaQyj_WCdUTTdVazFjYD8kl0O0'
    }),
    ModalModule.forRoot(),
    RecaptchaModule.forRoot(),
    ParallaxScrollModule
  ],
  declarations: [
    PageComponent,
    SidebarComponent,
    HomeComponent,
    eventdablesComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    SignUpComponent,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
})
export class PageModule {
}
