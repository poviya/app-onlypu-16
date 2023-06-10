import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPostsComponent } from './main-posts/main-posts.component';

const routes: Routes = [
  {
    path: '',
    component: MainPostsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
