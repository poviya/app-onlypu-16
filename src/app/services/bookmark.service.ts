import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Headers } from 'src/app/common/http-headers';
import { Bookmark } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  url = 'bookmark';
  
  constructor(
    private http: HttpClient
  ) 
  { 
    
  }

  create(data: any): Observable<Bookmark> {

    return this.http.post<Bookmark>(environment.api + this.url + '/', data,  Headers.HttpOptions());
  }

  deleteUser(data: any): Observable<Bookmark> {

    return this.http.post<Bookmark>(environment.api + this.url + '/delete-user', data,  Headers.HttpOptions());
  }

  findOneUser(data: any): Observable<Bookmark> {

    return this.http.post<Bookmark>(environment.api + this.url + '/find-one-user', data);
  }

  findAllUser(dataQuery: any, limit: number, offset: number): Observable<any> {
    return this.http.post<Bookmark[]>(environment.api + this.url + `/find-all-user?limit=${limit}&offset=${offset}`, dataQuery, Headers.HttpOptions());
  }

  findAllUserInfinite(dataQuery: any, limit: number, offset: number): Observable<any> {
    return this.http.post<Bookmark[]>(environment.api + this.url + `/find-all-user-infinite?limit=${limit}&offset=${offset}`, dataQuery, Headers.HttpOptions());
  }

  delete(id: any): Observable<object> {
    return this.http.delete<Bookmark[]>(environment.api + this.url + '/' + id);
  }
}
