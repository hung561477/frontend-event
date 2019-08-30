import { Component } from '@angular/core';

@Component({
  selector: 'event-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">© 2019 event Pte. Ltd. All Rights Reserved.</span>
    <div class="socials">
      <a href="" target="_blank" class="ion ion-social-facebook"></a>
      <a href="" target="_blank" class="ion ion-social-twitter"></a>
      <a href="" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
