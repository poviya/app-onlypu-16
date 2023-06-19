import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToolsService } from './services/tools.service';
//import { PushNotificationService } from './services/push-notification.service';
import { SwPush, SwUpdate } from '@angular/service-worker'
import { environment } from 'src/environments/environment';
import { SpinnerModule } from './library/spinner/spinner.module';
import { SpinnerService } from './library/spinner/spinner.service';
import { ToastService } from './library/toast/toast.service';
import { DialogService } from './library/dialog/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading = false;
  mesaggeReceived: string | undefined;

  title = 'app-onlypu';
  isBrowser: boolean;
  langs: string[] = [];
  langsArray = ['en', 'es', 'fr', 'pt_BR'];

  PUBLIC_VAPID_KEY_OF_SERVER = "BL15IIlEGEf11OLcGL16ixHfMuv7n2ROWzJtpS4a42TEafL1sdlUxnRxG47yGPA8gMW9OVHe00iQ1oqExx1MDj4";

  constructor(
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    // private notificacion: PushNotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toolsService: ToolsService,
    private translate: TranslateService,
    private toastService: ToastService,
    private spinnerService: SpinnerService) {



    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
      if (this.toolsService.language()) {
        const lang = this.toolsService.language();
        this.translate.setDefaultLang(lang!);
        this.translate.use(lang!);
      } else {
        const langNavigator = window.navigator.language;
        const langArray = langNavigator.split('-');
        if (this.langsArray.includes(langArray[0])) {
          this.toolsService.languageCreate(langArray[0]);
          this.translate.setDefaultLang(langArray[0]);
          this.translate.use(langArray[0]);
        } else {
          this.toolsService.languageCreate('en');
          this.translate.setDefaultLang('en');
          this.translate.use('en');
        }
      }
      this.translate.addLangs(this.langsArray);
      this.langs = this.translate.getLangs();

      if (environment.production == true) {
        this.subscribeToPush();
      }
    }

    if (isPlatformServer(this.platformId)) {

    }


  }

  ngOnInit0(): void {
    /*
    this.notificacion.receiveMessage().subscribe(payload => {
      console.log(payload);
      this.mesaggeReceived = payload.notification.title;
    });
    */

    this.swUpdate.available.subscribe(event => {

      console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
      //let snackBarRef = this.snackBar.open('Newer version of the app is available', 'Refresh');

    });
  }

  ngOnInit() {
    // this.swUpdate.available
    //   .subscribe(() => {
    //     this.swUpdate.activateUpdate()
    //       .then(() => document.location.reload());
    //   });
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  private async subscribeToPush() {
    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: this.PUBLIC_VAPID_KEY_OF_SERVER,
      });
      const token = JSON.parse(JSON.stringify(sub));
      console.log('PUSH', token);
    } catch (err) {
      console.error('Could not subscribe due to:', err);
    }
  }


  load(): void {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 2000);
  }

  async wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  get loading() {
    return this.spinnerService.spinner;
  }

  start() {
    this.isLoading = this.spinnerService.spinner;

    //this.isLoading = true;
    //this.wait(2000).then( () => this.isLoading = false );
  }

  get loadingToast() {
    return this.toastService.toast;
  }

}
