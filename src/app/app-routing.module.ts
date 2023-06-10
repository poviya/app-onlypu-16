import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigGuard } from './guards/config.guard';
import { AuthGuard, NoAuthGuard } from './guards';
import { MainComponent } from './modules/pages/main/main.component';
import { NotFoundComponent } from './modules/error/not-found/not-found.component';
import { InternalServerComponent } from './modules/error/internal-server/internal-server.component';

const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule )
  },
  { 
    path: 'cam',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/cam/cam.module').then( m => m.CamModule )
  },
  {
    path: '',
    component: MainComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '', 
      //   pathMatch: 'full',
      // },
     
      
      /*** Bolivia 1 */
      { 
        path: 'bo', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )
      },
    
      /*** Mexico 2 */
      { path: 'mx', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},
    
      /*** Peru 3 */
      { path: 'pe', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},
    
      /*** Brasil 4 */
      { path: 'br', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},
  
      /*** Argentina 5 */
      { path: 'ar', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},
  
      /*** Uruguay 6*/
      { path: 'uy', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

      /*** Paraguay 7*/
      { path: 'py', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

      /*** Chile 8*/
      { path: 'cl', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

      /*** Ecuador 9*/
      { path: 'ec', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

      /*** Colombia 10*/
      { path: 'co', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

      /*** Venezuela 11*/
      { path: 've', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

      /*** Panama 12*/
      { path: 'pa', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

      /*** Costa Rica 13*/
      { path: 'cr', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

      /*** Guatemala 14*/
      { path: 'guatemala', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

      /*** Republica Dominicana 15*/
      { path: 'republica-dominicana', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

      /*** Estados Unidos 16*/
      { path: 'us', loadChildren: () => import('./modules/home/ads/ads.module').then( m => m.HomeAdsModule )},

        { path: 'error/404', component: NotFoundComponent },
        { path: 'error/500', component: InternalServerComponent }, 
        
        { 
          path: '',
          loadChildren: () => import('./modules/home/posts/posts.module').then( m => m.PostsModule )
        },

        { 
          path: 'search',
          loadChildren: () => import('./modules/search/pages/search-page/search-page.module').then( m => m.SearchPageModule )
        },

        { 
          path: 'videocam',
          loadChildren: () => import('./modules/home/cams/cams.module').then( m => m.CamsModule )
        },

        { 
          path: 'chat',
          loadChildren: () => import('./modules/chat/chat.module').then( m => m.ChatModule )
        },

        { 
          path: 'my/subscribers',
          canActivate: [ AuthGuard ], //ConfigGuard
          loadChildren: () => import('./modules/admin/subscribers/subscribers.module').then( m => m.SubscribersModule )
        },

        { 
          path: 'panel',
          canActivate: [ AuthGuard ], //ConfigGuard
          loadChildren: () => import('./modules/admin/admin.module').then( m => m.AdminModule )
        },
        { 
          path: '',
          //canActivate: [ AuthGuard ],
          loadChildren: () => import('./modules/home/countries/countries.module').then( m => m.HomeCountriesModule )
          //loadChildren: () => import('./modules/home/posts/posts.module').then( m => m.PostsModule )
        },
        { 
          path: 'pu/:slug', // path: 'anuncio/:categorySlug/:stateCitySlug/:slug',
          //canActivate: [ ConfigGuard ],
          loadChildren: () => import('./modules/home/post/post.module').then( m => m.PostModule )
        },

        { 
          path: ':slug',
          loadChildren: () => import('./modules/profile/profile.module').then( m => m.ProfileModule )
        },
    ]
  },
  
  // { 
  //   path: ':slug',
  //   loadChildren: () => import('./modules/profile/profile.module').then( m => m.ProfileModule )
  // },
 
  // { 
  //   path: 'panel',
  //   canActivate: [ AuthGuard ], //ConfigGuard
  //   loadChildren: () => import('./modules/admin/admin.module').then( m => m.AdminModule )
  // },
  /*{ 
    path: 'legal',
    loadChildren: () => import('./modules/legal/legal.module').then( m => m.LegalModule )
  },*/
  { 
    path: 'start',
    loadChildren: () => import('./modules/start/start.module').then( m => m.StartModule )
  },
  { 
    path: 'pay',
    loadChildren: () => import('./modules/pay/pay.module').then( m => m.PayModule )
  },
  { 
    path: 'messages/chat',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./modules/messages/messages.module').then( m => m.MessagesModule )
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
