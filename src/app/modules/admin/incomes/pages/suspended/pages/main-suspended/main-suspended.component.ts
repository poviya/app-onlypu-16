import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suscription } from 'src/app/interfaces';
import { PostAdService, SuscriptionService, TransactionCreditService } from 'src/app/services';


@Component({
  selector: 'app-main-suspended',
  templateUrl: './main-suspended.component.html',
  styleUrls: ['./main-suspended.component.scss']
})
export class MainSuspendedComponent implements OnInit {

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
        status: 'DECLINE'
    };
    this.loading = true;
    this.alSub = this.transactionCreditService.incomeTransaction(this.data, this.limitPage, this.currentPage).subscribe(res => {
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
      status: 'DECLINE'
    };
    this.currentPage = $event.currentPage;

    this.alSub = this.transactionCreditService.incomeTransactionInfinite(this.data, this.limitPage, this.currentPage).subscribe(res => {
      res.data.forEach((element: any) => {
        this.transactionCredits.push(element);
      });
    });
  }
}