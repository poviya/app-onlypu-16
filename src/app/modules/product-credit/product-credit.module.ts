import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreditComponent } from './product-credit.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'src/app/library/dialog/dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductCreditComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductCreditComponent
  ]
})
export class ProductCreditModule { }
