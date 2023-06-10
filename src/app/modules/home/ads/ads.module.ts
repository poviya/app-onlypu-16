import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { CarouselComponent } from '../../../library/carousel/carousel.component';
import { CarouselItemDirective } from '../../../library/carousel/carousel-item.directive';
import { CarouselItemElementDirective } from '../../../library/carousel/carousel-item-element.directive';

import { AdsRoutingModule } from './ads-routing.module';
import { ListAdsComponent } from './list-ads/list-ads.component';
import { ShowHomeComponent } from './show-home/show-home.component';

import { SearchModule } from '../../search/search.module';
import { ModalModule } from 'src/app/library/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { MenuModule } from '../../menu/menu.module';
import { FooterModule } from '../../footer/footer.module';
import { StoriesComponent } from './stories/stories.component';
import { LoadingModule } from 'src/app/library/loading/loading.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CarouselModule } from 'src/app/library/carousel/carousel.module';
import { HeaderComponent } from './header/header.component';
import { DialogAdModule } from './dialog-ad/dialog-ad.module';
import { MediaModule } from '../../media/media.module';
import { DialogModule } from 'src/app/library/dialog/dialog.module';
import { DropdownModule } from 'src/app/library/dropdown/dropdown.module';
import { ReadMoreModule } from 'src/app/library/read-more/read-more.module';
import { TermsSharedModule } from '../../terms/pages/terms-shared/terms-shared.module';
import { PostListModule } from '../../post-list/post-list.module';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    MainComponent,
    //MenuComponent,
    ListAdsComponent,
    ShowHomeComponent,
    StoriesComponent,
    HeaderComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AdsRoutingModule,
    TranslateModule,
    SearchModule,
    ModalModule,
    MenuModule,
    FooterModule,
    LoadingModule,
    PipesModule,
    CarouselModule,
    DialogAdModule,
    MediaModule,
    DialogModule,
    DropdownModule,
    ReadMoreModule,
    TermsSharedModule,
    PostListModule
  ],
})
export class HomeAdsModule { }
