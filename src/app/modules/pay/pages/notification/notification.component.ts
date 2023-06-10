import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from 'src/app/services';
import { PaymentOrderService } from 'src/app/services/payment-order.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  idPaymentOder: any;
  paymentOrder: any;

  constructor(  
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private toolsService: ToolsService,
    private paymentOrderService: PaymentOrderService) {
    this.idPaymentOder = this.activatedRoute.snapshot.paramMap.get('id_payment_order'); //console.log(this.idPost)
  }

  ngOnInit(): void {
    this.findOne();
  }

  findOne()
  {
    if(this.idPaymentOder)
    {
      this.paymentOrderService.findOne(this.idPaymentOder).subscribe(res => {
        console.log(res);
        if(res)
        {
          this.paymentOrder = res; 
        }
      });
    } 
  }
}
