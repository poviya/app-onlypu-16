import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToolsService } from './tools.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { TransactionCredit } from '../interfaces';
import { Headers } from 'src/app/common/http-headers';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionCreditService {

  url = 'transaction-credit';
  
  constructor(
    private http: HttpClient,
    private toolsService: ToolsService
  ) 
  { 
    
  }

  createAdBuy(dataQuery: any): Observable<any> {

    return this.http.post<TransactionCredit>(environment.api + this.url + '/create-ad-buy', dataQuery, Headers.HttpOptions());
  }

  createTransferTipAccount(dataQuery: any): Observable<any> {

    return this.http.post<TransactionCredit>(environment.api + this.url + '/create-transfer-tip-account', dataQuery, Headers.HttpOptions());
  }

  createTransferTipPost(dataQuery: any): Observable<any> {

    return this.http.post<TransactionCredit>(environment.api + this.url + '/create-transfer-tip-post', dataQuery, Headers.HttpOptions());
  }

  createTransferTipCam(dataQuery: any): Observable<any> {

    return this.http.post<TransactionCredit>(environment.api + this.url + '/create-transfer-tip-cam', dataQuery, Headers.HttpOptions());
  }

  createTransferMembership(dataQuery: any): Observable<any> {

    return this.http.post<TransactionCredit>(environment.api + this.url + '/create-transfer-membership', dataQuery, Headers.HttpOptions());
  }

  //-----------------------PAYMENTS
  paymentsTransaction(data: any, limit: number, offset: number): Observable<any> {
    
    return this.http.post<any>(environment.api + this.url + `/payments-transaction-user?limit=${limit}&offset=${offset}`, data, Headers.HttpOptions())
      .pipe(delay(200));
  }

  paymentsTransactionInfinite(data: any, limit: number, offset: number): Observable<any> {
    
    return this.http.post<any>(environment.api + this.url + `/payments-transaction-user-infinite?limit=${limit}&offset=${offset}`, data, Headers.HttpOptions())
      .pipe(delay(200));
  }
  

  paymentsTransactionCounter(data: any): Observable<any> {

    return this.http.post<any>(environment.api + this.url + `/payments-transaction-user-counter`, data, Headers.HttpOptions())
      .pipe(delay(200));
  }
  
  //--------------------------INCOMES---------------------------
  incomeTransaction(data: any, limit: number, offset: number): Observable<any> {
    
    return this.http.post<any>(environment.api + this.url + `/income-transaction-user?limit=${limit}&offset=${offset}`, data, Headers.HttpOptions())
      .pipe(delay(200));
  }

  incomeTransactionInfinite(data: any, limit: number, offset: number): Observable<any> {
    
    return this.http.post<any>(environment.api + this.url + `/income-transaction-user-infinite?limit=${limit}&offset=${offset}`, data, Headers.HttpOptions())
      .pipe(delay(200));
  }

  incomeTransactionCounter(data: any): Observable<any> {

    return this.http.post<any>(environment.api + this.url + `/income-transaction-user-counter`, data, Headers.HttpOptions())
      .pipe(delay(200));
  }
  //------------------------- END INCOMES------------------------

  //------------------------- INCOMES CAM -----------------------
  incomeTransactionCam(data: any, limit: number, offset: number): Observable<any> {
    
    return this.http.post<any>(environment.api + this.url + `/income-transaction-user-cam?limit=${limit}&offset=${offset}`, data, Headers.HttpOptions())
      .pipe(delay(200));
  }

}