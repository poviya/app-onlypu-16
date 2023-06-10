import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Tools } from 'src/app/common/tools';
import { Post } from 'src/app/interfaces';
import { ModalService } from 'src/app/library/modal';
import { PostAdService, ToolsService } from 'src/app/services';
import { BookmarkService } from 'src/app/services/bookmark.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, AfterViewInit{

  loading: boolean = false;

  @ViewChildren('theLastList', {read: ElementRef})
  theLastList: QueryList<ElementRef>;

  alSub: any;

  showButton = false;
  scrollHeight = 500;

  date: any;
  isBrowser: boolean;
  isServer: boolean;

  search: any;
  dataSearch: any;

  data: any;
  posts: any = [];
  totalPages: any;
  currentPage = 0;
  limitPage = 10;
  observer: any;
  
  myForm: FormGroup;
  
  constructor(
    private meta: Meta,
    private title: Title,
    public router: Router,
    private toolsService: ToolsService,
    @Inject(PLATFORM_ID) private platformId: object,
    private activeRoute: ActivatedRoute,
    private postAdService: PostAdService,
    private postBookmarkService: BookmarkService,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private modalService: ModalService,
    
  ) { 
    this.date = new Date();
    this.myForm = this.fb.group({
      search: [null],
    });
  }

  ngOnInit(): void {

    this.search = this.activeRoute.snapshot.queryParamMap.get('search');
    //this.isBrowser = isPlatformBrowser(platformId);
    //this.isServer = isPlatformServer(this.platformId);

    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
      this.findAllAds();
      this.intersectionObserver();
    }

    if (isPlatformServer(this.platformId)) {
      
    }

  }

  ngAfterViewInit() : void
  {
    this.theLastList.changes.subscribe((d) => {
      if(d.last) this.observer.observe(d.last.nativeElement);
    });
  }


  findAllAds()
  {
  
    this.data = {
      
    }
 
    this.loading = true;
    this.alSub = this.postBookmarkService.findAllUser(this.data, this.limitPage, this.currentPage).subscribe(res => {
        console.log(res);
        this.totalPages = res.totalPages;
        res.data.forEach((element: any) => {
          if(res.data)
          {
            this.posts.push(element);
          }
        });
        this.loading = false;
    });
  }

  findAllAdsInfinite()
  {
    this.data = {
      
    }
    this.data.dataSearch = this.dataSearch;
    this.alSub = this.postBookmarkService.findAllUserInfinite(this.data, this.limitPage, this.currentPage).subscribe(res => {
        res.data.forEach((element: any) => {
          if(res.data.Post)
          {
            this.posts.push(element);
          }
        });
    });
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
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

  onScrollDown(): void {
    //console.log('Down')
  }

  intersectionObserver() {
    let options = {
      root: null,//document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 0.5//1.0
    }

    this.observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
          if(this.currentPage < this.totalPages) {
            this.currentPage = this.currentPage + this.limitPage;
            this.findAllAdsInfinite();
          }
        }
    }, options);
  }

  cropTitle(text: string)
  { 
    return Tools.cropText(text!, 72) + '...';
  }

  prinImages(images: any) 
  { 
    return images[0]['url'];
  };

  textMessage(item: Post)
  {
    return "Hola, acabo de ver tu anuncio en Onlypu.com, "
            + Tools.cropText(item.title!, 25) + '(...)' + 
            ", me gustaría hacer le delicioso contigo."
            + " https://onlypu.com/" + item.slug;
  }

  onSubmit(): void {
    this.totalPages = 0;
    this.currentPage = 0;
    this.posts = [];
    this.findAllAds();
   
  }
}

