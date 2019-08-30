import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ItemService {

    private btnFilter = new Subject<number>();
    openBtn = this.btnFilter.asObservable();

    private btnMenu = new Subject<number>();
    activeMenu = this.btnMenu.asObservable();

    private idMenu = new Subject<number>();
    activeSlide = this.idMenu.asObservable();

    private dataGender = new Subject<any>();
    loadDataGender = this.dataGender.asObservable();

    setGender(value: any) {
        this.dataGender.next(value);
    }

    setBtn(value: number) {
        this.btnFilter.next(value);
    }

    setMenuActive(value: number) {
        this.btnMenu.next(value);
    }

    setSlideActive(value: number) {
        this.idMenu.next(value);
    }

}
