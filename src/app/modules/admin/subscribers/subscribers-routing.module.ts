import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/all/all.module').then( m => m.AllModule )
      },
      {
        path: 'active',
        loadChildren: () => import('./pages/active/active.module').then( m => m.ActiveModule )
      },
      {
        path: 'expired',
        loadChildren: () => import('./pages/expired/expired.module').then( m => m.ExpiredModule )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
