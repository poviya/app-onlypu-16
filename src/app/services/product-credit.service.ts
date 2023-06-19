import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Headers } from 'src/app/common/http-headers';
import { Cam, ProductCredit } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductCreditService {

  url = 'product-credit';
  private sharedData: any;

  constructor(private http: HttpClient) { }

  findAll(): Observable<ProductCredit[]> {
    const data = {
      Site: environment.site
    }
    return this.http.post<ProductCredit[]>(environment.api + this.url + '/find-all', data);
  }

  setSharedData(data: any) {
    this.sharedData = data;
  }

  getSharedData() {
    return this.sharedData;
  }
}