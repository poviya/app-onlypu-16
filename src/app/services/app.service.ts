import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostAdCategory, CityZone, Country, CountryState, StateCity } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = 'assets/data/';
  
  constructor(
    private http: HttpClient
  ) 
  { 
    
  }

  appCountryfindAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url + 'countries.json');
  }

  appCountryStatesfindAll(): Observable<CountryState[]> {
    return this.http.get<CountryState[]>(this.url + 'country-states.json');
  }

  appStateCitiesfindAll(): Observable<StateCity[]> {
    return this.http.get<StateCity[]>(this.url + 'state-cities.json');
  }

  appCityZonesfindAll(): Observable<CityZone[]> {
    return this.http.get<CityZone[]>(this.url + 'city-zones.json');
  }

  appAdCategoriesfindAll(): Observable<PostAdCategory[]> {
    return this.http.get<PostAdCategory[]>(this.url + 'post-ad-categories.json');
  }

}
