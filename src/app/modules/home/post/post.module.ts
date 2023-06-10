import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { MainComponent } from './main/main.component';
import { SearchModule } from '../../search/search.module';
import { ModalModule } from 'src/app/library/modal';
import { TranslateModule } from '@ngx-translate/core';
import { MenuModule } from '../../menu/menu.module';
import { FooterModule } from '../../footer/footer.module';
import { LoadingModule } from 'src/app/library/loading/loading.module';
import { HeaderComponent } from './header/header.component';
import { ViewAdComponent } from './view-ad/view-ad.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DropdownModule } from 'src/app/library/dropdown/dropdown.module';
import { CommentModule } from './comment/comment.module';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    ViewAdComponent,
    ViewPostComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SearchModule,
    ModalModule,
    TranslateModule,
    SearchModule,
    ModalModule,
    MenuModule,
    FooterModule,
    LoadingModule,
    PipesModule,
    DropdownModule,
    CommentModule
  ]
})
export class PostModule { }
