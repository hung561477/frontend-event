import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';

import { MENU_ITEMS } from './users-menu';
import { AuthenticationService } from '../share/service/authentication.service';
import { StepService } from '../share/service/step.service';

@Component({
  selector: 'event-user',
  template: `
    <event-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </event-sample-layout>
  `,
})
export class UsersComponent implements OnChanges, OnInit {

  menu = MENU_ITEMS;
  role: any;
  flag: number = 0;

  constructor(private auth: AuthenticationService, private step: StepService) {
    this.role = auth.getUser().role;
    this.removeActiveMenu();
    this.checkSeller();
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.removeActiveMenu();
  }

  checkSeller() {
    this.menu.forEach(element => {
      if (element.title === 'Create my event' || element.title === 'Past Events' || element.title === 'Recent Events') {
        if (this.role !== 'SELLER') {
          element.hidden = true;
        } else {
          element.hidden = false;
        }
      } else if (element.title === 'Monitoring' || element.title === 'Search Event') {
        if (this.role !== 'BUYER') {
          element.hidden = true;
        } else {
          element.hidden = false;
        }
      }
    });
  }
  
  removeActiveMenu() {
    this.menu.forEach(element => {
      element.selected = false;
    });
  }
}
