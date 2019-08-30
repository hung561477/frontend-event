import { Component } from '@angular/core';

@Component({
  selector: 'event-tiny-mce-page',
  template: `
    <nb-card>
      <nb-card-header>
        Tiny MCE
      </nb-card-header>
      <nb-card-body>
        <event-tiny-mce></event-tiny-mce>
      </nb-card-body>
    </nb-card>
  `,
})
export class TinyMCEComponent {
}
