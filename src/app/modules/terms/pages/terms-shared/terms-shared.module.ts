import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermLinksComponent } from './pages/term-links/term-links.component';

@NgModule({
  declarations: [
    TermLinksComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    TermLinksComponent
  ]
})
export class TermsSharedModule { }
