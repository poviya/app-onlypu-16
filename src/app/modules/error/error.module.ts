import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalServerComponent } from './internal-server/internal-server.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    InternalServerComponent
  ],
  imports: [
    CommonModule,
    //ErrorRoutingModule
  ],
  exports: [
    NotFoundComponent,
    InternalServerComponent
  ]
})
export class ErrorModule { }
