import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowComponent } from './pages/show/show.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then( m => m.UsersModule )
      },
      {
        path: 'posts',
        loadChildren: () => import('./pages/post/post.module').then( m => m.PostModule )
      },
      {
        path: 'post-ads',
        loadChildren: () => import('./pages/post-ad/post-ad.module').then( m => m.PostAdModule )
      },
      { path: '**', redirectTo: 'posts' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmarksRoutingModule { }
