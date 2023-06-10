import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCredit } from 'src/app/interfaces';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { AuthService, PaymentOrderService, ProductCreditService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-credit',
  templateUrl: './product-credit.component.html',
  styleUrls: ['./product-credit.component.scss']
})
export class ProductCreditComponent implements OnInit {

  productCredit: ProductCredit[];
  myform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private productCreditService: ProductCreditService,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private paymentService: PaymentOrderService,
  ) { }

  ngOnInit(): void {
    this.finAll();
    this.createFormControls();
  }

  createFormControls() {
    this.myform = this.fb.group({
      credit: ['', [Validators.required]],
    });
  }
  finAll() {

    this.productCreditService.findAll().subscribe(res => {
      if (res) {
        this.productCredit = res;
      }
    })
  }

  onSubmit(): void {

    if (this.myform.valid && this.authService.user) {
      this.spinnerService.start();
      const data = {
        Sender: this.authService.user._id,
        Site: environment.site,
        production: true,
        ProductCredit: this.myform.value.credit,
        paymentType: 'SALE_CREDIT',
        urlCallback: '',
        urlReturn: `https://onlypu.com/pay/notification`
      }
      this.closeModalBuyCredit();

      this.paymentService.createCreditSale(data).subscribe(res => {
        if (res) {
          let url = '';
          if (document.domain === 'localhost') {
            url = 'http://localhost:4201/pay/checkout/' + res.codeCollection;
          } else if (document.domain === 'onlypu.com') {
            url = 'https://poviya.com/pay/checkout/' + res.codeCollection;
          }
          //url = 'https://poviya.com/pay/checkout/' + res.codeCollection;

          const link = document.createElement('a');
          link.href = url;
          link.target = '_self'; // Open the link in a new tab
          document.body.appendChild(link);
          link.click(); // Simulates a click on the link to open the new page
          this.spinnerService.close();
        }
      })
    }
  }
  //+++++++++++++++++++ BUY CREDITS

  get modalBuyCredit() {
    return this.dialogService.modalBuyCredit;
  }

  closeModalBuyCredit() {
    this.dialogService.toogleBuyCredit();
  }


}
