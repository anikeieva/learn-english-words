import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  serverBaseUrl = 'http://192.168.88.109:3000/';
  clientBaseUrl = 'http://192.168.88.109:4200/';

  constructor(public http: HttpClient) { }

  get(url: string = '', params: any = {}): Observable<any> {
    return this.http.get(this.getFullUrl(url), params);
  }

  getClient(url: string = '', params: any = {}): Observable<any> {
    return this.http.get(this.getFullUrl(url, false), params);
  }

  post(url: string = '', params: any = {}): Observable<any> {
    return this.http.post(this.getFullUrl(url), params);
  }

  private getFullUrl(url: string = '', serverRequest: boolean = true): string {
    const baseUrl = serverRequest ? this.serverBaseUrl : this.clientBaseUrl;

    return baseUrl + url;
  }
}
