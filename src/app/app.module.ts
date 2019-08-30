import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './share/@theme/theme.module';
import { CoreModule } from './share/@core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './share/service/authentication.service';
import { AuthGuard } from './share/service/auth.guard';
import { ToggleService } from './share/service/toggle.service';
import { ItemService } from './share/service/item.service';
import { EventsService } from './share/service/event.service';
import { ApiClient } from './share/service/api-client.service';
import { AlertService } from './share/service/alert.service';
import { ValidationService } from './share/service/validation.service';
import { UploadFileService } from './share/service/upload-file.service';
import { StepService } from './share/service/step.service';
import { CountryService } from './share/service/country.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    ThemeModule.forRoot(),
    CoreModule.forRoot()
  ],
  providers: [
    AuthenticationService, AuthGuard, ToggleService, ItemService, EventsService, StepService, ApiClient, AlertService,
    ValidationService, UploadFileService, CountryService],
  bootstrap: [AppComponent],
})
export class AppModule { }
