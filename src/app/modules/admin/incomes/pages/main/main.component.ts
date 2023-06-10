import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suscription } from 'src/app/interfaces';
import { PostAdService, SuscriptionService, TransactionCreditService } from 'src/app/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isBrowser: boolean;
  isServer: boolean;
  count: any;
  search: any;
  constructor( 
            private transactionCreditService: TransactionCreditService,
            @Inject(PLATFORM_ID) private platformId: object,
            private activeRoute: ActivatedRoute,
            @Inject(DOCUMENT) private document: Document,
            private readonly suscriptionService: SuscriptionService) { 
              if (isPlatformBrowser(this.platformId)) {
                this.isBrowser = true;
              }
              if (isPlatformServer(this.platformId)) {
                this.isServer = true;
              };

              this.search = this.activeRoute.snapshot.queryParamMap.get('search');
            }

  ngOnInit(): void {
    
    this.findAllCount();
    this.onScrollTop();
  }

  findAllCount()
  {
    const data = {
      //q: this.myForm.value.q,
      //status: this.openTab == 1 ? 'ACTIVE' : 'INACTIVE'
    };
    this.transactionCreditService.incomeTransactionCounter(data).subscribe(res => {
        this.count = res;
    });
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }
}
