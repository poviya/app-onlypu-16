import { AfterViewInit, Component, ElementRef, Inject, OnChanges, OnDestroy, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import MyReactComponent from './myReactComponents';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { AuthService } from 'src/app/services';

// get token
function generateToken(tokenServerUrl: string, userID: string) {
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}

function randomID(len: any) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

@Component({
  selector: 'app-main-cam',
  templateUrl: './main-cam.component.html',
  styleUrls: ['./main-cam.component.scss']
})
export class MainCamComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  public isBrowser: boolean;

  public rootId = 'rootId';

  @ViewChild('root')
  root: ElementRef;


  constructor(
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {


  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
      //localStorage.setItem('saludo', 'HOla');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //this.reactRender()
  }

  ngAfterViewInit() {
    if (this.authService.user) {


      //this.reactRender()
      const roomID = `123456`;//getUrlParams().get('roomID') || randomID(5);

      const userID = `${this.authService.user._id}`;
      const userName = this.authService.user.username;

      // generate token
      generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
        const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          1484647939,
          res.token,
          roomID,
          userID,
          userName
        );
        // create instance object from token
        const zp: any = ZegoUIKitPrebuilt.create(token);

        console.log(
          'this.root.nativeElement',
          this.root.nativeElement.clientWidth
        );
        zp.createScream
        // start the call
        zp.joinRoom({
          container: this.root.nativeElement,
          sharedLinks: [
            {
              name: 'Personal link',
              url:
                window.location.origin +
                window.location.pathname +
                '?roomID=' +
                roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
        });
      });
    }
  }

  ngOnDestroy(): void {
    //this.reactRender();
  }

  private reactRender(): void {

    //const container = document.getElementById(this.rootId);
    //const root = createRoot(container!); // createRoot(container!) if you use TypeScript
    //root.render(React.createElement(MyReactComponent));

    // const root = ReactDOM.createRoot(document.getElementById(this.rootId)!);
    // root.render(
    //   React.createElement(MyReactComponent)
    // );
  }

}
