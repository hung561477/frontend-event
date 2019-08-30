import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/share/service/event.service';
import { StepService } from 'src/app/share/service/step.service';

@Component({
  selector: 'event-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  isLogo = false;
  user: any;
  divWidth = 0;
  flag = 0;
  userMenu = [{ title: 'Profile' }];
  isToggle = false;
  listNotification: any = [];
  unRead: number = 0;

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

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private event: EventsService, 
    private step: StepService) {
    this.onResize();
    this.getNoti();
  }

  ngOnInit() {
    setInterval(() => {
      this.getNoti();
    }, 300000)
  }

  getNoti() {
    this.event.getNotification().subscribe(val => {
      this.listNotification = val;
      if (this.listNotification.data.length !== undefined) {
        this.unRead = this.listNotification.data.length;
      }
    })
  }

  changeRead(id: number) {
    this.event.submitSeenNotification(id).subscribe(val => {
      this.getNoti();
    })
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toogle() {
    this.isToggle = !this.isToggle;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  hiddenLogo() {
    this.flag++;
    if (this.flag % 2) {
      this.isLogo = true;
    } else {
      this.isLogo = false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    // window.location.reload();
    this.router.navigateByUrl(``);
    this.step.setMyGV(0);
  }
}
