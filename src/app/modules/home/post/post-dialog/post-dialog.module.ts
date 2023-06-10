import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostModalComponent } from './post-modal/post-modal.component';
import { PostAdModalComponent } from './post-ad-modal/post-ad-modal.component';
import { CommentModule } from '../comment/comment.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PostModalComponent,
    PostAdModalComponent
  ],
  imports: [
    CommonModule,
    CommentModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    PostModalComponent,
    PostAdModalComponent
  ]
})
export class PostDialogModule { }
