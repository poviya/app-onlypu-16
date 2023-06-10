import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membership, ResponseApi } from '../interfaces';
import { Headers } from 'src/app/common/http-headers';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  url = 'membership-onlypu';
  
  constructor(
    private http: HttpClient
  ) 
  { 
    
  }

  create(data: any): Observable<Membership> {
    return this.http.post<Membership>(environment.api + this.url + '/', data, Headers.HttpOptions());
  }

  updateMembership(data: any): Observable<Membership> {
    return this.http.post<Membership>(environment.api + this.url + '/updateMembership', data, Headers.HttpOptions());
  }

  findAllUser(data: any): Observable<object[]> {
    return this.http.post<Membership[]>(environment.api + this.url + '/find-all-user', data, Headers.HttpOptions());
  }

  findAllUserJoin(data: any): Observable<any> {
    return this.http.post<any>(environment.api + this.url + '/find-all-user-join', data, Headers.HttpOptions());
  }

  updateDiscount(data: any): Observable<Membership> {
    return this.http.post<Membership>(environment.api + this.url + '/updateDiscount', data, Headers.HttpOptions());
  }

  findAll(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(environment.api + this.url);
  }

  findAllCities(): Observable<any> {
    return this.http.get<any>(environment.api + this.url + '/country-cities');
  }


}
