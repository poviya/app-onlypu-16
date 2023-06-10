import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      { 
        path: 'dasboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule )
      },
      { 
        path: 'create-ad',
        loadChildren: () => import('./create/created-ad/created-ad.module').then( m => m.CreatedAdModule )
      },
      { 
        path: 'create-post',
        loadChildren: () => import('./create/created-post/created-post.module').then( m => m.CreatedPostModule )
      },
      { 
        path: 'your-ads',
        loadChildren: () => import('./your-ads/your-ads.module').then( m => m.YourAdsModule )
      },
      { 
        path: 'bookmarks',
        loadChildren: () => import('./bookmarks/bookmarks.module').then( m => m.BookmarksModule )
      },
      { 
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then( m => m.SettingModule )
      },
      { 
        path: 'incomes',
        loadChildren: () => import('./incomes/incomes.module').then( m => m.IncomesModule )
      },
      { 
        path: 'payments',
        loadChildren: () => import('./payments/payments.module').then( m => m.PaymentsModule )
      },
      { 
        path: 'withdrawal-money',
        loadChildren: () => import('./withdrawal-money/withdrawal-money.module').then( m => m.WithdrawalMoneyModule )
      },
      { 
        path: 'subscribers',
        loadChildren: () => import('./subscribers/subscribers.module').then( m => m.SubscribersModule )
      },
      { path: '**', redirectTo: 'dasboard' },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
