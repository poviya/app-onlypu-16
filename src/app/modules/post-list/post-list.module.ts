import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'src/app/library/dropdown/dropdown.module';
import { ReadMoreModule } from 'src/app/library/read-more/read-more.module';
import { MediaModule } from '../media/media.module';
import { DialogModule } from 'src/app/library/dialog/dialog.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PostDialogModule } from '../home/post/post-dialog/post-dialog.module';
import { HammerModule } from '@angular/platform-browser';
import { CommentModule } from '../home/post/comment/comment.module';



@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,
    ReadMoreModule,
    MediaModule,
    DialogModule,
    PipesModule,
    PostDialogModule,
    HammerModule,
    CommentModule
  ],
   exports: [
    PostListComponent
   ]
})
export class PostListModule { }
