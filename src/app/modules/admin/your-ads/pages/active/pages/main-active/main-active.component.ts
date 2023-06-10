import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suscription } from 'src/app/interfaces';
import { PostAdService, SuscriptionService } from 'src/app/services';

@Component({
  selector: 'app-main-active',
  templateUrl: './main-active.component.html',
  styleUrls: ['./main-active.component.scss']
})
export class MainActiveComponent implements OnInit {

  isBrowser: boolean;
  isServer: boolean;
  
  data: any;
  posts: any = [];
  alSub: any;
  totalPages: any;
  currentPage = 0;
  limitPage = 5;
  observer: any;
  loading = false;

  search: any;

  constructor( 
    private activeRoute: ActivatedRoute,
    private postAdService: PostAdService,
    @Inject(PLATFORM_ID) private platformId: object,
    ) {
    this.search = this.activeRoute.snapshot.queryParamMap.get('search');
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    };
   }

  ngOnInit(): void {
    this.findAllPostUser(); 
  }

  findAllPostUser()
  {
    this.data = {
      search: this.search,
      status: 'ACTIVE'
    };
    this.loading = true;
    this.alSub = this.postAdService.findAllUser(this.data, this.limitPage, this.currentPage).subscribe(res => {
      this.totalPages = res.totalPages;
      res.data.forEach((element: any) => {
        this.posts.push(element);
      });
      this.loading = false;
    });
  }

  findAllPostUserInfinite($event: any)
  {
    this.data = {
      search: '',
      status: 'ACTIVE'
    };
    this.currentPage = $event.currentPage;

    this.alSub = this.postAdService.findAllUserInfinite(this.data, this.limitPage, this.currentPage).subscribe(res => {
      res.data.forEach((element: any) => {
        this.posts.push(element);
      });
    });
  }
}