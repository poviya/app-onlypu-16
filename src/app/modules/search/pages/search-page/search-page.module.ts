import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ViewComponent } from './pages/view/view.component';
import { HeaderComponent } from './pages/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from 'src/app/modules/footer/footer.module';
import { SearchModule } from '../../search.module';
import { MenuComponent } from './pages/menu/menu.component';
import { UsersComponent } from './pages/users/users.component';
import { PostsComponent } from './pages/posts/posts.component';
import { DropdownModule } from 'src/app/library/dropdown/dropdown.module';
import { MediaModule } from 'src/app/modules/media/media.module';
import { ReadMoreModule } from 'src/app/library/read-more/read-more.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SugestionsComponent } from './pages/sugestions/sugestions.component';
import { TermsSharedModule } from 'src/app/modules/terms/pages/terms-shared/terms-shared.module';


@NgModule({
  declarations: [
    MainComponent,
    ViewComponent,
    HeaderComponent,
    MenuComponent,
    UsersComponent,
    PostsComponent,
    SugestionsComponent
  ],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    TranslateModule,
    FooterModule,
    SearchModule,
    DropdownModule,
    MediaModule,
    ReadMoreModule,
    PipesModule,
    TermsSharedModule
  ]
})
export class SearchPageModule { }
