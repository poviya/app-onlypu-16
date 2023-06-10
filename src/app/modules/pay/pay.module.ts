import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay-routing.module';
import { MainComponent } from './pages/main/main.component';
import { NotificationComponent } from './pages/notification/notification.component';


@NgModule({
  declarations: [
    MainComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    PayRoutingModule
  ]
})
export class PayModule { }
