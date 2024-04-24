import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseType } from '../model/options.model';
import { GenericRequest } from '../model/request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders, responseType?: ResponseType): Observable<T> {
    const options: GenericRequest = { method: 'GET', url, options: { params, headers, responseType } };
    return this.requestAll<T>(options);
  }

  post<T>(url: string, body?: T, params?: HttpParams, headers?: HttpHeaders, responseType?: ResponseType): Observable<T> {
    const options: GenericRequest = { method: 'POST', url, options: { params, headers, body, responseType } };
    return this.requestAll<T>(options);
  }

  private requestAll<T>(requestOptions: GenericRequest): Observable<T> {
    const { method, url, options } = requestOptions;
    return this.http.request(method, url, options);
  }
}
