import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

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
    PaymentsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class PaymentsModule { }
