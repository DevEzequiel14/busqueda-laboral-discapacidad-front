import { HttpHeaders, HttpParams } from '@angular/common/http';
export declare type HttpObserve = 'body' | 'events' | 'response';
export declare type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export class GenericOptions {
  body?: any;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  observe?: HttpObserve;
  reportProgress?: boolean;
  responseType?: ResponseType;
  withCredentials?: boolean;
}
