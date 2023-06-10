import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { MainPhotosComponent } from './pages/photos/main-photos/main-photos.component';
import { MainPostsComponent } from './pages/posts/main-posts/main-posts.component';
import { MainVideosComponent } from './pages/videos/main-videos/main-videos.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/posts/posts.module').then( m => m.PostsModule )
      },
      {
        path: 'photos',
        loadChildren: () => import('./pages/photos/photos.module').then( m => m.PhotosModule )
      },
      {
        path: 'videos',
        loadChildren: () => import('./pages/videos/videos.module').then( m => m.VideosModule )
      },
      //{ path: '**', redirectTo: '' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
