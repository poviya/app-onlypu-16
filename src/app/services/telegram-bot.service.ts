import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StateCity } from '../interfaces/stateCity';

@Injectable({
  providedIn: 'root'
})
export class TelegramBotService {

  url = 'telegramBot-onlypu';
  
  constructor(
    private http: HttpClient
  ) 
  { 
    
  }

  findOne(id: any): Observable<StateCity> {
    return this.http
      .get<StateCity>(environment.apiServices + this.url + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  
  latestPost(dataQuery: any): Observable<any> {
    return this.http.post<any>(environment.apiServices + this.url + '/latest-post', dataQuery);
  }

  latestPostAll(dataQuery: any): Observable<any> {
    return this.http.post<any>(environment.apiServices + this.url + '/latest-post-all', dataQuery);
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
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
