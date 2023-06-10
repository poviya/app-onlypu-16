import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { ViewStartComponent } from './pages/view-start/view-start.component';


@NgModule({
  declarations: [
    ViewStartComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule
  ]
})
export class StartModule { }
