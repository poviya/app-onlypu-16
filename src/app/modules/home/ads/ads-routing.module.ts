import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ShowHomeComponent } from './show-home/show-home.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: ':categorySlug', component: MainComponent},
  { path: ':categorySlug/:stateCitySlug',component: MainComponent},
  { path: ':categorySlug/:stateCitySlug/:cityZoneSlug', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
