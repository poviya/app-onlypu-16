import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService, ToolsService } from 'src/app/services';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  ipapi: any;

  constructor(
    private toolsService: ToolsService,
    private countryService: CountryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.countryCurrentTest();
  }

  countryCurrent()
  {
    this.toolsService.ipapiGet().subscribe(res => {
      this.ipapi = res;
      localStorage.setItem('ipapi', JSON.stringify(this.ipapi!));
      const data = {
        code: this.ipapi['country_code']
      }
      this.countryService.search(data).subscribe( res => {
        if(res)
        {
          const country = JSON.stringify(res!);
          localStorage.setItem('country', country);
          window.history.back();
        }
      });
    });
  }

  countryCurrentTest()
  {
    this.ipapi = {
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
    localStorage.setItem('ipapi', JSON.stringify(this.ipapi!));
    const data = {
      code: this.ipapi['country_code']
    }; 
    this.countryService.search(data).subscribe( res => {
      if(res)
      {
        const country = JSON.stringify(res!);
        localStorage.setItem('country', country); console.log(2)
        window.history.back();
      }
    });
  }
}

