import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainExpiredComponent } from './pages/main-expired/main-expired.component';

const routes: Routes = [
  {
    path: '',
    component: MainExpiredComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpiredRoutingModule { }
