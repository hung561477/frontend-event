import { Component, ChangeDetectionStrategy, AfterViewInit, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { EventsService } from 'src/app/share/service/event.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CalendarComponent } from 'ng-fullcalendar';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

declare const FullCalendar: any;

@Component({
  selector: 'event-my-calendar',
  templateUrl: './my-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./my-calendar.component.scss']
})
export class MyCalendarComponent implements OnInit {

  displayEvent: any;
  resources = [];
  externalEvents = [];
  events = [];
  options = {
    editable: true,
    droppable: true,
    slotEventOverlap: false
  };
  eventData: any;
  objEvent: any;
  arrayEvent = [];
  role = '';
  classEvent: any;
  private subscriptions = new Subscription();

  constructor(private eventService: EventsService, private auth: AuthenticationService) {
    this.role = auth.getUser().role;
  }

  ngOnInit() {
    this.resources = [
      {
        id: '1',
        title: ''
      }
    ];

    if (this.role === "SELLER") {
      this.subscriptions = this.eventService.getAllEventSeller().subscribe(data => {
        this.eventData = data.data;
        this.getEventCalendar();
      })
    } else {
      this.subscriptions = this.eventService.getAllEventBuyer().subscribe(data => {
        
        this.eventData = data.data;
        this.getEventCalendar();
      })
    }

    this.externalEvents = [
      {
        'title': 'Reserved',
        'duration': '01:00:00',
        'class': 'text-success',
        'className': 'bg-info',
      },
      {
        'title': 'Wishlist',
        'duration': '01:00:00',
        'class': 'text-warning',
        'className': 'bg-warning'
      },
      {
        'title': 'Sold',
        'duration': '01:00:00',
        'class': 'text-danger',
        'className': 'bg-danger',
      }
    ];
  }

  getEventCalendar() {
    this.eventData.events.forEach(element => {
      switch (element.userStatus) {
        case "WISHLIST":
          this.classEvent = "bg-warning";
          break;
        case "RESERVED":
          this.classEvent = "bg-info";
          break;
        case "SOLD":
          this.classEvent = "bg-danger";
          break;
        case undefined:
          this.classEvent = "bg-undefined";
          break;
      }
      this.arrayEvent.push({ title: element.name, start: element.date_from, end: element.date_to, className: this.classEvent });
    });
    this.events = this.arrayEvent;
  }


  getEvent(event) {
    return JSON.stringify(event);
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    };
    this.displayEvent = model;
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    };
    this.displayEvent = model;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
