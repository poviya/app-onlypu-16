import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, ToolsService } from 'src/app/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showButton = false;
  scrollHeight = 500;

  width = 'max-w-4xl';
  isBrowser: boolean;
  countrySlug:any;

  constructor( 
      private appService: AppService, 
      public router: Router, 
      @Inject(DOCUMENT) private document: Document,
      private toolsService: ToolsService, 
      @Inject(PLATFORM_ID) private platformId: Object
      ) { 
      if (isPlatformBrowser(this.platformId)) {
        this.isBrowser = true;
      }

      if (isPlatformServer(this.platformId)) {
      
      } 
  }

  ngOnInit(): void {

    if(!this.countrySlug) {
      //this.countrySlug = this.toolsService.country.slug
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
   const yOffset = window.pageYOffset;
   const scrollTop = this.document.documentElement.scrollTop;
   this.showButton = (yOffset || scrollTop) > this.scrollHeight;

  }

  onScrollTop() : void {
    this.document.documentElement.scrollTop = 0;
  }
  
}
