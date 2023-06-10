import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
//import { MenuModule } from 'primeng/menu';

//import { PrimengModule } from 'src/app/common/primeng/primeng.module';

// COMPONENTS
import { HttpClientModule } from '@angular/common/http';

import { CarouselComponent } from '../../library/carousel/carousel.component';
import { CarouselItemDirective } from '../../library/carousel/carousel-item.directive';
import { CarouselItemElementDirective } from '../../library/carousel/carousel-item-element.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../../library/modal';
import { SearchModule } from '../search/search.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingModule } from 'src/app/library/loading/loading.module';
import { MenuModule } from '../menu/menu.module';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    MainComponent
      //ShowHomeComponent,
      //MainComponent,
      //MenuComponent,

      //ListAdsComponent,

    //CarouselComponent, CarouselItemDirective, CarouselItemElementDirective ,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    FormsModule, ReactiveFormsModule,
    MenuModule,
    HttpClientModule,
    //ModalModule,
    //SearchModule,
    TranslateModule,
    //LoadingModule
    //PrimengModule
  ]
})
export class HomeModule { }
