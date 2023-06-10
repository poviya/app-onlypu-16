import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPaymentComponent } from './pages/main-payment/main-payment.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { LinkPayComponent } from './pages/link-pay/link-pay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MainPaymentComponent,
    PaypalComponent,
    LinkPayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    MainPaymentComponent
  ]
})
export class PaymentModule { }
