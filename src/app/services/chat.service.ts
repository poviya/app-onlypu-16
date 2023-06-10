import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Headers } from 'src/app/common/http-headers';
import { Chat } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url = 'chat';

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    //data.Site = environment.site;

    return this.http.post<any>(environment.api + this.url, data, Headers.HttpOptions());
  }

  findByIdUser(data: any): Observable<Chat[]> {
    //data.Site = environment.site;

    return this.http.post<Chat[]>(environment.api + this.url + '/findByIdUser', data, Headers.HttpOptions());
  }
}
