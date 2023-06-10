import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membership, ResponseApi } from '../interfaces';
import { Headers } from 'src/app/common/http-headers';
import { Comment } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url = 'comment';
  
  constructor(
    private http: HttpClient
  ) 
  { 
    
  }

  create(data: any): Observable<Comment> {
    return this.http.post<Comment>(environment.api + this.url + '/', data, Headers.HttpOptions());
  }

  //------------------ Find All Post
  findAllPost(data: any, limit: number, offset: number): Observable<any> {
    
    //offset = 1;
    return this.http.post<any>(environment.api + this.url + `/find-all-post?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }

  findAllPostInfinite(data: any, limit: number, offset: number): Observable<any> {
    
    //offset = 1;
    return this.http.post<any>(environment.api + this.url + `/find-all-post-infinite?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }
  //----------------- End Find All Post

  delete(id: any): Observable<any> {
    console.log(id);
    return this.http.delete<any>(environment.api + this.url + '/' + id);
  }
}
