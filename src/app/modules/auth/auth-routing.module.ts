import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoAuthGuard, AuthGuard } from 'src/app/guards';

import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifiedAccountComponent } from './pages/verified-account/verified-account.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'login', canActivate: [ NoAuthGuard ], component: LoginComponent },
      { path: 'register', canActivate: [ NoAuthGuard ], component: RegisterComponent },
      { path: 'verified-account', canActivate: [ AuthGuard ], component: VerifiedAccountComponent },
      { path: '**', redirectTo: 'login' },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
