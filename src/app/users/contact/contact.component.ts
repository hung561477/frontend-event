import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/share/service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactModel } from 'src/app/share/model/contact.model';

@Component({
    selector: 'event-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    contactForm: FormGroup;

    constructor(private auth: AuthenticationService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.createContactForm();
    }

    createContactForm() {
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    onSubmit() {
        const body = new ContactModel(
            this.contactForm.getRawValue().name,
            this.contactForm.getRawValue().email,
            this.contactForm.getRawValue().description,
        )
        this.auth.submitContact(body).subscribe(val => {
        })
    }

}
