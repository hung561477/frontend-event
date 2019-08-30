import {
    HttpClient,
    HttpErrorResponse,
    HttpHandler,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiClient extends HttpClient {

    constructor(protected httpHandler: HttpHandler) {
        super(httpHandler);

        this.beforeRequest = this.beforeRequest.bind(this);
        this.afterRequest = this.afterRequest.bind(this);
    }

    /**
     * Before request hook
     *
     */
    beforeRequest() {
        //
    }

    /**
     * After request hook
     *
     */
    afterRequest() {
        //
    }

    /**
     * Performs http `get` request method
     *
     * @param {*} requestUrl
     * @param {RequestOptionsArgs} [optionsArgs]
     * @param {*} [customHeaders]
     * @param otherOptions
     * @returns {Observable<any>}
     */
    get<T>(requestUrl: any, optionsArgs?: any, customHeaders?: any, otherOptions?: any): Observable<T> {
        const options = this.getRequestOptions(customHeaders, optionsArgs, otherOptions);
        this.beforeRequest();
        return super.get(requestUrl, options)
            .pipe(
                catchError(this.handleHttpError),
                finalize(this.afterRequest)
            );
    }

    /**
     * Performs http `post` request method
     *
     * @param requestUrl
     * @param body
     * @param optionsArgs
     * @param customHeaders
     * @param otherOptions
     */
    post(requestUrl: any, body?: any, optionsArgs?: any, customHeaders?: any, otherOptions?: any): Observable<any> {
        const options = this.getRequestOptions(customHeaders, optionsArgs, otherOptions);
        this.beforeRequest();
        return super.post(requestUrl, body, options)
            .pipe(
                catchError(this.handleHttpError),
                finalize(this.afterRequest)
            );
    }

    /**
     * Performs http `put` request method
     *
     * @param requestUrl
     * @param body
     * @param optionsArgs
     * @param customHeaders
     * @param otherOptions
     */
    put(requestUrl: any, body: any, optionsArgs?: any, customHeaders?: any, otherOptions?: any): Observable<any> {
        const options = this.getRequestOptions(customHeaders, optionsArgs, otherOptions);

        this.beforeRequest();
        return super.put(requestUrl, body, options)
            .pipe(
                catchError(this.handleHttpError),
                finalize(this.afterRequest)
            );
    }

    /**
     * Performs http `delete` request method with body as a option
     *
     * @param requestUrl
     * @param bodyOption
     * @returns {Observable<any>}
     */
    deleteWithBody(requestUrl: any, bodyOptions: any): Observable<any> {
        const options = this.getRequestOptions(undefined, undefined, bodyOptions);

        this.beforeRequest();
        return super.delete(requestUrl, options)
            .pipe(
                catchError(this.handleHttpError),
                finalize(this.afterRequest)
            );
    }

    /**
     * Performs http `delete` request method
     *
     * @param {*} requestUrl
     * @param {RequestOptionsArgs} [optionsArgs]
     * @param {*} [customHeaders]
     * @param otherOptions
     * @returns {Observable<any>}
     */
    delete(requestUrl: any, optionsArgs?: any, customHeaders?: any, otherOptions?: any): Observable<any> {
        const options = this.getRequestOptions(customHeaders, optionsArgs, otherOptions);

        this.beforeRequest();
        return super.delete(requestUrl, options)
            .pipe(
                catchError(this.handleHttpError),
                finalize(this.afterRequest)
            );
    }

    /**
     * Performs upload data from formData use post method
     *
     * @param {*} requestUrl
     * @param {*} formData
     * @param {RequestOptionsArgs} [optionsArgs]
     * @param {*} [customHeaders]
     * @param otherOptions
     * @returns {Observable<any>}
     */
    uploadFormData(requestUrl: any, formData: any, optionsArgs?: any, customHeaders?: any, otherOptions?: any): Observable<any> {
        const options = this.getRequestOptions(customHeaders, optionsArgs, otherOptions, true);
        this.beforeRequest();
        return super.post(requestUrl, formData, options)
            .pipe(
                catchError(this.handleHttpError),
                finalize(this.afterRequest)
            );
    }

    /**
     * Compile request options
     *
     * @param {*} [customHeaders]
     * @param {*} [optionsArgs={}]
     * @param {*} [otherOptions={}]
     * @returns {RequestOptions}
     */
    getRequestOptions(
        customHeaders?: any,
        optionsArgs: { [key: string]: any } = {},
        otherOptions: any = {},
        isUploadMethod: boolean = false
    ): {
            headers: HttpHeaders;
            params: HttpParams;
            observe?: 'body';
            reportProgress?: boolean;
            responseType?: 'json';
            withCredentials?: boolean;
        } {
        return {
            headers: this.createHeaders(customHeaders, isUploadMethod),
            params: this.createHttpParams(optionsArgs),
            ...otherOptions
        };
    }

    /**
     * HttpHeaders is immutable - all mutation operations return a new instance.
     * Be careful to refactor
     *
     * @param {*} [customHeaders]
     * @returns {Headers}
     */
    public createHeaders(customHeaders?: any, isUploadMethod?: boolean): HttpHeaders {
        const headers = isUploadMethod ? {} : { 'Content-Type': environment.CONTENT_TYPE };

        if (customHeaders) {
            Object.keys(customHeaders).forEach(key => {
                if (headers.hasOwnProperty(key)) {
                    delete headers[key];
                }
                headers[key] = customHeaders[key];
            });
        }

        return new HttpHeaders(headers);
    }

    /**
     * HttpParams is immutable - all mutation operations return a new instance.
     * Be careful to refactor
     *
     * @private
     * @param params
     * @param {string} [defKey='search']
     * @returns {HttpParams}
     */
    private createHttpParams(params: { [key: string]: any }, defKey: string = 'search'): HttpParams {
        let fromString: string = this.toQueryString(params);

        if (params.hasOwnProperty(defKey)) {
            fromString = this.toQueryString(params[defKey]);
        }

        return new HttpParams({ fromString });
    }

    /**
     * Parse params to query string
     *
     * @private
     * @param {any} params
     * @returns {string}
     */
    private toQueryString(params): string {
        const parts = [];
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
            }
        }
        return parts.join('&');
    }

    /**
     * Handle http errors
     * `caught`, which is the source observable, in case you'd like to "retry" that observable by returning it again.
     * Whatever observable
     *  is returned by the `selector` will be used to continue the observable chain.
     *
     * @private
     * @param {(Response | any)} error
     * @param {Observable} caught
     * @returns {Observable<any>}
     */
    private handleHttpError(error: HttpErrorResponse | any, caught?: Observable<any>): Observable<any> {
        let message: string;
        if (error instanceof HttpErrorResponse) {
            message = error.message;
        } else {
            message = error.message ? error.message : error.toString();
        }
        return Observable.throw(message);
    }
}
