import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ListCountriesComponent } from './pages/list-countries/list-countries.component';
import { AcordionComponent } from './pages/acordion/acordion.component';
import { MenuModule } from '../../menu/menu.module';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from '../../footer/footer.module';
import { HeaderComponent } from './pages/header/header.component';


@NgModule({
  declarations: [
    MainComponent,
    ListCountriesComponent,
    AcordionComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    MenuModule,
    TranslateModule,
    
  ]
})
export class HomeCountriesModule { }
