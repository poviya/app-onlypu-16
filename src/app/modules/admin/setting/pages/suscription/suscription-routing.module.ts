import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSuscriptionComponent } from './pages/main-suscription/main-suscription.component';

const routes: Routes = [
  {
    path: '',
    component: MainSuscriptionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuscriptionRoutingModule { }
