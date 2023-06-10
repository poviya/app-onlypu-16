import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { VerifiedAccountComponent } from './pages/verified-account/verified-account.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, MainComponent, VerifiedAccountComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class AuthModule { }
