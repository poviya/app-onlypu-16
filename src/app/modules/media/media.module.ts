import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostMediaComponent } from './post-media/post-media.component';



@NgModule({
  declarations: [
    PostMediaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostMediaComponent
  ]
})
export class MediaModule { }
