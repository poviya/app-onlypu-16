import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ConfigComponent } from './pages/config/config.component';


@NgModule({
  declarations: [
    MainComponent,
    ConfigComponent
  ],
  imports: [
    CommonModule,
    LegalRoutingModule
  ]
})
export class LegalModule { }
