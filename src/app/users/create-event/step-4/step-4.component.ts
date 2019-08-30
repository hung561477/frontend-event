import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap';
import { EventsService } from 'src/app/share/service/event.service';
import { Invent } from 'src/app/share/model/events.model';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { StepService } from 'src/app/share/service/step.service';
import { ToggleService } from 'src/app/share/service/toggle.service';

@Component({
    selector: 'event-step-4',
    templateUrl: './step-4.component.html',
    styleUrls: ['./step-4.component.scss']
})
export class Step4Component implements OnInit {
    @Input() step4: FormGroup;
    @ViewChild('lgModal') childModal: ModalDirective;
    modalOption: NgbModalOptions = {};
    modalRef: BsModalRef;
    dataTable: any = [];
    dataInvent: any = [];
    deleteInventory: any = [];
    activeDom = 0;
    validInventory: boolean = false;
    paramId: string;

    isActive = false;
    config = {
        backdrop: 'static',
        keyboard: true,
        ignoreBackdropClick: false
    };
    arrId = [];
    constructor(private modalService: BsModalService, private event: EventsService,
        private router: Router, private step: StepService, private route: ActivatedRoute,
        private toggle: ToggleService) {
            this.paramId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.step.loadDataEventInventory.subscribe(val => {
            this.dataTable = val;
            this.dataTable.forEach(element => {
                this.dataInvent.push({ id: element.id });
                this.arrId.push(element.id);
            });
            this.step.setDataEventory(this.dataInvent);
        });
        if (this.paramId) {
            this.dataTable = this.step.getInventTable();
        }
        
        this.step.loadIsActive.subscribe(val => {
            this.isActive = val;
        })

        this.event.loadDataAllInven.subscribe(val => {
            this.dataTable = [];
            this.dataTable = val;
        });

        this.toggle.loadDataCheckInventory.subscribe(val => {
            this.validInventory = val;
        })

        this.event.setDomInvent(0);
    }

    openModal(dom) {
        this.childModal.show();
        this.step.setIsActive(true);
        this.isActive = true;
        this.event.setDomInvent(dom);
        this.step.setOpen(dom);
    }

    editObj(i, data) {
        this.step.setInvent(data);
        this.childModal.show();
        this.event.setDataEditInven(i, data);
        this.step.setIsActive(false);
        this.isActive = true;
        this.event.setDomInvent(2);
        this.step.setOpen(2);
    }

    delObj(val, item) {
        if(item.id) {
            this.event.delInventId(item.id).subscribe(val => {
                console.log(val)
            })
        }
        this.dataTable.splice(val, 1);
        this.event.setDataInventory(this.dataTable);
        this.step.setDataEventory(this.dataTable);
        this.step.setInventTable(this.dataTable);


    }

    goPreview() {
        this.router.navigate(['/users/event-detail/preview']);
    }
}
