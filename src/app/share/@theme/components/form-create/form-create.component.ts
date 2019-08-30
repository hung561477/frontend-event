import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../../../service/event.service';
import { Event } from '../../../model/events.model';
import { AuthenticationService } from 'src/app/share/service/authentication.service';

@Component({
    selector: 'event-form-create',
    styleUrls: ['./form-create.component.scss'],
    templateUrl: './form-create.component.html',
})
export class FormCreateComponent implements OnInit {
    model;
    createEventForm: FormGroup;
    successMessage: String = '';
    public credential: Event = <Event>{};
    dataCreate: any = [];

    constructor(private eventService: EventsService,
        private router: Router,
        private formBuilder: FormBuilder,
        private auth: AuthenticationService) {
        this.createEventForm = this.formBuilder.group({
            name: ['', Validators.required],
            location: ['', Validators.required],
            venue: ['', Validators.required],
            status: ['', Validators.required],
            image: ['', Validators.required],
            url: ['', Validators.required],
            social_link: ['', Validators.required],
            size: ['', Validators.required],
            tag: ['', Validators.required],
            date_from: ['', Validators.required],
            date_to: ['', Validators.required],
            date: ['', Validators.required],
            sponsor_deadline: ['', Validators.required]
        });
    }

    isValid(controlName) {
        return this.createEventForm.get(controlName).invalid && this.createEventForm.get(controlName).touched;
    }

    ngOnInit() {
    }

    onSubmit() {
        this.credential = this.createEventForm.getRawValue();
        this.eventService.submitCreateEvent(this.credential)
            .subscribe(
                data => {
                    if (data.code === 200) {
                        this.router.navigate(['/users/monitoring']);
                    } else {
                        this.auth.tokenExpire();
                    }
                },
                error => this.successMessage = 'Some error'
            );
    }
}
