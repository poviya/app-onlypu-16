import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../interfaces';
import { Headers } from 'src/app/common/http-headers';

@Injectable({
  providedIn: 'root'
})
export class RepostService {

  url = 'report';
  
  constructor(
    private http: HttpClient
  ) 
  { 
    
  }

  create(data: any): Observable<Report> {
    return this.http.post<Report>(environment.api + this.url + '/', data, Headers.HttpOptions());
  }

}
