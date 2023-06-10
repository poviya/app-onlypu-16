import { NgModule, TransferState, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MainComponent } from './modules/pages/main/main.component';

import { ErrorModule } from './modules/error/error.module';
import { ModalModule } from './library/modal';
import { SpinnerModule } from './library/spinner/spinner.module';
import { FooterModule } from './modules/footer/footer.module';
import { CommonModule } from '@angular/common';
import { DialogModule } from './library/dialog/dialog.module';
import { ToastModule } from './library/toast/toast.module';
import { PipesModule } from './pipes/pipes.module';
import { ProductCreditModule } from './modules/product-credit/product-credit.module';
import { TipModule } from './modules/tip/tip.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateBrowserLoaderFactory } from './shared/translate-browser.loader';
import { ServiceWorkerModule } from '@angular/service-worker';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function loadCrucialData() {
  return function() {
    // or use UserService
    return delay(3000);
  }
}

export function delay(delay: number) {
  return function() {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ErrorModule,
    ModalModule,
    SpinnerModule,
    ToastModule,
    FooterModule,
    DialogModule,
    PipesModule,
    ProductCreditModule,
    TipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, 
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
