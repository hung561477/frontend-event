import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyModel } from '../model/user-login.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ApiClient } from './api-client.service';
import { ResponseObject } from '../model/response.model';
import { StepService } from './step.service';

@Injectable()
export class AuthenticationService {
    isRemember;
    httpOptions: any;

    constructor(private _http: HttpClient, private router: Router, private apiClient: ApiClient,
        private step: StepService) {
            this.isRemember = false;
    }

    setOptions() {
        const options = {
            headers: new HttpHeaders({
                token: `${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type': 'application/json'
            })
        };
        return options;
    }

    tokenExpire() {
        this.step.setTokenExpire(true);
        this.router.navigate(['/']);
        localStorage.removeItem('user');
    }

    login(newUser: any): Observable<ResponseObject> {
        return this._http.post(`${environment.AUTH_SERVICE_ENDPOINT}/login`, newUser)
            .pipe(
                catchError(err => of(err))
            );
    }

    submitRegister(body: any): Observable<ResponseObject> {
        return this._http.post(`${environment.AUTH_SERVICE_ENDPOINT}/buyer/signup`, body)
            .pipe(
                catchError(err => of(err))
            );
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getUserInfo(): Observable<any> {
        return this._http.get(`${environment.AUTH_SERVICE_ENDPOINT}/user`, this.setOptions());
    }

    getListUser(): Observable<any> {
        return this._http.get(`${environment.AUTH_SERVICE_ENDPOINT}/user/company`, this.setOptions());
    }

    submitContact(body: any): Observable<any> {
        return this._http.post(`${environment.AUTH_SERVICE_ENDPOINT}/contact`, body)
            .pipe(
                catchError(err => of(err))
            );
    }

    forgotPassword(email: any) {
        return this.apiClient.get(`${environment.AUTH_SERVICE_ENDPOINT}/user/forgot_password/${email}`, undefined);
    }

    submitPassword(code: any, body: any) {

        this.httpOptions = {
            'token': `${code}`
        };
        return this.apiClient.post(`${environment.AUTH_SERVICE_ENDPOINT}/user/change_password_forgot`, body, undefined, this.httpOptions);
    }

    addUser(body: any): Observable<ResponseObject> {
        return this._http.post(`${environment.AUTH_SERVICE_ENDPOINT}/seller/signup`, body)
            .pipe(
                catchError(err => of(err))
            );
    }

    editUser(body: any): Observable<any> {
        return this._http.put(`${environment.AUTH_SERVICE_ENDPOINT}/user/${body.id}`, body, this.setOptions())
            .pipe(
                catchError(err => of(err))
            );
    }

    verifyEmail(body: any): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                verify: `${body}`
            })
        };
        return this._http.get(`${environment.AUTH_SERVICE_ENDPOINT}/verify`, options)
            .pipe(
                catchError(err => of(err))
            );
    }


    createCompany(body: any): Observable<ResponseObject> {
        return this._http.post<CompanyModel>(`${environment.AUTH_SERVICE_ENDPOINT}/company`, body)
            .pipe(
                catchError(err => of(err))
            );
    }

    editCompany(body: CompanyModel): Observable<ResponseObject> {
        return this._http.put<CompanyModel>(`${environment.AUTH_SERVICE_ENDPOINT}/company/${body.id}`, body, this.setOptions())
            .pipe(
                catchError(err => of(err))
            );
    }

    setRemember(val) {
        this.isRemember = val;
    }

    getRememberMe() {
        return this.isRemember;
    }
}
