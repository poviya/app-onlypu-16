import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Money, ResponseApi } from '../interfaces/';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  url = 'money';
  
  constructor(
    private http: HttpClient
  ) 
  { 
    
  }

  findOne(id: any): Observable<ResponseApi> {
    return this.http
      .get<ResponseApi>(environment.api + this.url + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  findOneIso(data: any): Observable<Money> {
    return this.http
      .post<Money>(environment.api + this.url + '/find-one', data)
      .pipe(retry(1), catchError(this.handleError));
  }

  // MANEJADOR DE ERROR
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
    return throwError(() => {
      return errorMessage;
    });
  }
}
