import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ItemService } from '../../../share/service/item.service';

@Component({
  selector: 'event-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  isActive = 0;

  constructor(private menuActive: ItemService) {}

  ngOnInit() {
    this.menuActive.activeMenu.subscribe(activeMenu => {
      this.isActive = activeMenu;
    });
  }


  goSlide(id: number) {
    this.menuActive.setSlideActive(id);
  }
}
