import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Events, Event } from '../model/events.model';
import { ApiClient } from './api-client.service';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { tap, map, last, catchError } from 'rxjs/operators';
import { StepService } from './step.service';

@Injectable()
export class EventsService {
    token: any;
    httpOptions: any;
    httpUrl: any;

    constructor(private _http: HttpClient, private apiClient: ApiClient, private authToken: AuthenticationService,
        private step: StepService) {
    }

    private dataAll = new Subject<Event>();
    loadDataAll = this.dataAll.asObservable();

    private dataWishlist = new Subject<Event>();
    loadDataWishlist = this.dataWishlist.asObservable();

    private dataReserved = new Subject<Event>();
    loadDataReserved = this.dataReserved.asObservable();

    private dataSold = new Subject<Event>();
    loadDataSold = this.dataSold.asObservable();

    private dataOngoing = new Subject<Event>();
    loadDataOngoing = this.dataOngoing.asObservable();

    private dataDetail = new Subject<any>();
    loadDataDetail = this.dataDetail.asObservable();

    private dataDetailEdit = new Subject<any>();
    loadDataDetailEdit = this.dataDetailEdit.asObservable();

    private dataUpdate = new Subject<any>();
    loadDataUpdate = this.dataUpdate.asObservable();

    private dataUpdateDetail = new Subject<any>();
    loadDataUpdateDetail = this.dataUpdateDetail.asObservable();

    private dataIncome = new Subject<any>();
    loadDataIncome = this.dataIncome.asObservable();

    private dataSearch = new Subject<any>();
    loadDataSearch = this.dataSearch.asObservable();

    private dataId = new Subject<any>();
    loadDataId = this.dataId.asObservable();

    private dataEdition = new Subject<any>();
    loadDataEdition = this.dataEdition.asObservable();

    private dataDateRange = new Subject<any>();
    loadDataDateRange = this.dataDateRange.asObservable();

    private dataImg = new Subject<any>();
    loadDataImg = this.dataImg.asObservable();

    private dataPast = new Subject<any>();
    loadDataPast = this.dataPast.asObservable();

    private dataAllInventory = new Subject<any>();
    loadDataAllInven = this.dataAllInventory.asObservable();

    private dataIdInven = new Subject<any>();
    loadDataIdInven = this.dataIdInven.asObservable();

    private dataItemInven = new Subject<any>();
    loadDataItemInven = this.dataItemInven.asObservable();

    private dataInventEvent = new Subject<any>();
    loadDataInventEvent = this.dataInventEvent.asObservable();

    private dataDomInvent = new Subject<any>();
    loadDataDomInvent = this.dataDomInvent.asObservable();

    private dataLikeEvent = new Subject<any>();
    loadLikeEvent = this.dataLikeEvent.asObservable();

    private dataReloadAvatar = new Subject<any>();
    loadDataReloadAvatar = this.dataReloadAvatar.asObservable();

    private getHeader() {
        this.token = JSON.parse(localStorage.getItem('user')).token;
        this.httpOptions = {
            'token': `${this.token}`
        };
        return this.httpOptions;
    }

    private getHeaderUpload() {
        this.token = JSON.parse(localStorage.getItem('user')).token;
        let headers = new HttpHeaders();
        headers = headers.set('token', `${this.token}`);
        return headers;
    }

