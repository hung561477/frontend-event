import { Component } from '@angular/core';

@Component({
  selector: 'event-completed-card',
  styleUrls: ['./completed.component.scss'],
  templateUrl: './completed.component.html',
})
export class CompletedComponent {

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
