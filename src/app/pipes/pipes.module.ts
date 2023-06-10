import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAgoPipe } from './date-ago.pipe';
import { NumberMoneyPipe } from './number-money.pipe';
import { ThousandsPipe } from './thousands.pipe';


@NgModule({
  declarations: [
    DateAgoPipe,
    NumberMoneyPipe,
    ThousandsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateAgoPipe,
    NumberMoneyPipe,
    ThousandsPipe
  ]
})
export class PipesModule { }
