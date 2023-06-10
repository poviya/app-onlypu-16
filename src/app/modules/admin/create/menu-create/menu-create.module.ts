import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCreateComponent } from './menu-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [MenuCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    MenuCreateComponent
  ]
})
export class MenuCreateModule { }
