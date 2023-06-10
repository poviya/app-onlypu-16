import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Headers } from 'src/app/common/http-headers';
import { Post, PostMedia } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = 'post-onlypu';

  constructor(private http: HttpClient) { }

  upload(data: any,  files: any): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    for (var i = 0; i < files.length; i++) {
      console.log('files', files[i]);  
      formData.append("files", files[i]);       // imagenes multiples
    }  
    formData.append('files', files);
    formData.append('data',  JSON.stringify(data));
    
    const req = new HttpRequest('POST', `${environment.api}${this.url}/create`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  create(data: any, files: any): Observable<any> { 
    data.Site = environment.site;
    const uploadData = new FormData();
    //uploadData.append('files', files[0]);       // una sola imagen
    
    for (var i = 0; i < files.length; i++) {
      console.log(files[i]);  
      uploadData.append("files", files[i]);       // imagenes multiples
    }  
    uploadData.append('data',  JSON.stringify(data));
    return this.http.post<any[]>(environment.api + this.url + '/create', uploadData,  Headers.HttpOptions());
  }

  update(id: string, data: any): Observable<Post> {
    const uri = environment.api + this.url + '/' + id;
    return this.http.put<Post>(uri, data, Headers.HttpOptions());
  }

  likes(id: string, data: any): Observable<Post> {
    const uri = environment.api + this.url + '/like/' + id;
    return this.http.put<Post>(uri, data, Headers.HttpOptions());
  }


  //------------------ Find All Users
  findAllUser(data: any, limit: number, offset: number): Observable<any> {
    
    //offset = 1;
    return this.http.post<any>(environment.api + this.url + `/find-all-user?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }

  findAllUserInfinite(data: any, limit: number, offset: number): Observable<any> {
    
    //offset = 1;
    return this.http.post<any>(environment.api + this.url + `/find-all-user-infinite?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }
  //----------------- End Find All Users

  //------------------ post media
  findAllUserMedia(data: any, limit: number, offset: number): Observable<any> {
    
    //offset = 1;
    return this.http.post<PostMedia[]>(environment.api + this.url + `/find-all-user-media?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }

  findAllUserMediaInfinite(data: any, limit: number, offset: number): Observable<any> {
    console.log(limit, offset);
    //offset = 1;
    return this.http.post<PostMedia[]>(environment.api + this.url + `/find-all-user-media-infinite?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }
  //------------------- end post media

  findOne(id: any): Observable<Post> {
    return this.http
      .get<Post>(environment.api + this.url + '/' + id);
      //.pipe(retry(1), catchError(this.handleError));
  }


  //********** litst post */

  findAll(data: any, limit: number, offset: number): Observable<any> {
    
    //offset = 1;
    return this.http.post<any>(environment.api + this.url + `/find-all-posts?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }

  findAllInfinite(data: any, limit: number, offset: number): Observable<any> {
    
    //offset = 1;
    return this.http.post<any>(environment.api + this.url + `/find-all-posts-infinite?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }

  //******** end list posts */
  
  
  delete(id: any): Observable<any> {
    console.log(id);
    return this.http.delete<any>(environment.api + this.url + '/' + id);
  }

  findRecentPhotosUser(id: any): Observable<PostMedia[]> {
    return this.http
      .get<PostMedia[]>(environment.api + this.url + '/' + id);
      //.pipe(retry(1), catchError(this.handleError));
  }
}
