import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { CountryService, ToolsService } from 'src/app/services';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-view-start',
  templateUrl: './view-start.component.html',
  styleUrls: ['./view-start.component.scss']
})
export class ViewStartComponent implements OnInit {

  ipapi: any;

  constructor(
    private toolsService: ToolsService,
    private countryService: CountryService,
    private router: Router,
    private location: Location,
  ) { 
    this.router.events
          .pipe(filter((e: any) => e instanceof RoutesRecognized),
            pairwise()
          ).subscribe((e: any) => {
            localStorage.setItem('urlPrevius', e[0].urlAfterRedirects);
      });
  }

  ngOnInit(): void {
   
  }

  countryCurrent0()
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
          //window.history.back();
          this.location.back();
        }
      });
    });
  }

  countryCurrent(ipapi: any)
  {
    this.toolsService.ipapiCreate(ipapi);
    let data = {};

    const validExtensions = ['BO', 'US', 'AR', 'PE', 'VE'];

    if (validExtensions.includes(ipapi['country_code'])) {
      data = {
        countryCode: ipapi['country_code'],
        ipapi: ipapi,
        production: environment.production
      }; 
    } else {
      data = {
        countryCode: 'US',
        ipapi: ipapi,
        production: environment.production
      }; 
    }
    this.toolsService.createStart(data).subscribe( res => {
      if(res)
      {
        //window.history.back();
        this.location.back();
        const country = JSON.stringify(res!);
        this.toolsService.countryCreate(country);
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);

        const url = localStorage.getItem('urlPrevius');
        this.router.navigateByUrl(url!);
        
      }
    });
  }

  accept()
  {
    if(document.domain === 'localhost')
    {
      if(this.toolsService.ipapi)
      {
        console.log(1)
        this.countryCurrent(this.toolsService.ipapi);
      } else {
        this.toolsService.ipapiGet().subscribe(res => {
          this.countryCurrent(res);
        });
      }
      
    } else {
      const ipapi = this.toolsService.ipapiDefault;
      this.countryCurrent(ipapi);
    }
  }

  decline()
  {
    const url ='https://xvideos.com';
    window.open(url, '_blank');
  }
}
