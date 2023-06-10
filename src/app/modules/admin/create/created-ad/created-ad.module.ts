import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatedAdRoutingModule } from './created-ad-routing.module';

import { DetailsComponent } from './pages/details/details.component';
import { MediaComponent } from './pages/media/media.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CropImageComponent } from './pages/crop-image/crop-image.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './pages/header/header.component';
import { MenuCreateModule } from '../menu-create/menu-create.module';
import { Details0Component } from './pages/details0/details.component';
import { AudioRecordingService } from 'src/app/services';
import { MainManageComponent } from './pages/manage/main-manage/main-manage.component';
import { DetailsManageComponent } from './pages/manage/details-manage/details-manage.component';
import { DialogModule } from 'src/app/library/dialog/dialog.module';
import { MainPromoteComponent } from './pages/promote/main-promote/main-promote.component';
import { ListPromoteComponent } from './pages/promote/list-promote/list-promote.component';

@NgModule({
  declarations: [
    Details0Component,
    DetailsComponent,
    MediaComponent,
    CropImageComponent,

    MainComponent,
    HeaderComponent,
    MainManageComponent,
    DetailsManageComponent,
    MainPromoteComponent,
    ListPromoteComponent,
    
  ],
  imports: [
    CommonModule,
    CreatedAdRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MenuCreateModule,
    DialogModule
  ],
  providers: [{ provide: 'isBrowser', useValue: true }, AudioRecordingService],
})
export class CreatedAdModule { }
