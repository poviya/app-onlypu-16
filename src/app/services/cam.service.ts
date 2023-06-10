import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Headers } from 'src/app/common/http-headers';
import { Cam } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CamService {

  url = 'cam';

  constructor(private http: HttpClient) { }

  create(data: any): Observable<Cam> {
    //data.Site = environment.site;

    return this.http.post<Cam>(environment.api + this.url, data, Headers.HttpOptions());
  }

  update(id: string, data: any): Observable<Cam> {
    const uri = environment.api + this.url + '/' + id;
    return this.http.patch<Cam>(uri, data, Headers.HttpOptions());
  }

  findOneUser(userId: string): Observable<Cam> {
    //data.Site = environment.site;

    return this.http.get<Cam>(environment.api + this.url + '/user/' + userId, Headers.HttpOptions());
  }

   //------------------ cam active
   findAllActive(data: any, limit: number, offset: number): Observable<any> {
    
    //offset = 1;
    return this.http.post<any>(environment.api + this.url + `/active?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }

  findAllActiveInfinite(data: any, limit: number, offset: number): Observable<any> {
    console.log(limit, offset);
    //offset = 1;
    return this.http.post<any>(environment.api + this.url + `/active-infinite?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }
  //------------------- end cam active

  findOneRoom(roomID: string): Observable<Cam> {
    //data.Site = environment.site;

    return this.http.get<Cam>(environment.api + this.url + '/room/' + roomID, Headers.HttpOptions());
  }
}
