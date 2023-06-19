import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Headers } from 'src/app/common/http-headers';
import { Cam, Geo } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  url = 'geo';

  constructor(private http: HttpClient) { }

  create(data: any): Observable<Geo> {
    return this.http.post<Geo>(environment.api + this.url, data, Headers.HttpOptions());
  }
}
