import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStartComponent } from './pages/view-start/view-start.component';

const routes: Routes = [
  {
    path: 'access',
    component: ViewStartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
