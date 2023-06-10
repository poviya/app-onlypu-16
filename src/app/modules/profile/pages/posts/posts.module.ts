import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { MainPostsComponent } from './main-posts/main-posts.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ModalModule } from 'src/app/library/modal/modal.module';
import { DropdownModule } from '../../../../library/dropdown/dropdown.module';
import { CarouselModule } from 'src/app/library/carousel/carousel.module';
import { MediaModule } from 'src/app/modules/media/media.module';
import { DeleteComponent } from './delete/delete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'src/app/library/dialog/dialog.module';
import { ReadMoreModule } from 'src/app/library/read-more/read-more.module';
import { TranslateModule } from '@ngx-translate/core';
import { PostListModule } from 'src/app/modules/post-list/post-list.module';
import { PostDialogModule } from 'src/app/modules/home/post/post-dialog/post-dialog.module';

@NgModule({
  declarations: [MainPostsComponent, ListPostsComponent, DeleteComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    PipesModule,
    ModalModule,
    DropdownModule,
    MediaModule,
    DialogModule,
    ReadMoreModule,
    TranslateModule,
    PostListModule,
    PostDialogModule
  ]
})
export class PostsModule { }
