import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRoutingModule } from './all-routing.module';
import { MainAllComponent } from './pages/main-all/main-all.component';
import { ListModule } from '../list/list.module';
import { TipModule } from 'src/app/modules/tip/tip.module';
import { ModalModule } from 'src/app/library/modal';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    MainAllComponent
  ],
  imports: [
    CommonModule,
    AllRoutingModule,
    ListModule,
    TipModule,
    PipesModule,
    ModalModule,
  ]
})
export class AllModule { }
