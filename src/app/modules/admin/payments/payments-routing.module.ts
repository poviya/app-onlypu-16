import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'active',
        loadChildren: () => import('./pages/active/active.module').then( m => m.ActiveModule )
      },
      {
        path: 'suspended',
        loadChildren: () => import('./pages/suspended/suspended.module').then( m => m.SuspendedModule )
      },
      { path: '**', redirectTo: 'active' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