    getAllEventSeller(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/event/all/seller`, undefined, this.getHeader());
    }

    getAllEventBuyer(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/event/all/buyer`, undefined, this.getHeader());
    }

    getWishlistEvent(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/wishlist/event`, undefined, this.getHeader());
    }

    getReservedEvent(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/reserved/event`, undefined, this.getHeader());
    }

    getAllInventorySeller(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/all/inventory/seller`, undefined, this.getHeader());
    }

    getAllInventoryBuyer(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/inventory/all/buyer`, undefined, this.getHeader());
    }

    getReservedInvent(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/reserved/inventory`, undefined, this.getHeader());
    }

    getWishlistInvent(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/wishlist/inventory`, undefined, this.getHeader());
    }

    happenningAll(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/happening/event/all`, undefined, this.getHeader());
    }

    happenningReserved(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/happening/event/reserved`, undefined, this.getHeader());
    }

    happenningWishlist(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/happening/event/wishlist`, undefined, this.getHeader());
    }

    happenningSold(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/happening/event/wishlist`, undefined, this.getHeader());
    }

    getSoldEvent(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/sold/event`, undefined, this.getHeader());
    }

    getOngoingEvent(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/ongogin/event`, undefined, this.getHeader());
    }

    getTopOngoing(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/topongoing/event`, undefined, this.getHeader());
    }

    getRecentlySold(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/recentsold/event`, undefined, this.getHeader());
    }

    getNotPublishedEvent(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/notpublish/event`, undefined, this.getHeader());
    }

    getPastEvent(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/past/event`, undefined, this.getHeader());
    }

    getSearchEvent(item: any): Observable<Events> {
        return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/search/event`, item, undefined, this.getHeader());
    }

    submitStatusEvent(id: any, statusEvent: any): Observable<any> {
        return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/userinventory/${id}`,
            statusEvent, undefined, this.getHeader());
    }

    removeStatusInvent(id: any): Observable<any> {
        return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/userinventory/${id}`, null, undefined, this.getHeader());
    }

    getEventId(id: any): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/event/detail/${id}`, undefined, this.getHeader());
    }

    getActivation(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/activations`, undefined, this.getHeader());
    }

    getAmenities(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/amenities`, undefined, this.getHeader());
    }

    getCarrer(): Observable<Events> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/carrer`, undefined, this.getHeader());
    }

    getSummary(): Observable<any> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/eventsummary/buyer`, undefined, this.getHeader());
    }

    getChart(): Observable<any> {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/chart/buyer`, undefined, this.getHeader());
    }

    getInventoryDetail(id: any) {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/inventory/${id}`, undefined, this.getHeader());
    }

    getNotification() {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/notification/get`, undefined, this.getHeader());
    }

    getEventMap(body) {
        return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/inventorys/chart`, body, undefined, this.getHeader());
    }

    getExchangeRate() {
        return this._http.get(environment.EXCHANGE_RATE_API);
    }

    delEventId(id: any): Observable<any> {
        return this.apiClient.delete(`${environment.AUTH_SERVICE_ENDPOINT}/event/${id}`, undefined, this.getHeader());
    }

    delInventId(id: any): Observable<any> {
        return this.apiClient.delete(`${environment.AUTH_SERVICE_ENDPOINT}/inventory/${id}`, undefined, this.getHeader());
    }

    submitCreateEvent(newEvent: any): Observable<any> {
        return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/event`, newEvent, undefined, this.getHeader());
    }

    // submitCreateEvent(newEvent: any): Observable<any> {
    //     return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/event/create`, newEvent, undefined, this.getHeader());
    // }

    submitSeenNotification(id: any): Observable<any> {
        return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/notification/post/${id}`, undefined, undefined, this.getHeader());
    }

    submitLikeEvent(id: any): Observable<any> {
        return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/event/like/${id}`, null, undefined, this.getHeader());
    }

    submitCreateInventory(newInventory: any): Observable<any> {
        return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/inventorys`, newInventory, undefined, this.getHeader());
    }

    submitEditInventory(id: any, newInventory: any): Observable<any> {
        return this.apiClient.put(`${environment.AUTH_SERVICE_ENDPOINT}/inventory/${id}`, newInventory, undefined, this.getHeader());
    }

    submitPublishEvent(id: any, body): Observable<any> {
        return this.apiClient.put(`${environment.AUTH_SERVICE_ENDPOINT}/changestatusevent/${id}`, body, undefined, this.getHeader());
    }

    submitEditEvent(id: any, newEvent: any): Observable<any> {
        return this.apiClient.put(`${environment.AUTH_SERVICE_ENDPOINT}/event/${id}`, newEvent, undefined, this.getHeader());
    }

    submitImageEvent(img: any): Observable<any> {
        const req = new HttpRequest('POST', `${environment.AUTH_SERVICE_ENDPOINT}/event/image`, img, {
            reportProgress: true,
            headers: new HttpHeaders({ 'token': JSON.parse(localStorage.getItem('user')).token })

        });

        return this._http.request(req).pipe(
            map(event => this.getEventMessage(event, img))
        );
    }

    submitAvatar(img: any): Observable<any> {
        return this._http.post(`${environment.AUTH_SERVICE_ENDPOINT}/avatar/upload`, img);
    }

    private getEventMessage(event: HttpEvent<any>, file: File) {
        switch (event.type) {
            case HttpEventType.Sent:
                return 0;

            case HttpEventType.UploadProgress:
                // Compute and show the % done:
                const percentDone = Math.round(100 * event.loaded / event.total);
                return percentDone;

            case HttpEventType.Response:
                return event;

            default:
                return 200;
        }
    }

    submitImageInvent(img: any): Observable<any> {
        return this._http.post(`${environment.AUTH_SERVICE_ENDPOINT}/inventory/image`, img, { headers: new HttpHeaders({ 'token': JSON.parse(localStorage.getItem('user')).token }) });
    }

    getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        const data: any = [{
            title: 'All Day Event',
            start: yearMonth + '-01',
            className: 'bg-purple',
        },
        {
            title: 'Long Event',
            start: yearMonth + '-07',
            end: yearMonth + '-10',
            className: 'bg-warning',
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-09T16:00:00',
            className: 'bg-info',
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-16T16:00:00',
            className: 'bg-warning',
        },
        {
            title: 'Conference',
            start: yearMonth + '-11',
            end: yearMonth + '-13',
            className: 'bg-purple',
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T10:30:00',
            end: yearMonth + '-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: yearMonth + '-12T12:00:00',
            className: 'bg-purple',
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T14:30:00',
            className: 'bg-danger',
        },
        {
            title: 'Happy Hour',
            start: yearMonth + '-12T17:30:00',
            className: 'bg-purple',
        },
        {
            title: 'Dinner',
            start: yearMonth + '-12T20:00:00',
            className: 'bg-danger',
        },
        {
            title: 'Birthday Party',
            start: yearMonth + '-13T07:00:00',
            className: 'bg-danger',
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: yearMonth + '-28'
        }];
        return Observable.of(data);
    }

    setDataAll(value: any) {
        this.dataAll.next(value);
    }

    setDataPast(value: any) {
        this.dataPast.next(value);
    }

    setDataWishlist(value: any) {
        this.dataWishlist.next(value);
    }

    setDataReserved(value: any) {
        this.dataReserved.next(value);
    }

    setDataSold(value: any) {
        this.dataSold.next(value);
    }

    setDataOngoing(value: any) {
        this.dataOngoing.next(value);
    }

    setDataUpdate(value: any) {
        this.dataUpdate.next(value);
    }

    setDataUpdateDetail(value: any) {
        this.dataUpdateDetail.next(value);
    }

    setEventDetail(value: any) {
        this.dataDetail.next(value);
    }

    setEventDetailEdit(value: any) {
        this.dataDetailEdit.next(value);
    }

    setDataSearch(value: any) {
        this.dataSearch.next(value);
    }

    setDataId(value: any) {
        this.dataId.next(value);
    }

    setEdition(value: any) {
        this.dataEdition.next(value);
    }

    setDataDateRange(value: any) {
        this.dataDateRange.next(value);
    }

    setDataIncome(value: any) {
        this.dataIncome.next(value);
    }

    setDataImg(value: any) {
        this.dataImg.next(value);
    }

    setDataInventory(value: any) {
        this.dataAllInventory.next(value);
    }

    setDataEditInven(id: number, value: any) {
        this.dataIdInven.next(id);
        this.dataItemInven.next(value);
    }

    setInventSameEvent(value) {
        this.dataInventEvent.next(value);
    }

    setDomInvent(val: any) {
        this.dataDomInvent.next(val);
    }

    setDataLikeEvent(val: any) {
        this.dataLikeEvent.next(val);
    }

    setReloadAvatar(val: any) {
        this.dataReloadAvatar.next(val);
    }
}
