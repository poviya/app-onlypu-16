import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MenuModule } from '../../menu/menu.module';
import { BoComponent } from './pages/bo/bo.component';
import { FooterModule } from '../../footer/footer.module';


@NgModule({
  declarations: [
    MainComponent,
    BoComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MenuModule,
    FooterModule
  ]
})
export class HomeCategoriesModule { }
