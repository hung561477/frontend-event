import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareButtonModule } from '@ngx-share/button';
import { ShareButtonsModule } from '@ngx-share/buttons';

import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbProgressBarModule
} from '@nebular/theme';

import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  SwitcherComponent,
  LayoutDirectionSwitcherComponent,
  ThemeSwitcherComponent,
  TinyMCEComponent,
  ThemeSwitcherListComponent,
  ItemWishListComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  SampleLayoutComponent,
  OneColumnLayoutComponent
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { FormCreateComponent } from './components/form-create/form-create.component';
import { ItemSearchEventComponent } from './components/item-search/item-search.component';
import { ModalEventoryComponent } from './components/modal-enventory/modal-enventory.component';
import { TagInputModule } from 'ngx-chips';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { Select2Module } from 'ng2-select2';
import { ItemRecentEventComponent } from './components/item-recent/item-recent.component';
import { CarouselModule, BsDropdownModule } from 'ngx-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { ProgressBarModule } from 'angular-progress-bar';
import { ItemMarkComponent } from './components/item-mark/item-mark.component';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, TagInputModule, IonRangeSliderModule, Select2Module];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NgbModule,
  NbSecurityModule, // *nbIsGranted directive,
  NbProgressBarModule,
  ProgressBarModule,
];

const COMPONENTS = [
  SwitcherComponent,
  LayoutDirectionSwitcherComponent,
  ThemeSwitcherComponent,
  ThemeSwitcherListComponent,
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  ThemeSettingsComponent,
  TinyMCEComponent,
  SampleLayoutComponent,
  OneColumnLayoutComponent,
  ItemWishListComponent,
  ItemMarkComponent,
  ModalEventoryComponent,
  ItemSearchEventComponent,
  FormCreateComponent,
  ItemRecentEventComponent
];

const ENTRY_COMPONENTS = [
  ThemeSwitcherListComponent,
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES, ShareButtonModule.forRoot(), ShareButtonsModule.forRoot(), 
    CarouselModule.forRoot(), BsDropdownModule.forRoot(), 
    NgxLoadingModule.forRoot({})],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
