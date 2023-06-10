import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  ipapiRes: any;

  constructor(
    private countryService: CountryService,
    private http: HttpClient
  ) { }

  ipapiGet(): Observable<object[]> {
    //console.log(1)
    // fanspi@hotmail.com -> bb4ba6f682fa9fe4dddc8b2d191e82f9
    
    const url = `http://api.ipapi.com/181.115.131.227?access_key=0e99946c267616d45e2d737fc2e8dd17`;
    return this.http.get<any[]>(url)
    .pipe(
      tap( resp => {
        //this.ipapiRes = JSON.stringify(resp!);
        //localStorage.setItem('ipapi', this.ipapiRes);
      }),
      map( resp => resp ),
      catchError( err => of(err.error.msg) )
    );
  }

  get ipapiDefault()
  {
    return {
      ip: '181.115.131.227', 
      type: 'ipv4',
      city: "Oruro", 
      continent_code: "SA", 
      continent_name: "South America", 
      country_code: "BO", 
      country_name: "Bolivia",
        latitude: -17.942869186401367,
        "location": {
          "geoname_id": 5110302,
          "capital": "Washington D.C.",
          "languages": [
              {
                  "code": "en",
                  "name": "English",
                  "native": "English"
              }
          ],
          "country_flag": "http://assets.ipapi.com/flags/us.svg",
          "country_flag_emoji": "🇺🇸",
          "country_flag_emoji_unicode": "U+1F1FA U+1F1F8",
          "calling_code": "1",
          "is_eu": false
      },
      "time_zone": {
          "id": "America/New_York",
          "current_time": "2018-09-24T05:07:10-04:00",
          "gmt_offset": -14400,
          "code": "EDT",
          "is_daylight_saving": true
      },
      "currency": {
          "code": "USD",
          "name": "US Dollar",
          "plural": "US dollars",
          "symbol": "$",
          "symbol_native": "$"
      },
      "connection": {
          "asn": 22252,
          "isp": "The City of New York"
      },
      "security": {
          "is_proxy": false,
          "proxy_type": null,
          "is_crawler": false,
          "crawler_name": null,
          "crawler_type": null,
          "is_tor": false,
          "threat_level": "low",
          "threat_types": null
      }
    }
  }

  ipapiCreate(ipapi: any) {
    //console.log(2)
    return localStorage.setItem('ipapi', JSON.stringify(ipapi!));
  }

  get ipapi() {
    //console.log(2)
    return JSON.parse(localStorage.getItem('ipapi')!);
  }

  get validateIpapi()
  {
    if(localStorage.getItem('ipapi'))
    { 
      return true;
    } else {
      return false;
    }

  }

  get countryValidate()
  {
    if(localStorage.getItem('country'))
    { 
      return true;
    } else {
      return false;
    }

  }

  countryCurrentCreate(country: string)
  {
    return localStorage.setItem('country_current', country);
  }

  get countryCurrent() {
    if(localStorage.getItem('country_current') !== 'undefined')
    {
      return localStorage.getItem('country_current');
    } else {
      return '';
    }
  }

  countryCreate(country: any)
  {
    return localStorage.setItem('country', country);
  }

  get country() {
    console.log(localStorage.getItem('country')!);
    if(localStorage.getItem('country') !== 'undefined')
    {
      console.log('yes');
      //return JSON.parse(localStorage.getItem('country')!);
      return null;
    } else {
      return null;
    }
  }

  categoryCreate(country: any)
  {
    return localStorage.setItem('country', country);
  }

  get catatoryAll() {
    //console.log(2)
    return JSON.parse(localStorage.getItem('country')!);
  }

  languageCreate(data: string)
  {
    localStorage.setItem('language', data);
  }

  language() {
    //console.log(2)
    return localStorage.getItem('language');
  }

  createStart(data: any): Observable<any[]> {

    return this.http.post<any[]>(environment.api + 'geo/start', data);
  }
}
