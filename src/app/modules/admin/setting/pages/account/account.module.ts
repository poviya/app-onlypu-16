import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneComponent } from './pages/phone/phone.component';
import { ColorsComponent } from '../colors/colors.component';
import { UserComponent } from './pages/user/user.component';
import { EmailComponent } from './pages/email/email.component';
import { PasswordComponent } from './pages/password/password.component';
import { PersonalizationComponent } from './pages/personalization/personalization.component';
import { InfoPersonalComponent } from './pages/info-personal/info-personal.component';
import { MainAccountComponent } from './pages/main-account/main-account.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CamComponent } from './pages/cam/cam.component';



@NgModule({
  declarations: [
    PhoneComponent,
    ColorsComponent,
    UserComponent,
    EmailComponent,
    PasswordComponent,
    PersonalizationComponent,
    MainAccountComponent,
    InfoPersonalComponent,
    CamComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PhoneComponent,
    ColorsComponent,
    UserComponent,
    EmailComponent,
    PasswordComponent,
    PersonalizationComponent,
    MainAccountComponent,
    InfoPersonalComponent,
  ]
})
export class AccountModule { }
