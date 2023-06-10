import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: 'details', component: MainComponent },
  { path: 'details/:id', component: MainComponent},
  // {path:'about/:sn/:lecturer', component: AboutComponent}
  { path: '**', redirectTo:'details'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatedPostRoutingModule { }
