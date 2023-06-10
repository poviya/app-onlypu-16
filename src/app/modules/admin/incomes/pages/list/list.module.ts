import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/library/modal';
import { LoadingModule } from 'src/app/library/loading/loading.module';
import { DialogModule } from 'src/app/library/dialog/dialog.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule,
    LoadingModule,
    DialogModule,
    TranslateModule,
    PipesModule
  ],
  exports: [ListComponent]
})
export class ListModule { }
