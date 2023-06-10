import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Suscription } from 'src/app/interfaces';
import { SuscriptionService } from 'src/app/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isBrowser: boolean;
  isServer: boolean;
  count: any;
  constructor( 
            @Inject(PLATFORM_ID) private platformId: object,
            private readonly suscriptionService: SuscriptionService) { 
              if (isPlatformBrowser(this.platformId)) {
                this.isBrowser = true;
              }
              if (isPlatformServer(this.platformId)) {
                this.isServer = true;
              };
            }

  ngOnInit(): void {
    
    this.findAllSubscribersJoinCount();
  }

  findAllSubscribersJoinCount() {
    const data = {};
    this.suscriptionService.findAllSubscribersJoinCount(data).subscribe(res => {
      if(res) {
        this.count = res;
      }
    });
  }
}
