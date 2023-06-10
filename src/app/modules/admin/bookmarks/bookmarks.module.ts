import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { ShowComponent } from './pages/show/show.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './pages/list/list.component';
import { LoadingModule } from 'src/app/library/loading/loading.module';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './pages/header/header.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FooterModule } from '../../footer/footer.module';


@NgModule({
  declarations: [
    ShowComponent,
    ListComponent,
    MainComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    BookmarksRoutingModule,
    FormsModule, ReactiveFormsModule,
    TranslateModule,
    LoadingModule,
    FooterModule
  ],
  providers: [{ provide: 'isBrowser', useValue: true }],
})
export class BookmarksModule { }
