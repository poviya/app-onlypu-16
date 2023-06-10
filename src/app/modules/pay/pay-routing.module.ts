import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NotificationComponent } from './pages/notification/notification.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'notification/:id_payment_order', component: NotificationComponent },
      { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule { }
