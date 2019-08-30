import { Component } from '@angular/core';

@Component({
  selector: 'event-sold-card',
  styleUrls: ['./sold.component.scss'],
  templateUrl: './sold.component.html',
})
export class SoldComponent {

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
