import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { MainVideosComponent } from './main-videos/main-videos.component';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MediaModule } from 'src/app/modules/media/media.module';


@NgModule({
  declarations: [MainVideosComponent, ListComponent],
  imports: [
    CommonModule,
    VideosRoutingModule,
    TranslateModule,
    MediaModule
  ]
})
export class VideosModule { }
