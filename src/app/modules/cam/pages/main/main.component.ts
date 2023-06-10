import { isPlatformBrowser, isPlatformServer, Location } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cam } from 'src/app/interfaces';
import { CamService } from 'src/app/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isBrowser: boolean;
  isServer: boolean;
  roomID: string | null;
  cam: Cam;

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: object,
    private camService: CamService,
    private location: Location
  ) {

    this.roomID = this.activeRoute.snapshot.queryParamMap.get('roomID');
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
      //localStorage.setItem('saludo', 'HOla');
    }
  }

  ngOnInit(): void {

    const link = window.location.origin +
      window.location.pathname +
      '?roomID=' +
      this.roomID;

    console.log(link);
    this.findOneRoom();
  }

  findOneRoom() {
    if (this.roomID) {
      this.camService.findOneRoom(this.roomID).subscribe(res => {
        if (res) {
          this.cam = res;
        }
      })
    } else {
      this.location.back();
    }
  }
}
