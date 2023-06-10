import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSuspendedComponent } from './pages/main-suspended/main-suspended.component';

const routes: Routes = [
  {
    path: '',
    component: MainSuspendedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuspendedRoutingModule { }
