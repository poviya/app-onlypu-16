import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAccountComponent } from './pages/account/pages/main-account/main-account.component';
import { MainDocumentComponent } from './pages/document/pages/main-document/main-document.component';
import { MainSettingComponent } from './pages/main-setting/main-setting.component';
import { MainPaymentComponent } from './pages/payment/pages/main-payment/main-payment.component';
import { MainSuscriptionComponent } from './pages/suscription/pages/main-suscription/main-suscription.component';

const routes: Routes = [
  
  {
    path: '',
    component: MainSettingComponent,
    children: [
      { 
        path: 'account', 
        component: MainAccountComponent },
      { 
        path: 'suscription', 
        component: MainSuscriptionComponent
      },
      {
        path: 'payment',
        component: MainPaymentComponent
      },
      { 
        path: 'documents', 
        component: MainDocumentComponent 
      },
      { path: '**', redirectTo: 'account' },
    ]
  },
  /*
  { path: 'phone', component: PhoneComponent },
  { path: 'user', component: UserComponent },
  { path: 'email', component: EmailComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'colors', component: ColorsComponent },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
