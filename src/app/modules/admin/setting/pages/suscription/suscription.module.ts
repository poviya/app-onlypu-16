import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { SuscriptionRoutingModule } from './suscription-routing.module';
import { MainSuscriptionComponent } from './pages/main-suscription/main-suscription.component';
import { PrimarySuscriptionComponent } from './pages/primary-suscription/primary-suscription.component';
import { BundlesSuscriptionComponent } from './pages/bundles-suscription/bundles-suscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    MainSuscriptionComponent,
    PrimarySuscriptionComponent,
    BundlesSuscriptionComponent
  ],
  imports: [
    CommonModule,
    //SuscriptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule
  ],
  exports: [
    MainSuscriptionComponent,
    PrimarySuscriptionComponent,
    BundlesSuscriptionComponent
  ]
})
export class SuscriptionModule { }
