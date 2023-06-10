import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryState } from '../interfaces/countryState';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {

  url = 'country-state';
  
  constructor(
    private http: HttpClient
  ) 
  { 
    
  }

  findAllCountry(data: any): Observable<object[]> {
    return this.http.post<CountryState[]>(environment.api + this.url + '/country', data);
  }
}
