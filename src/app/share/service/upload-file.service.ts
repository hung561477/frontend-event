import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiClient } from './api-client.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class UploadFileService {
    token: any;
    httpOptions: any;

    constructor(private apiClient: ApiClient) {
    }

    // dataImg;


    // loadDataImg(): Observable<any> {
    //     return Observable.of(this.dataImg);
    // }

    private dataImg = new Subject<any>();
    loadDataImg = this.dataImg.asObservable();

    private dataImgInventory = new Subject<any>();
    loadDataImgInventory = this.dataImgInventory.asObservable();

    submitImage(img: any): Observable<any> {
        return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/upload`, img, undefined);
    }

    setDataImg(value: any) {
        this.dataImg.next(value);
    }

    setDataImgInventory(value: any) {
        this.dataImgInventory.next(value);
    }

}
