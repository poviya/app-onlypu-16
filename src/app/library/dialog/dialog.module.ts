import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SibermenuDialogComponent } from './pages/sibermenu-dialog/sibermenu-dialog.component';
import { CenterDialogComponent } from './pages/center-dialog/center-dialog.component';
import { PostDialogComponent } from './pages/post-dialog/post-dialog.component';
import { SearchDialogComponent } from './pages/search-dialog/search-dialog.component';
import { CommentDialogComponent } from './pages/comment-dialog/comment-dialog.component';

@NgModule({
  declarations: [
    SibermenuDialogComponent,
    CenterDialogComponent,
    PostDialogComponent,
    SearchDialogComponent,
    CommentDialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ 
    SibermenuDialogComponent,
    CenterDialogComponent,
    PostDialogComponent,
    SearchDialogComponent,
    CommentDialogComponent
  ]
})
export class DialogModule { }
