import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-manage',
  templateUrl: './main-manage.component.html',
  styleUrls: ['./main-manage.component.scss']
})
export class MainManageComponent implements OnInit {

  showButton = false;
  scrollHeight = 400;
  
  isBrowser: boolean = false;
  isServer: boolean = false;
  idPost: string | null;

  constructor(
      private activatedRoute: ActivatedRoute,
      @Inject(PLATFORM_ID) private platformId: Object,
      @Inject(DOCUMENT) private document: Document,
      ) {

      this.idPost = this.activatedRoute.snapshot.paramMap.get('id');
      if (isPlatformBrowser(this.platformId)) {
        this.isBrowser = true;
      }
      if (isPlatformServer(this.platformId)) {
      
      }
   }

  ngOnInit(): void {
    this.onScrollTop();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
   const yOffset = window.pageYOffset;
   const scrollTop = this.document.documentElement.scrollTop;
   this.showButton = (yOffset || scrollTop) > this.scrollHeight;

  }
  onScrollTop() : void {
    this.document.documentElement.scrollTop = 0;
  }

}