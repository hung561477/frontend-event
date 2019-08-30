import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { delay, withLatestFrom, takeWhile } from 'rxjs/operators';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { StateService } from '../../../@core/data/state.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { StepService } from 'src/app/share/service/step.service';
import { EventsService } from 'src/app/share/service/event.service';

// TODO: move layouts into the framework
@Component({
  selector: 'event-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  template: `
    <nb-layout [center]="layout.id === 'center-column'" windowMode>
      <nb-layout-header fixed>
        <event-header [position]="sidebar.id === 'start' ? 'normal': 'inverse'"></event-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar"
                   tag="menu-sidebar"
                   responsive
                   [end]="sidebar.id === 'end'">
        <div class="user-profile" *ngIf="role === 'BUYER'" [ngStyle]="{background: 'url(' + user.avatar + ') no-repeat'}">
          <div class="profile-text"> <a (click)="userProfile()" class="user-info text-right" aria-haspopup="true"
          aria-expanded="true">{{user.first_name}}</a>
          </div>
        </div>
        <div class="user-profile" *ngIf="role === 'SELLER'" [ngStyle]="{background: 'url(' + logoCompany.company.image + ') no-repeat'}">
          <div class="profile-img"> <img *ngIf="role !== 'SELLER'" src="{{user.avatar}}" alt="user"> </div>
          <div class="profile-text"> <a (click)="userProfile()" class="user-info text-right" aria-haspopup="true"
          aria-expanded="true">{{user.first_name}}</a>
          </div>
        </div>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-column start class="small" *ngIf="layout.id === 'two-column' || layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-layout-column class="small" *ngIf="layout.id === 'three-column'">
        <nb-menu [items]="subMenu"></nb-menu>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <event-footer></event-footer>
      </nb-layout-footer>

      <nb-sidebar class="settings-sidebar"
                   tag="settings-sidebar"
                   state="collapsed"
                   fixed
                   [end]="sidebar.id !== 'end'">
        <event-theme-settings></event-theme-settings>
      </nb-sidebar>
    </nb-layout>
  `,
})
export class SampleLayoutComponent implements OnDestroy, OnInit {
  logoCompany: any = {
    company: {
      image: ''
    }
  };

  role: any;

  subMenu: NbMenuItem[] = [
    {
      title: 'PAGE LEVEL MENU',
      group: true,
    },
    {
      title: 'Buttons',
      icon: 'ion ion-android-radio-button-off',
      link: '/users/ui-features/buttons',
    },
    {
      title: 'Grid',
      icon: 'ion ion-android-radio-button-off',
      link: '/users/ui-features/grid',
    },
    {
      title: 'Icons',
      icon: 'ion ion-android-radio-button-off',
      link: '/users/ui-features/icons',
    },
    {
      title: 'Modals',
      icon: 'ion ion-android-radio-button-off',
      link: '/users/ui-features/modals',
    },
    {
      title: 'Typography',
      icon: 'ion ion-android-radio-button-off',
      link: '/users/ui-features/typography',
    },
    {
      title: 'Animated Searches',
      icon: 'ion ion-android-radio-button-off',
      link: '/users/ui-features/search-fields',
    },
    {
      title: 'Tabs',
      icon: 'ion ion-android-radio-button-off',
      link: '/users/ui-features/tabs',
    },
  ];
  layout: any = {};
  sidebar: any = {};
  user: any = {
    'first_name': '',
    'avatar': ''
  };
  last_name = '';
  dataInfo: any;
  avatar: any;
  isLogo = false;
  flag = 0;
  divWidth = 0;
  private alive = true;

  currentTheme: string;

  @HostListener('window:resize') onResize() {
    this.divWidth = window.innerWidth;
    if (this.divWidth < 1200) {
      this.isLogo = true;
      this.flag = 1;
    } else {
      this.isLogo = false;
      this.flag = 0;
    }
  }


  constructor(protected stateService: StateService,
    protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService,
    private auth: AuthenticationService,
    private router: Router,
    private step: StepService,
    private event: EventsService) {

    this.user = auth.getUser();
    this.role = auth.getUser().role;
    this.onResize();
    this.last_name = auth.getUser().last_name;
    this.stateService.onLayoutState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((layout: string) => this.layout = layout);

    this.stateService.onSidebarState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });

  }

  ngOnInit() {
    let temp: any;
    this.avatar = this.auth.getUser().avatar;
    temp = JSON.parse(localStorage.getItem('userInfo'));
    this.auth.getUserInfo().subscribe(val => {
      if (this.role === 'SELLER') {
        this.step.setCover(val.data.company.image);
        this.logoCompany.company.image = this.step.getMyCover();
      }
    })

    this.event.loadDataReloadAvatar.subscribe(val => {
      this.logoCompany.company.image = this.step.getMyCover();
    })
  }

  userProfile() {
    this.router.navigate(['/users/seller-profile']);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
