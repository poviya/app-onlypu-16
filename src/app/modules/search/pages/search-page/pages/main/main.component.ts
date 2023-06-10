import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, User } from 'src/app/interfaces';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { UserService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  width = 'max-w-5xl';
  isBrowser: boolean;
  isServer: boolean;
  
  search: string | null;

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: object,

  ) { 
    this.search = this.activeRoute.snapshot.queryParamMap.get('q');
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    };
  }

  ngOnInit(): void {

  }

}
