import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NbPopoverDirective, NbSidebarService} from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';

import { ThemeSwitcherListComponent } from './themes-switcher-list/themes-switcher-list.component';
import {LayoutService} from '../../../@core/data/layout.service';

@Component({
  selector: 'event-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  @Input() showTitle: boolean = true;
  @Output() valueOutput: EventEmitter<any> = new EventEmitter<any>();

  switcherListComponent = ThemeSwitcherListComponent;
  theme: NbJSThemeOptions;

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService
  ){}

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    this.valueOutput.emit(null);

    return false;
  }
}
