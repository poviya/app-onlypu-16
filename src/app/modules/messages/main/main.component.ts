import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, ToolsService } from 'src/app/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isBrowser: boolean;
  countrySlug:any;
  conversation: any ;
  
  constructor( 
      private appService: AppService, 
      public router: Router, 
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

    // if(!this.countrySlug) {
    //   this.countrySlug = this.toolsService.country.slug
    // }
  }

  onConversationSelected(conversation: any){
    this.conversation = conversation;
  }
  
}
