import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PostAdService } from 'src/app/services';

@Component({
  selector: 'app-show-active',
  templateUrl: './show-active.component.html',
  styleUrls: ['./show-active.component.scss']
})
export class ShowActiveComponent implements OnInit {

  openTab = 1;  
  isBrowser: boolean;
  adCount: any;

  constructor(
    private postAdService: PostAdService,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;

    }

    if (isPlatformServer(this.platformId)) {
    
    } 
  }

  ngOnInit(): void {
    this.findAllAdsCount();
  }

  findAllAdsCount()
  {
    const data = {
      //q: this.myForm.value.q,
      //status: this.openTab == 1 ? 'ACTIVE' : 'INACTIVE'
    };
    
    this.postAdService.findAllUserCount(data).subscribe(res => {
        this.adCount = res; //console.log(res);
    });
  }

  toggleTabs($tabNumber: number){
    this.router.navigate(['/panel/your-ads/suspended']);
    /*
    this.openTab = $tabNumber;
    this.totalPages = 0;
    this.currentPage = 0;
    this.posts = [];
    this.findAllPostUser();
    this.myForm.patchValue({
      q: null
    });*/
  }
 
}

