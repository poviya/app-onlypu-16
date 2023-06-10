import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YourAdsRoutingModule } from './your-ads-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/library/modal';
import { LoadingModule } from 'src/app/library/loading/loading.module';

import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './pages/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { MenuComponent } from './pages/menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SearchComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    YourAdsRoutingModule,
    FormsModule, ReactiveFormsModule,
    ModalModule,
    LoadingModule,
    TranslateModule
  ]
})
export class YourAdsModule { }
