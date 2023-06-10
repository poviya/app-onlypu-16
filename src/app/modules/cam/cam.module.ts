import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamRoutingModule } from './cam-routing.module';
import { MainCamComponent } from './pages/main-cam/main-cam.component';
import { ExampleComponent } from './pages/example/example.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/library/dialog/dialog.module';
import { ButtonComponent } from './pages/button/button.component';
import { ZegoCloudComponent } from './pages/zego-cloud/zego-cloud.component';
import { MainComponent } from './pages/main/main.component';
import { IncomeComponent } from './pages/income/income.component';


@NgModule({
  declarations: [
    ExampleComponent,
    ButtonComponent,
    ZegoCloudComponent,
    MainComponent,
    IncomeComponent
  ],
  imports: [
    CommonModule,
    CamRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
  ]
})
export class CamModule { }
