import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../share/service/event.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
  selector: 'event-past-events',
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.scss']
})
export class PastEventsComponent implements OnInit, OnDestroy {
  role = '';
  completed: any = [];
  dataAll: any = [];
  private subscriptions = new Subscription();
  @Input() valueInput: any;

  constructor(private itemEvents: EventsService, private route: ActivatedRoute,
    private auth: AuthenticationService) {
    this.role = auth.getUser().role;
  }

  ngOnInit() {
    this.subscriptions.add(
      this.itemEvents.getPastEvent().subscribe(data => {
        if (data.code === 200) {
          this.dataAll = data.data;
          this.completed = this.dataAll.events;
          this.itemEvents.setDataPast(this.completed);
        } else {
          this.auth.tokenExpire();
        }
      })
    );
    this.itemEvents.loadDataPast.subscribe((value: any) => {
      this.completed = value;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
