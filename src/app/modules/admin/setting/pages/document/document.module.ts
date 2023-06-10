import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDocumentComponent } from './pages/main-document/main-document.component';



@NgModule({
  declarations: [
    MainDocumentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainDocumentComponent
  ]
})
export class DocumentModule { }
