import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdRoutingModule } from './ad-routing.module';
import { ViewAdComponent } from './view-ad/view-ad.component';
import { MainComponent } from './main/main.component';
import { TranslateModule } from '@ngx-translate/core';
import { SearchModule } from '../../search/search.module';
import { ModalModule } from 'src/app/library/modal';
import { MenuModule } from '../../menu/menu.module';
import { FooterModule } from '../../footer/footer.module';
import { LoadingModule } from 'src/app/library/loading/loading.module';
import { DateAgoPipe } from 'src/app/pipes/date-ago.pipe';
import { TooltipDirective } from 'src/app/library/tooltip/tooltip.directive';
import { HeaderComponent } from './header/header.component';
import { LightboxComponent } from './lightbox/lightbox.component';


@NgModule({
  declarations: [
    ViewAdComponent,
    MainComponent,
    TooltipDirective,
    HeaderComponent,
    LightboxComponent,

    //DateAgoPipe
    //MenuComponent
  ],
  imports: [
    CommonModule,
    AdRoutingModule,
    SearchModule,
    ModalModule,
    TranslateModule,
    SearchModule,
    ModalModule,
    MenuModule,
    FooterModule,
    LoadingModule
  ],
})
export class AdModule { }
