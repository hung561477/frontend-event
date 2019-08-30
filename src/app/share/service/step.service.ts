import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class StepService {
    myGlobalVar;
    coverCompany;
    tokenExpire;
    myInventory;
    inventory;
    isOpen;
    inventTable;
    constructor() {
        this.myGlobalVar = 0;
        this.coverCompany = '';
        this.myInventory = {};
        this.inventory = {};
        this.isOpen = 0;
        this.inventTable = [];
        this.tokenExpire = false;
    }

    private isActive = new Subject<any>();
    loadIsActive = this.isActive.asObservable();

    // dataAmenities;
    // dataActivation;
    // From Date
    private dataFromDate = new Subject<any>();
    loadDataFromDate = this.dataFromDate.asObservable();
    // To Date
    private dataToDate = new Subject<any>();
    loadDataToDate = this.dataToDate.asObservable();
    // From Date Map
    private dataFromDateMap = new Subject<any>();
    loadDataFromDateMap = this.dataFromDateMap.asObservable();
    // To Date Map
    private dataToDateMap = new Subject<any>();
    loadDataToDateMap = this.dataToDateMap.asObservable();
    //Spon Dealine
    private dataSponDate = new Subject<any>();
    loadDataSponDate = this.dataSponDate.asObservable();
    // Age
    private dataAge = new Subject<any>();
    loadDataAge = this.dataAge.asObservable();

    private dataFromAge = new Subject<any>();
    loadDataFromAge = this.dataFromAge.asObservable();

    private dataToAge = new Subject<any>();
    loadDataToAge = this.dataToAge.asObservable();

    // Career
    private dataCareer = new Subject<any>();
    loadDataCareer = this.dataCareer.asObservable().delay(1000);

    // Career Update
    private dataCareerUpdate = new Subject<any>();
    loadDataCareerUpdate = this.dataCareerUpdate.asObservable();

    // Career Inventory
    private dataCareerInvent = new Subject<any>();
    loadDataCareerInvent = this.dataCareerInvent.asObservable();

    // Career Inventory ID
    private dataCareerIdInvent = new Subject<any>();
    loadDataCareerIdInvent = this.dataCareerIdInvent.asObservable();

    // Gender
    private dataGender = new Subject<any>();
    loadDataGender = this.dataGender.asObservable();

    // Civil
    private dataCivil = new Subject<any>();
    loadDataCivil = this.dataCivil.asObservable();

    // Venue
    private dataVenue = new Subject<any>();
    loadDataVenue = this.dataVenue.asObservable();

    // Activities
    private dataActivities = new Subject<any>();
    loadDataActivities = this.dataActivities.asObservable();

    // Tag
    private dataTag = new Subject<any>();
    loadDataTag = this.dataTag.asObservable();

    // Tag Search
    private dataTagSearch = new Subject<any>();
    loadDataTagSearch = this.dataTagSearch.asObservable();

    // Location
    private dataLocation = new Subject<any>();
    loadDataLocation = this.dataLocation.asObservable();

    // Inventory
    private dataInventory = new Subject<any>();
    loadDataInventory = this.dataInventory.asObservable();

    // Data inventory
    private dataEventInventory = new Subject<any>();
    loadDataEventInventory = this.dataEventInventory.asObservable();

    // Residence
    private dataResidence = new Subject<any>();
    loadDataResidence = this.dataResidence.asObservable();

    // Residence Location
    private dataResidenceLocation = new Subject<any>();
    loadDataResidenceLocation = this.dataResidenceLocation.asObservable();

    // HouseIncome
    private dataHouseIncome = new Subject<any>();
    loadDataHouseIncome = this.dataHouseIncome.asObservable();

    // Amenities
    private dataAmenities = new Subject<any>();
    loadDataAmenities = this.dataAmenities.asObservable();

    // Amenities Edit
    private dataAmenitiesEdit = new Subject<any>();
    loadDataAmenitiesEdit = this.dataAmenitiesEdit.asObservable().delay(1000);

    // Activation
    private dataActivation = new Subject<any>();
    loadDataActivation = this.dataActivation.asObservable();

    // Activation Edit
    private dataActivationEdit = new Subject<any>();
    loadDataActivationEdit = this.dataActivationEdit.asObservable().delay(1000);

    // Social Link
    private dataSocialLink = new Subject<any>();
    loadDataSocialLink = this.dataSocialLink.asObservable();

    // Data Preview
    private dataPreview = new Subject<any>();
    loadDataPreview = this.dataPreview.asObservable().delay(100);


    // Location
    private dataLocationMap = new Subject<any>();
    loadDataLocationMap = this.dataLocationMap.asObservable();

    //Country code
    private dataCountryCode = new Subject<any>();
    loadDataCountryCode = this.dataCountryCode.asObservable();

    //Currency
    private dataExchange = new Subject<any>();
    loadDataExchange = this.dataExchange.asObservable();

    //Loading
    private dataLoading = new Subject<any>();
    loadDataLoading = this.dataLoading.asObservable();

    //Checkdata Open Search
    private dataOpenSearch = new Subject<any>();
    loadCheckOpenSearch = this.dataOpenSearch.asObservable();

    //Checkdata First Time
    private dataFirstTime = new Subject<any>();
    loadFirstTime = this.dataFirstTime.asObservable();

    private modalExpire = new Subject<any>();
    loadModalExpire = this.modalExpire.asObservable();

    setModalTokenExpire(val) {
        this.modalExpire = val;
    }

    setCheckOpenSearch(value: any) {
        this.dataOpenSearch.next(value);
    }

    setFirstTime(value: any) {
        this.dataFirstTime.next(value);
    }

    setLoading(value: any) {
        this.dataLoading.next(value);
    }

    setExchange(value: any) {
        this.dataExchange.next(value);
    }

    setFromDate(value: any) {
        this.dataFromDate.next(value);
    }

    setFromDateMap(value: any) {
        this.dataFromDateMap.next(value);
    }

    setLocationMap(value: any) {
        this.dataLocationMap.next(value);
    }

    setCountryCode(value: any) {
        this.dataCountryCode.next(value);
    }

    setToDate(value: any) {
        this.dataToDate.next(value);
    }

    setToDateMap(value: any) {
        this.dataToDateMap.next(value);
    }

    setSponDeadline(value: any) {
        this.dataSponDate.next(value);
    }

    setAge(value: any) {
        this.dataAge.next(value);
    }

    setDataAge(value: any, value1: any) {
        this.dataFromAge.next(value);
        this.dataToAge.next(value1);
    }

    setGender(value: any) {
        this.dataGender.next(value);
    }

    setCivil(value: any) {
        this.dataCivil.next(value);
    }

    setDataVenue(value: any) {
        this.dataVenue.next(value);
    }

    setActivities(value: any) {
        this.dataActivities.next(value);
    }

    setDataTag(value: any) {
        this.dataTag.next(value);
    }

    setDataTagSearch(value: any) {
        this.dataTagSearch.next(value);
    }

    setDataLocation(value: any) {
        this.dataLocation.next(value);
    }

    setDataEventory(val: any) {
        this.dataInventory.next(val);
    }

    setInventory(val: any) {
        this.dataEventInventory.next(val);
    }

    setInventTable(val) {
        this.inventTable = val;
    }

    setCareer(value: any) {
        this.dataCareer.next(value);
    }

    setCareerUpdate(value: any) {
        this.dataCareerUpdate.next(value);
    }

    setCareerInven(value: any, id) {
        this.dataCareerInvent.next(value);
        this.dataCareerIdInvent.next(id);
    }

    setHouseIncome(value: any) {
        this.dataHouseIncome.next(value);
    }

    setResidence(value: any) {
        this.dataResidence.next(value);
    }

    setSocialLink(value: any) {
        this.dataSocialLink.next(value);
    }

    setResidenceLocation(value) {
        this.dataResidenceLocation.next(value);
    }

    // loadDataAmenities(): Observable<any> {
    //     return Observable.of(this.dataAmenities);
    // }

    // setDataAmenities(value: any) {
    //     this.dataAmenities = value;
    // }
    setDataAmenities(value: any) {
        this.dataAmenities.next(value);
    }

    setDataAmenitiesEdit(value: any) {
        this.dataAmenitiesEdit.next(value);
    }

    // loadDataActivation(): Observable<any> {
    //     return Observable.of(this.dataActivation);
    // }

    setDataActivation(value: any) {
        this.dataActivation.next(value);
    }

    setDataActivationEdit(value: any) {
        this.dataActivationEdit.next(value);
    }

    setDataPreview(value: any) {
        this.dataPreview.next(value);
    }
    
    setIsActive(val: any) {
        this.isActive.next(val);
    }

    setMyGV(val: number) {
        this.myGlobalVar = val;
    }

    setMyInvent(val: any) {
        this.myInventory = val;
    }

    setInvent(val) {
        this.inventory = val;
    }

    setCover(val: any) {
        this.coverCompany = val;
    }

    setOpen(val){
        this.isOpen = val;
    }

    setTokenExpire(val) {
        this.tokenExpire = val;
    }

    getTokenExpire() {
        return this.tokenExpire;
    }

    getMyGV() {
        return this.myGlobalVar;
    }

    getMyInvent() {
        return this.myInventory;
    }

    getInventory() {
        return this.inventory;
    }

    getMyCover() {
        return this.coverCompany;
    }

    getOpen() {
        return this.isOpen;
    }

    getInventTable() {
        return this.inventTable;
    }
}
