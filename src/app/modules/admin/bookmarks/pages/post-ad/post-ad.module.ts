import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostAdRoutingModule } from './post-ad-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    PostAdRoutingModule
  ]
})
export class PostAdModule { }
