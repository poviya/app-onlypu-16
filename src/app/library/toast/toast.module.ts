import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [ToastComponent]
})
export class ToastModule { }
