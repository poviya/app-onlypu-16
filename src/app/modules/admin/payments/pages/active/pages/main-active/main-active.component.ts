import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suscription } from 'src/app/interfaces';
import { PostAdService, SuscriptionService, TransactionCreditService } from 'src/app/services';

@Component({
  selector: 'app-main-active',
  templateUrl: './main-active.component.html',
  styleUrls: ['./main-active.component.scss']
})
export class MainActiveComponent implements OnInit {

  data: any;
  transactionCredits: any = [];
  alSub: any;
  totalPages: any;
  currentPage = 0;
  limitPage = 5;
  observer: any;
  loading = false;

  search: any;

  constructor( 
    private activeRoute: ActivatedRoute,
    private postAdService: PostAdService,
    private transactionCreditService: TransactionCreditService
    ) {
    this.search = this.activeRoute.snapshot.queryParamMap.get('search');
   }

  ngOnInit(): void {
    this.findAllPostUser(); 
  }

  findAllPostUser()
  {
    this.data = {
        status: 'ACCEPT'
    };
    this.loading = true;
    this.alSub = this.transactionCreditService.paymentsTransaction(this.data, this.limitPage, this.currentPage).subscribe(res => {
      this.totalPages = res.totalPages;
      res.data.forEach((element: any) => {
        this.transactionCredits.push(element);
      });
      this.loading = false;
    });
  }

  findAllPostUserInfinite($event: any)
  {
    this.data = {
      status: 'ACCEPT'
    };
    this.currentPage = $event.currentPage;

    this.alSub = this.transactionCreditService.paymentsTransactionInfinite(this.data, this.limitPage, this.currentPage).subscribe(res => {
      res.data.forEach((element: any) => {
        this.transactionCredits.push(element);
      });
    });
  }
}