import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ResponseApi, User } from "../interfaces";
import { Headers } from 'src/app/common/http-headers';
import { ErrorHandlerService } from "./errorHandler.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    url = 'user';
    urlOnly = 'user-onlypu';

    constructor(
      private http: HttpClient,
      private errorHandler: ErrorHandlerService,
      private router: Router
    ) 
    { 
        
    }

    cover(data: any, files: any): Observable<any> { 

      const uploadData = new FormData();
      //uploadData.append('files', files[0]);       // una sola imagen
  
      for (var i = 0; i < files.length; i++) {  
  
        uploadData.append("files", files[i]);       // imagenes multiples
      }  
      uploadData.append('data',  JSON.stringify(data));
      return this.http.post<any[]>(environment.api + this.url + '/create-cover', uploadData, Headers.HttpOptions());
    }

    profile(data: any, files: any): Observable<any> { 

      const uploadData = new FormData();
      //uploadData.append('files', files[0]);       // una sola imagen
  
      for (var i = 0; i < files.length; i++) {  
  
        uploadData.append("files", files[i]);       // imagenes multiples
      }  
      uploadData.append('data',  JSON.stringify(data));
      return this.http.post<any[]>(environment.api + this.url + '/create-profile', uploadData, Headers.HttpOptions());
    }

    update(id: any, data: any): Observable<any> {
        return this.http
            .put<ResponseApi>(environment.api + this.url + '/' + id, data)
            .pipe(retry(1), catchError(this.handleError));
    }

    slug(data: any): Observable<User> {
      return this.http
          .post<User>(environment.api + this.url + '/slug', data, Headers.HttpOptions())
          // .pipe(
          //   catchError((err) => {
          //     //console.log(err.nessage)
          //     //console.error(err);
     
          //     //Handle the error here
          //     this.errorHandler.handleError(err);
          //     return throwError(err);    //Rethrow it back to component
          //   })
          // )
          .pipe(retry(1), catchError(this.handleError));
    }

    slugOnlypu(data: any): Observable<any> {
      return this.http
          .post<any>(environment.api + this.urlOnly + '/slug', data, Headers.HttpOptions())
          // .pipe(
          //   catchError((err) => {
          //     //console.log(err.nessage)
          //     //console.error(err);
     
          //     //Handle the error here
          //     this.errorHandler.handleError(err);
          //     return throwError(err);    //Rethrow it back to component
          //   })
          // )
          .pipe(retry(1), catchError(this.handleError));
    }

    slugOnlypuAuth(data: any): Observable<any> {
      return this.http
          .post<any>(environment.api + this.urlOnly + '/slug-auth', data, Headers.HttpOptions())
          // .pipe(
          //   catchError((err) => {
          //     //console.log(err.nessage)
          //     //console.error(err);
     
          //     //Handle the error here
          //     this.errorHandler.handleError(err);
          //     return throwError(err);    //Rethrow it back to component
          //   })
          // )
          .pipe(retry(1), catchError(this.handleError));
    }

    updateUsername(data: any): Observable<any> {

      return this.http.post<any>(environment.api + this.url + '/update-username', data, Headers.HttpOptions());
    }

    findOne(id: any): Observable<User> {
        return this.http
            .get<User>(environment.api + this.url + '/' + id)
            .pipe(retry(1), catchError(this.handleError));
    }

    searchUsersPosts(data: any): Observable<any> {

      return this.http.post<any>(environment.api + this.urlOnly + '/search-users-posts', data);
    }
  
    usersSuggestion(data: any): Observable<any> {

      return this.http.post<any>(environment.api + this.urlOnly + '/users-suggestion', data);
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
        //window.alert(errorMessage);
        //this.errorHandler.handleError(error);
        this.errorHandler.handleError(error.error);
        console.log(error.error.statusCode);
        return throwError(() => {
          return errorMessage;
        });
      }
}