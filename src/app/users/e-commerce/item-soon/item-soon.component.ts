import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EventsService } from 'src/app/share/service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'event-soon',
  styleUrls: ['./item-soon.component.scss'],
  templateUrl: './item-soon.component.html',
})
export class ItemSoonComponent implements OnChanges {
  completed: any = [];
  tag: any = [];
  countTag: number;
  private subscriptions = new Subscription();

  @Input() valueInput: any;

  constructor(private event: EventsService, private router: Router, private auth: AuthenticationService) { }

  goEventDetail(id: any) {
    this.subscriptions = this.event.getEventId(id).subscribe(
      data => {
        if (data.code === 200) {
          this.event.setEventDetail(data.data);
          this.router.navigateByUrl(`/users/event-detail/${id}`);
        } else {
          this.auth.tokenExpire();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const temp = changes.valueInput.currentValue;
    this.completed = temp;
    this.tag = this.completed.tag.split(', ');
    this.countTag = this.tag.length;
  }
}
