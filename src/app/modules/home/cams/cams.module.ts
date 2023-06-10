import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamsRoutingModule } from './cams-routing.module';
import { HeaderComponent } from './pages/header/header.component';
import { MainComponent } from './pages/main/main.component';
import { ListComponent } from './pages/list/list.component';
import { FooterModule } from '../../footer/footer.module';
import { MediaModule } from '../../media/media.module';
import { DialogModule } from 'src/app/library/dialog/dialog.module';
import { ReadMoreModule } from 'src/app/library/read-more/read-more.module';
import { DropdownModule } from 'src/app/library/dropdown/dropdown.module';
import { SearchModule } from '../../search/search.module';
import { TermsSharedModule } from '../../terms/pages/terms-shared/terms-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { SugestionsModule } from '../../sugestions/sugestions.module';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CamsRoutingModule,
    FooterModule,
    MediaModule,
    DialogModule,
    ReadMoreModule,
    DropdownModule,
    SearchModule,
    TranslateModule,
    TermsSharedModule,
    SugestionsModule,
    PipesModule
  ]
})
export class CamsModule { }
