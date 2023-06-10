import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAllComponent } from './pages/main-all/main-all.component';

const routes: Routes = [
  {
    path: '',
    component: MainAllComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllRoutingModule { }
