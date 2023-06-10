import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ListComponent } from './pages/list/list.component';
import { HeaderComponent } from './pages/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../../footer/footer.module';
import { SearchModule } from '../../search/search.module';
import { TermsSharedModule } from '../../terms/pages/terms-shared/terms-shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SugestionsModule } from '../../sugestions/sugestions.module';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FooterModule,
    SearchModule,
    TermsSharedModule,
    TranslateModule,
    PipesModule,
    SugestionsModule
  ]
})
export class SubscribersModule { }
