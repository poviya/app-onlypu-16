import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipComponent } from './tip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'src/app/library/dialog/dialog.module';

@NgModule({
  declarations: [TipComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DialogModule
  ],
  exports: [
    TipComponent,
  ]
})
export class TipModule { }
