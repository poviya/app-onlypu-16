import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainVideosComponent } from './main-videos/main-videos.component';

const routes: Routes = [
  {
    path: '',
    component: MainVideosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
