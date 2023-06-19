import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentOrder } from '../interfaces/paymentOrder';
import { Headers } from 'src/app/common/http-headers';
import { ResponseApi } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderService {

  url = 'payment-order-onlypu';

  constructor(
    private http: HttpClient
  ) { }
 
  createCreditSale(data: any): Observable<PaymentOrder> {

    return this.http.post<PaymentOrder>(environment.api + this.url + '/create-credit-sale', data,  Headers.HttpOptions());
  }

  createCreditSaleAmount(data: any): Observable<PaymentOrder> {

    return this.http.post<PaymentOrder>(environment.api + this.url + '/create-credit-sale-amount', data,  Headers.HttpOptions());
  }

  createTip(data: any): Observable<PaymentOrder> {

    return this.http.post<PaymentOrder>(environment.api + this.url + '/create-tip', data,  Headers.HttpOptions());
  }
  
  createMembership(data: any): Observable<PaymentOrder> {

    return this.http.post<PaymentOrder>(environment.api + this.url + '/create-membership', data,  Headers.HttpOptions());
  }

  createAdSale(data: any): Observable<ResponseApi> {

    return this.http.post<ResponseApi>(environment.api + this.url + '/create-ad-sale', data,  Headers.HttpOptions());
  }
  
  findOne(id: string): Observable<ResponseApi> {

    return this.http.get<ResponseApi>(environment.api + this.url + '/' + id,);
  }

  findAllPaidUser(): Observable<PaymentOrder[]> {

    return this.http.post<PaymentOrder[]>(environment.api + this.url + '/find-all-paid-user', null , Headers.HttpOptions());
  }

  findAllPaymentsUser(): Observable<PaymentOrder[]> {

    return this.http.post<PaymentOrder[]>(environment.api + this.url + '/find-all-payments-user', null , Headers.HttpOptions());
  }
}
