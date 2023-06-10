import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Headers } from 'src/app/common/http-headers';
import { ProductAdCredit } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductAdCreditService {

  url = 'product-ad-credit';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<ProductAdCredit[]> {
    return this.http.get<ProductAdCredit[]>(environment.api + this.url + '/', Headers.HttpOptions());
  }

  findAllPostCredit(data: any): Observable<any> {
    return this.http.post<any>(environment.api + this.url + '/find-all-post-credit', data, Headers.HttpOptions());
  }

}
