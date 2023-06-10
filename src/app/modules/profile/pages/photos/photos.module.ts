import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { MainPhotosComponent } from './main-photos/main-photos.component';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MainPhotosComponent, ListComponent],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    TranslateModule
  ]
})
export class PhotosModule { }
