import {
    Component, OnInit, OnDestroy, AfterViewChecked, EventEmitter, Output, ElementRef,
    Input, DoCheck, IterableDiffers, TemplateRef, ViewChild
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

declare const FullCalendar: any;
// declare var $: any;

@Component({
    selector: 'event-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewChecked, DoCheck, OnDestroy {

    @Input() externalsRef: ElementRef;
    addForm: FormGroup;
    editForm: FormGroup;
    calendar: any;
    differ: any;
    startTime: any;
    endTime: any;
    initialized: boolean;
    eventName = '';
    idDel = '';
    eventClick: any;
    modalRef: BsModalRef;
    @ViewChild('editSomething') editSomethingModal: TemplateRef<any>;
    @ViewChild('addSomething') addSomethingModal: TemplateRef<any>;
    @Input() events: any[];
    @Output() eventsChange = new EventEmitter();

    constructor(private el: ElementRef, differs: IterableDiffers, private modalService: BsModalService,
        private formBuilder: FormBuilder) {
        this.differ = differs.find([]).create(null);
        this.initialized = false;
    }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            'title': ''
        });
        this.editForm = this.formBuilder.group({
            'title': ''
        });
    }


    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'modal-fix modal-sm' })
        );
    }

    hideModal(template: TemplateRef<any>) {
        this.modalService.hide(1);
    }

    ngOnDestroy() {
        if (this.calendar) {
            this.calendar.destroy();
            this.calendar = null;
        }
    }

    ngAfterViewChecked() {
        if (!this.initialized) {
            FullCalendar.dragula({
                containers: [this.externalsRef],
                copy: true
            });
            this.calendar = new FullCalendar.Calendar(this.el.nativeElement, {
                editable: true,
                droppable: true,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                eventOverlap: false,
                drop: (date) => {
                },
                renderEvent: (event) => {
                    return true;
                },
                updateEvent: (event) => {
                },
                removeEvents: (event) => {
                    return true;
                },
                eventClick: (modal) => {
                    this.eventClick = modal;
                    this.eventName = modal.title;
                    this.idDel = modal._id;
                    this.openModal(this.editSomethingModal);
                },
                dayClick: (date) => {
                    this.startTime = date;
                    this.openModal(this.addSomethingModal);
                },
                eventReceive: (event) => {
                },
                eventDrop: (event, delta, revertFunc) => {
                },
            });
            this.calendar.render();
            if (this.events) {
                this.calendar.addEventSource(this.events);
            }
            this.initialized = true;
        }
    }

    addEvent() {
        const eventData = {
            title: this.addForm.value.title,
            start: this.startTime
        };
        this.hideModal(this.addSomethingModal);
        this.calendar.renderEvent(eventData);
    }
    editEvent() {
        this.eventClick.title = this.editForm.value.title;
        this.hideModal(this.editSomethingModal);
        this.calendar.updateEvent(this.eventClick);
    }
    delEvent() {
        this.hideModal(this.editSomethingModal);
        this.calendar.removeEvents(this.idDel);
    }

    ngDoCheck() {
        const eventChanges = this.differ.diff(this.events);
        if (this.calendar && eventChanges) {
            this.calendar.removeEventSources();

            if (this.events) {
                this.calendar.addEventSource(this.events);
            }
        }
    }

}
