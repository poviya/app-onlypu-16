import { Component, OnInit } from '@angular/core';
import { UserTransfer } from 'src/app/interfaces';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { UserTransferService } from 'src/app/services';

@Component({
  selector: 'app-main-payment',
  templateUrl: './main-payment.component.html',
  styleUrls: ['./main-payment.component.scss']
})
export class MainPaymentComponent implements OnInit {

  userTransfer: UserTransfer [] = [];
  paypal: UserTransfer;
  linkPay: UserTransfer;

  constructor( 
            private userTransferService: UserTransferService,
            private spinnerService: SpinnerService,
            ) { }

  ngOnInit(): void {
    this.findAllUser();
  }

  get getData() {
    return this.userTransferService.findData;

  }

  findAllUser(): void {
    const data = {};
    this.userTransferService.findAllUser(data).subscribe(res => {
      if(res) { 
        //console.log('res payent method', res);
        this.userTransfer = res;
        this.userTransferService.uploadData(res);
        this.paypal = this.userTransfer.filter(res => res.type == 'PAYPAL')[0];
        //console.log('paypal', this.paypal);
        this.linkPay = this.userTransfer.filter(res => res.type == 'LINK_PAY')[0];
        //console.log('link pay', this.paypal);
      }
    })
  }

  onCreatePaypal($event: any) {
    this.spinnerService.start()
    this.userTransferService.createPaypal($event).subscribe(res => {
      if(res) {
        this.paypal = res;
        this.spinnerService.close();
      }
    })
  }

  onUpdatePaypal($event: any) {
    this.paypal!;
    this.spinnerService.start()
    this.userTransferService.updatePaypal($event.id, $event.data).subscribe(res => {
      if(res) {
        this.paypal = res;
        this.spinnerService.close()
      }
    })
  }
}
