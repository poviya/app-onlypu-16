import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../interfaces/post';
import { Headers } from 'src/app/common/http-headers';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostAdService {

  url = 'post-ad';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) 
  { 
    
  }

  create(data: any, files: any): Observable<any> { 
    const uploadData = new FormData();
    //uploadData.append('files', files[0]);       // una sola imagen

    for (var i = 0; i < files.length; i++) {  

      uploadData.append("files", files[i]);       // imagenes multiples
    }  
    uploadData.append('data',  JSON.stringify(data));
    return this.http.post<any[]>(environment.api + this.url + '/create', uploadData, Headers.HttpOptions());
  }

  
  update(id:string, data: any, files: any): Observable<any> { 
    const uploadData = new FormData();
    //uploadData.append('files', files[0]);       // una sola imagen

    for (var i = 0; i < files.length; i++) {  

      uploadData.append("files", files[i]);       // imagenes multiples
    }  
    uploadData.append('data',  JSON.stringify(data));
    return this.http.put<any[]>(environment.api + this.url + '/' + id, uploadData, Headers.HttpOptions());
  }

  create2(data: any, files: any): Observable<any> { 

    const uploadData = new FormData();
    //uploadData.append('files', files[0]);       // una sola imagen
    
    for (var i = 0; i < files.length; i++) {
      console.log(files[i]);  
      uploadData.append("files", files[i]);       // imagenes multiples
    }  
    uploadData.append('data',  JSON.stringify(data));
    return this.http.post<any[]>(environment.api + this.url + '/create-2', uploadData, Headers.HttpOptions());
  }

  update2(id: string, data: any): Observable<Post> {
    const uri = environment.api + this.url + '/update2/' + id;
    console.log(uri);
    return this.http.put<Post>(uri, data, Headers.HttpOptions());
  }

  updateStatus(id: string, data: any): Observable<Post> {
    const uri = environment.api + this.url + '/update-status/' + id;
    return this.http.put<Post>(uri, data, Headers.HttpOptions());
  }

  media(data: any, files: any): Observable<any> { 

    const uploadData = new FormData();
    //uploadData.append('files', files[0]);       // una sola imagen

    for (var i = 0; i < files.length; i++) {  

      uploadData.append("files", files[i]);       // imagenes multiples
    }  
    uploadData.append('data',  JSON.stringify(data));
    return this.http.post<any[]>(environment.api + this.url + '/media', uploadData, Headers.HttpOptions());
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(environment.api + this.url + '/' + id);
  }

  findOne(id: any): Observable<Post> {
    return this.http
      .get<Post>(environment.api + this.url + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  findOneSlug(data: any): Observable<any> {
    const dataQuery = {
      ...data
    }; 
    //console.log(dataQuery)
    return this.http.post<Post>(environment.api + this.url + '/slug', dataQuery);
  }
  
  findAllSearch(data: any, limit: number, offset: number): Observable<any> {
    
    //offset = 1;
    return this.http.post<any>(environment.api + this.url + `/q?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }

  findAllSearchInfinite(data: any, limit: number, offset: number): Observable<any> {
    
    //offset = 1;
    return this.http.post<any>(environment.api + this.url + `/infinite?limit=${limit}&offset=${offset}`, data)
      .pipe(delay(200));
  }

  findAllUser(dataQuery: any, limit: number, offset: number): Observable<any> {
    return this.http.post<Post[]>(environment.api + this.url + `/user?limit=${limit}&offset=${offset}`, dataQuery, Headers.HttpOptions());
  }

  findAllUserInfinite(dataQuery: any, limit: number, offset: number): Observable<any> {
    return this.http.post<Post[]>(environment.api + this.url + `/user-infinite?limit=${limit}&offset=${offset}`, dataQuery, Headers.HttpOptions());
  }

  findAllUserCount(dataQuery: any): Observable<object[]> {
    
    return this.http.post<Post[]>(environment.api + this.url + '/user-count', dataQuery, Headers.HttpOptions());
  }

  /******** bookmark */
  createBookmark(data: any): Observable<Post> {

    return this.http.post<Post>(environment.api + this.url + '/create-bookmark', data);
  }

  findOnBookmarkUser(data: any): Observable<Post> {

    return this.http.post<Post>(environment.api + this.url + '/find-all-bookmarks-user', data);
  }

  deleteBookmark(data: any): Observable<Post> {
    return this.http.post<Post>(environment.api + this.url + '/delete-bookmark', data);
  }

  findAllBookmarksUser(dataQuery: any, limit: number, offset: number): Observable<any> {
    return this.http.post<Post[]>(environment.api + this.url + `/find-all-bookmarks-user?limit=${limit}&offset=${offset}`, dataQuery, Headers.HttpOptions());
  }

  findAllBookmarksUserInfinite(dataQuery: any, limit: number, offset: number): Observable<any> {
    return this.http.post<Post[]>(environment.api + this.url + `/find-all-bookmarks-infinite?limit=${limit}&offset=${offset}`, dataQuery, Headers.HttpOptions());
  }

  updateClick(data: any): Observable<Post> {
    return this.http.post<Post>(environment.api + this.url + '/update-click', data);
  }

  updatePlan(data: any): Observable<Post> {

    return this.http.post<Post>(environment.api + this.url + '/update-plan', data);
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
