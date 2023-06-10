import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url = 'country';
  
  constructor(
    private http: HttpClient
  ) 
  { 
    
  }

  findAll(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(environment.api + this.url);
  }

  findAllCities(): Observable<any> {
    return this.http.get<any>(environment.api + this.url + '/country-cities');
  }

  search(data: any): Observable<object[]> {
    return this.http.post<Country[]>(environment.api + this.url + '/search', data);
  }
}
