import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Suscription } from '../interfaces';
import { Headers } from 'src/app/common/http-headers';

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {

  url = 'suscription-onlypu';
  
  constructor(
    private http: HttpClient
  ) 
  {}

  findAllUser(data: any): Observable<Suscription[]> {
    data.Site = environment.site;

    return this.http.post<Suscription[]>(environment.api + this.url + '/find-all-user', data);
  }

  createSubscribers(data: any): Observable<Suscription> {
    //data.Site = environment.site;

    return this.http.post<Suscription>(environment.api + this.url + '/create', data, Headers.HttpOptions());
  }

  findAllSubscribersJoin(data: any): Observable<Suscription[]> {
    //data.Site = environment.site;

    return this.http.post<Suscription[]>(environment.api + this.url + '/find-all-subscribers-join', data, Headers.HttpOptions());
  }

  findAllSubscribersJoinCount(data: any): Observable<any> {
    //data.Site = environment.site;

    return this.http.post<any>(environment.api + this.url + '/find-all-subscribers-join-count', data, Headers.HttpOptions());
  }

  suscriptionJoin(data: any): Observable<any> {

    return this.http.post<any>(environment.api + this.url + '/suscription-join', data, Headers.HttpOptions());
  }
}
