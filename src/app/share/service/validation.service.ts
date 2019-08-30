import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ValidationService {

    private keyStep = new Subject<any>();
    loadKeyStep = this.keyStep.asObservable();

    private validate = new Subject<any>();
    activeValidate = this.validate.asObservable();

    private validate1 = new Subject<any>();
    activeValidate1 = this.validate1.asObservable();

    private validate2 = new Subject<any>();
    activeValidate2 = this.validate2.asObservable();

    private validateModal = new Subject<any>();
    activeValidateModal = this.validateModal.asObservable();

    private validateDes = new Subject<any>();
    activeValidateDes = this.validateDes.asObservable();

    private validateStep = new Subject<any>();
    activeValidateStep = this.validateStep.asObservable();


    setValidateActive(value: any) {
        this.validate.next(value);
    }

    setKeyStep(value: any) {
        this.keyStep.next(value);
    }

    setValidateActive1(value: any) {
        this.validate1.next(value);
    }

    setValidateActive2(value: any) {
        this.validate2.next(value);
    }

    setValidateActiveModal(value: any) {
        this.validateModal.next(value);
    }

    setValidateDesActive(value: any) {
        this.validateDes.next(value);
    }

    setValidateStepActive(value: any) {
        this.validateStep.next(value);
    }

}
