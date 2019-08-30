import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ToggleService {
    menuOpen: boolean;
    menuOpenChange: Subject<boolean> = new Subject<boolean>();
    menuFilter: boolean;
    menuOpenFilter: Subject<boolean> = new Subject<boolean>();

    // Modal
    private dataModal = new Subject<any>();
    loadDataModal = this.dataModal.asObservable();

    private dataMenuFilter = new Subject<any>();
    loadDataMenuFilter = this.dataMenuFilter.asObservable();

    private dataIsShow = new Subject<any>();
    loadDataIsShow = this.dataIsShow.asObservable();

    private dataIsFilter = new Subject<any>();
    loadIsFilter = this.dataIsFilter.asObservable();

    private dataFilter = new Subject<any>();
    loadDataFilter = this.dataFilter.asObservable();

    private dataCount = new Subject<any>();
    loadDataCount = this.dataCount.asObservable();

    private dataFrom = new Subject<any>();
    loadDataFrom = this.dataFrom.asObservable();

    private dataTo = new Subject<any>();
    loadDataTo = this.dataTo.asObservable();

    private dataAgeFrom = new Subject<any>();
    loadDataAgeFrom = this.dataAgeFrom.asObservable();

    private dataAgeTo = new Subject<any>();
    loadDataAgeTo = this.dataAgeTo.asObservable();

    private dataSizeFrom = new Subject<any>();
    loadDataSizeFrom = this.dataSizeFrom.asObservable();

    private dataSizeTo = new Subject<any>();
    loadDataSizeTo = this.dataSizeTo.asObservable();

    private dataFilterSubmit = new Subject<any>();
    loadDataFilterSubmit = this.dataFilterSubmit.asObservable();

    private dataCheckInventory = new Subject<any>();
    loadDataCheckInventory = this.dataCheckInventory.asObservable();

    constructor() {
        this.menuOpenChange.subscribe((value) => {
            this.menuOpen = value;
        });

        this.menuOpenFilter.subscribe((value) => {
            this.menuFilter = value;
        });
    }

    toggleMenuOpen() {
        this.menuOpenChange.next(!this.menuOpen);
    }

    toogleFilterOpen(status) {
        this.dataMenuFilter.next(!status);
    }

    changeIsShow(val) {
        this.dataIsShow.next(!val);
    }

    changeShowFilter() {
        this.dataIsFilter.next(true);
        this.dataIsShow.next(false);
    }

    setDataFilter(val) {
        this.dataFilter.next(val);
    }

    setDataCount(val) {
        this.dataCount.next(val);
    }

    setModal(value: any) {
        this.dataModal.next(value);
    }

    setBudget(from, to) {
        this.dataFrom.next(from);
        this.dataTo.next(to);
    }

    setAge(from, to) {
        this.dataAgeFrom.next(from);
        this.dataAgeTo.next(to);
    }

    setSize(from, to) {
        this.dataSizeFrom.next(from);
        this.dataSizeTo.next(to);
    }

    setFilter(val) {
        this.dataFilterSubmit.next(val);
    }

    setCheckInventory(val) {
        this.dataCheckInventory.next(val);
    }

}
