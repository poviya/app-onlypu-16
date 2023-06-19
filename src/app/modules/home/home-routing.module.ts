import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

const routes = [

  { 
    path: '',
    component: MainComponent,
    //loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule )
  },
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }
