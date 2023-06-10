import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveRoutingModule } from './active-routing.module';
import { MainActiveComponent } from './pages/main-active/main-active.component';
import { ListModule } from '../list/list.module';
import { TipModule } from 'src/app/modules/tip/tip.module';


@NgModule({
  declarations: [
    MainActiveComponent
  ],
  imports: [
    CommonModule,
    ActiveRoutingModule,
    ListModule,
    TipModule
  ]
})
export class ActiveModule { }
