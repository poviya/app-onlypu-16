import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainActiveComponent } from './pages/main-active/main-active.component';

const routes: Routes = [
  {
    path: '',
    component: MainActiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveRoutingModule { }
