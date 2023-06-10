import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { MediaComponent } from './pages/media/media.component';
import { MainComponent } from './pages/main/main.component';
import { MainManageComponent } from './pages/manage/main-manage/main-manage.component';
import { MainPromoteComponent } from './pages/promote/main-promote/main-promote.component';

const routes: Routes = [
  // { path: 'details', component: DetailsComponent },
  // { path: 'details/:id', component: DetailsComponent },
  { path: 'media/:id', component: MediaComponent },
  { path: 'promote/:id', component: MainPromoteComponent },
  // { path: '**', redirectTo: 'details' },
  { path: 'details', component: MainComponent },
  { path: 'details/:id', component: MainComponent},
  { path: 'manage/:id', component: MainManageComponent},
  // {path:'about/:sn/:lecturer', component: AboutComponent}
  { path: '**', redirectTo:'details'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatedAdRoutingModule { }
