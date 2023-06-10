import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers } from 'src/app/common/http-headers';
import { environment } from 'src/environments/environment';
import { UserTransfer, ResponseApi } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserTransferService {

  daymentMethod: UserTransfer[] = [];
  url = 'user-transfer';
  
  constructor(
    private http: HttpClient
  ) 
  { 
    
  }

  createPaypal(data: any): Observable<UserTransfer> {
    return this.http.post<UserTransfer>(environment.api + this.url + '/create-paypal', data, Headers.HttpOptions());
  }

  updatePaypal(id:string, data: any): Observable<UserTransfer> {
    return this.http.patch<UserTransfer>(environment.api + this.url + '/update-paypal/' + id, data, Headers.HttpOptions());
  }

  createLinkPay(data: any): Observable<UserTransfer> {
    return this.http.post<UserTransfer>(environment.api + this.url + '/create-link', data, Headers.HttpOptions());
  }

  updateLinkPay(id:string, data: any): Observable<UserTransfer> {
    return this.http.patch<UserTransfer>(environment.api + this.url + '/update-link/' + id, data, Headers.HttpOptions());
  }

  findAllUser(data: any): Observable<UserTransfer[]> {
    return this.http.get<UserTransfer[]>(environment.api + this.url + '/user', Headers.HttpOptions());
  }
  

  get findData() {
    return this.daymentMethod;
  }

  uploadData(data: UserTransfer[]) {
    this.daymentMethod = data;
  }
}
