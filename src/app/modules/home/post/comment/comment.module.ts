import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'src/app/library/dropdown/dropdown.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    CommentComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule, 
    ReactiveFormsModule,
    DropdownModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    CommentComponent
  ]
})
export class CommentModule { }
