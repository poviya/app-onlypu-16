import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,) { 
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }

    if (isPlatformServer(this.platformId)) {
    
    } 
  }


  ngOnInit(): void {
  }

}
