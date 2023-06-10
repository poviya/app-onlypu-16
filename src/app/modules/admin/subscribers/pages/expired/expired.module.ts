import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpiredRoutingModule } from './expired-routing.module';
import { MainExpiredComponent } from './pages/main-expired/main-expired.component';
import { ListModule } from '../list/list.module';
import { TipModule } from 'src/app/modules/tip/tip.module';


@NgModule({
  declarations: [
    MainExpiredComponent
  ],
  imports: [
    CommonModule,
    ExpiredRoutingModule,
    ListModule,
    TipModule
  ]
})
export class ExpiredModule { }
