/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••               IMPORTS                 •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */

// Platform Imports.
import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  ResponseOptions,
  ResponseContentType,
  Headers,
  RequestOptions,
  URLSearchParams
} from '@angular/http';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Environment Imports
import { environment } from '../../../../environments/environment';

// App Imports
import { APIRequestOptions } from './api-request-options.interface';

/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••           SERVICE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
@Injectable()
export class SACAPIService {
  /** –––
   *  –– Constructor
   */
  constructor(private http: Http) {}

  /** –––
   *  –– Helper Methods
   */
  private parseErrorHandler(error) {
    const errorObject = error.status
      ? { code: error.status, data: error.json() }
      : {
          code: 500,
          data: { message: 'Unexpected local error', error: error }
        };

    return Observable.throw(errorObject);
  }

  private defineRequestHeaders(options: APIRequestOptions) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    if (options) {
      if (options.customHeaders && typeof options.customHeaders === 'object') {
        Object.assign(headers, options.customHeaders);
      }
      if (options.formData) {
        headers['Accept'] = '*/*';
        delete headers['Content-Type'];
      }
    }

    return new Headers(headers);
  }

  private createQueryString(paramsObject) {
    const queryString = new URLSearchParams();

    // Iterates over paramsOject properties.
    Object.keys(paramsObject).forEach((paramKey: string) =>
      queryString.append(paramKey, paramsObject[paramKey])
    );

    return queryString;
  }

  private makeRootRequest(
    path: string,
    method: string,
    data: any,
    options: APIRequestOptions
  ) {
    return Observable.create(observer => {
      const xhr: XMLHttpRequest = new XMLHttpRequest(),
        headers = this.defineRequestHeaders(options);

      // Set event handlers.
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const responseOptions = new ResponseOptions({
            body: xhr.response,
            status: xhr.status
          });

          if (xhr.status >= 200 && xhr.status < 300) {
            observer.next(new Response(responseOptions));
            observer.complete();
          } else {
            observer.error(new Response(responseOptions));
          }
        }
      };

      // Make request.
      xhr.open(method, `${environment.API_URL}${path}`, true);

      // Set headers.
      headers.forEach(
        (values, key) =>
          values.length > 1
            ? xhr.setRequestHeader(key, values.join(';'))
            : xhr.setRequestHeader(key, values[0])
      );

      // Send request.
      xhr.send(data);
    });
  }

  /** –––
   *  –– Public Methods
   */

  get(path: string, options?: APIRequestOptions) {
    const headers = this.defineRequestHeaders(options),
      requestOptions = new RequestOptions({ headers });

    if (options && options.blobResponse) {
      requestOptions.responseType = ResponseContentType.Blob;
    }

    if (options && options.params && Object.keys(options.params).length) {
      const queryString = this.createQueryString(options.params);
      requestOptions.search = queryString;
    }

    return this.http
      .get(`${environment.API_URL}${path}`, requestOptions)
      .map(response => {
        switch (response.headers.get('Content-Type')) {
          case 'application/octet-stream':
          case 'application/zip':
            return response.blob();
          default:
            return response.json();
        }
      })
      .catch(this.parseErrorHandler);
  }

  post(path: string, data: any, options?: APIRequestOptions) {
    // Parse request body data
    const requestBody = JSON.stringify(data),
      headers = this.defineRequestHeaders(options),
      requestOptions = new RequestOptions({ headers });

    return this.http
      .post(`${environment.API_URL}${path}`, requestBody, requestOptions)
      .map(response => response.json())
      .catch(this.parseErrorHandler);
  }

  patch(path: string, data: any, options?: APIRequestOptions) {
    // Parse request body data
    const requestBody = JSON.stringify(data),
      headers = this.defineRequestHeaders(options),
      requestOptions = new RequestOptions({ headers });

    return this.http
      .patch(`${environment.API_URL}${path}`, requestBody, requestOptions)
      .map(response => response.json())
      .catch(this.parseErrorHandler);
  }

  put(path: string, data: any, options?: APIRequestOptions) {
    // Parse request body data
    let httpObservable: Observable<Response>;

    if (data instanceof FormData) {
      httpObservable = this.makeRootRequest(path, 'PUT', data, options);
    } else {
      const requestBody = JSON.stringify(data),
        headers = this.defineRequestHeaders(options),
        requestOptions = new RequestOptions({ headers });

      httpObservable = this.http.put(
        `${environment.API_URL}${path}`,
        requestBody,
        requestOptions
      );
    }

    return httpObservable
      .map(response => response.json())
      .catch(this.parseErrorHandler);
  }

  delete(path: string, data: any, options?: APIRequestOptions) {
    // Parse request body data
    const requestBody = JSON.stringify(data),
      headers = this.defineRequestHeaders(options),
      requestOptions = new RequestOptions({ headers, body: requestBody });

    return this.http
      .delete(`${environment.API_URL}${path}`, requestOptions)
      .map(response => response.json())
      .catch(this.parseErrorHandler);
  }
}
