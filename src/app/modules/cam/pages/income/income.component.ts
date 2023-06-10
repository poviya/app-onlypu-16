import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionCreditService } from 'src/app/services';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  data: any;
  transactionCredits: any = [];
  alSub: any;
  totalPages: any;
  currentPage = 0;
  limitPage = 5;
  observer: any;
  loading = false;

  search: any;

  postLoading:string[]=["hola","que","tal"];
  
  constructor(
    private activeRoute: ActivatedRoute,
    private transactionCreditService: TransactionCreditService
  ) { }

  ngOnInit(): void {
    this.findAllPostUser();
  }

  findAllPostUser()
  {
    this.data = {
        status: 'ACCEPT'
    };
    this.loading = true;
    this.alSub = this.transactionCreditService.incomeTransactionCam(this.data, this.limitPage, this.currentPage).subscribe(res => {
      this.totalPages = res.totalPages;
      res.data.forEach((element: any) => {
        this.transactionCredits.push(element);
      });
      this.loading = false;
    });
  }
}
