import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Headers } from 'src/app/common/http-headers';
import { Cam } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipService {

  private tipData: any;

  constructor(private http: HttpClient) { }

  get tip() {
    return this.tipData;
  }

  create(data: any) {
    this.tipData = null;
    this.tipData = data;
  }
}
