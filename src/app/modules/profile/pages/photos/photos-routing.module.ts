import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPhotosComponent } from './main-photos/main-photos.component';

const routes: Routes = [
  {
    path: '',
    component: MainPhotosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
