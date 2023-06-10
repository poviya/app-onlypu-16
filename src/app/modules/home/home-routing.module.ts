import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

const routes = [

  { 
    path: '',
    component: MainComponent,
    //loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule )
  },
//{
      /*
      { 
        path: 'bolivia',
        loadChildren: () => import('./ads/ads.module').then( m => m.AdsModule )
      },
      { 
        path: 'mexico/escorts',
        loadChildren: () => import('./ads/ads.module').then( m => m.AdsModule )
      },
      
      { 
        path: 'travestis',
        loadChildren: () => import('./ads/ads.module').then( m => m.AdsModule )
      },

      { 
        path: 'escorts-masculinos',
        loadChildren: () => import('./ads/ads.module').then( m => m.AdsModule )
      },

      { 
        path: 'encuentros',
        loadChildren: () => import('./ads/ads.module').then( m => m.AdsModule )
      },
      */
      // end category ads
      
      //{ path: '**', redirectTo: ''}
    
  //}
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }
