import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuspendedRoutingModule } from './suspended-routing.module';
import { MainSuspendedComponent } from './pages/main-suspended/main-suspended.component';
import { ListModule } from '../list/list.module';


@NgModule({
  declarations: [
    MainSuspendedComponent
  ],
  imports: [
    CommonModule,
    SuspendedRoutingModule,
    ListModule
  ]
})
export class SuspendedModule { }
