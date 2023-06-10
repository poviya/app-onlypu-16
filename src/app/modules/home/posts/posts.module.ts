import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuModule } from '../../menu/menu.module';
import { VideoSnapshotComponent } from './pages/video-snapshot/video-snapshot.component';
import { ListComponent } from './pages/list/list.component';
import { ModalModule } from 'src/app/library/modal/modal.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { FooterModule } from '../../footer/footer.module';
import { MediaModule } from '../../media/media.module';
import { DialogModule } from 'src/app/library/dialog/dialog.module';
import { ReadMoreModule } from 'src/app/library/read-more/read-more.module';
import { DropdownModule } from 'src/app/library/dropdown/dropdown.module';
import { SearchModule } from '../../search/search.module';
import { TranslateModule } from '@ngx-translate/core';
import { TermsSharedModule } from '../../terms/pages/terms-shared/terms-shared.module';
import { SugestionsModule } from '../../sugestions/sugestions.module';
import { PostListModule } from '../../post-list/post-list.module';


@NgModule({
  declarations: [
    MainComponent,
    VideoSnapshotComponent,
    ListComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MenuModule,
    PipesModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    MediaModule,
    DialogModule,
    ReadMoreModule,
    DropdownModule,
    SearchModule,
    TranslateModule,
    TermsSharedModule,
    SugestionsModule,
    PostListModule
  ],
  //entryComponents: [TipComponent]
})
export class PostsModule { }
