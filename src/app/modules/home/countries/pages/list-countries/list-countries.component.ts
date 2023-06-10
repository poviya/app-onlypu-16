import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces';
import { CountryService, ToolsService } from 'src/app/services';
import { Config, Menu } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.scss']
})
export class ListCountriesComponent implements OnInit {

  // signle open mode
  options: Config = { multi: false };
  loading: boolean =  false;
  countries:  any = [];
  postLoading: string[] = ["hola", "que", "tal","hola", "que", "tal",];
  
  menus: Menu[] = [
    { 
      name: 'Front-end',
      iconClass: 'fa fa-code',
      active: true,
      submenu: [
        { name: 'HTML', url: '#' },
        { name: 'CSS', url: '#' },
        { name: 'Javascript', url: '#' }
      ]
    },
    { 
      name: 'Responsive web',
      iconClass: 'fa fa-mobile',
      active: false,
      submenu: [
        { name: 'Tablets', url: '#' },
        { name: 'Mobiles', url: '#' },
        { name: 'Desktop', url: '#' }
      ]
    },
    { 
      name: 'Web Browser',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { name: 'Chrome', url: '#' },
        { name: 'Firefox', url: '#' },
        { name: 'Desktop', url: '#' }
      ]
    }
  ];


  constructor(
    private countryService: CountryService,
    private toolsService: ToolsService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllCities();
  }

  findAllCities() : void {
    this.loading = true;
    this.countryService.findAllCities().subscribe(res => {
      if(res)
      {
        this.countries = res;
        this.loading = false;
      }
    })
  }

  onCountryCurrent(code: string) {
    this.toolsService.countryCurrentCreate(code);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }
}
