import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces';
import { ModalService } from 'src/app/library/modal';
import { PostAdService } from 'src/app/services';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, AfterViewInit {

  idPost: string;
  loading = false;
  openTab = 1;  
  @ViewChildren('theLastList', {read: ElementRef})
  theLastList: QueryList<ElementRef>;

  showButton = false;
  scrollHeight = 500;

  alSub: any;
  totalPages: any;
  currentPage = 0;
  limitPage = 2;
  observer: any;

  isBrowser: boolean;
  data: any;
  posts: any = [];
  adCount: any;
  myForm: FormGroup;
  
  bodyText: string;

  constructor(
    private postAdService: PostAdService,
    private fb: FormBuilder,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private modalService: ModalService,
  ) {

    this.myForm = this.fb.group({
      q: [null],
    });

    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    
      this.intersectionObserver();
    }

    if (isPlatformServer(this.platformId)) {
    
    } 

    if(localStorage.getItem('tab-your-post-ads'))
    {
      this.openTab = Number(localStorage.getItem('tab-your-post-ads'));
    }

    this.findAllPostUser();  //console.log(this.openTab == 1 ? 'ACTIVE' : this.openTab == 2 ? 'INACTIVE' :  '');
    this.findAllAdsCount();
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() : void
  {
    this.theLastList.changes.subscribe((d) => {
      if(d.last) this.observer.observe(d.last.nativeElement);
    });
  }

  findAllPostUser()
  {
    this.data = {
      q: this.myForm.value.q,
      status: this.openTab == 1 ? 'ACTIVE' : 'SUSPENDED'
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

  findAllPostUserInfinite()
  {
    this.data = {
      q: this.myForm.value.q,
      status: this.openTab == 1 ? 'ACTIVE' : 'SUSPENDED'
    };
    
    this.alSub = this.postAdService.findAllUserInfinite(this.data, this.limitPage, this.currentPage).subscribe(res => {
      res.data.forEach((element: any) => {
        this.posts.push(element);
      });
    });
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
            this.findAllPostUserInfinite();
          }
        }
    }, options);
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

  onSubmit(): void {
    this.findAllPostUser();
   
  }

  toggleTabs($tabNumber: number){
    localStorage.setItem('tab-your-post-ads', `${$tabNumber}`);
    this.openTab = $tabNumber;
    this.totalPages = 0;
    this.currentPage = 0;
    this.posts = [];
    this.findAllPostUser();
    this.myForm.patchValue({
      q: null
    });
  }
 
  onEdit(id: string): void {
    this.router.navigate(['/panel/create/details/' + id]);
  }

  onPromote(id: string): void {
    this.router.navigate(['/panel/create/promote/' + id]);
  }

  onPhotos(id: string): void {
    this.router.navigate(['/panel/create/media/' + id]);
  }
  
  togglePublished(post: Post) {
    
    if(post.publishedCount! > 0)
    {
      const data = {
        published: !post.published
      }
      post.published = !post.published;
      this.postAdService.update(post._id!, data, {}).subscribe(res => {
      });
    }
  } 

  prinImages(images: any) 
  { 
    return images[0]['url'];
  };

  openModalDelete(id: string) {
    this.idPost = id;
    this.modalService.open('delete');
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
  
  onActive(item: Post): void {

    if(item)
    { 
      const data = {
        status: 'ACTIVE'
      }
      
      this.postAdService.update(item._id!, data, {}).subscribe(res => {
        if(res)
        {
          this.posts = [];
          this.totalPages = 0;
          this.currentPage = 0;
          
          this.openTab = 1;
          localStorage.setItem('tab-your-post-ads', `${this.openTab}`);
          this.findAllPostUser();
          this.findAllAdsCount();

        }
      });
    }
  }

  onSuspended(item: Post): void {

    if(item)
    { 
      const data = {
        status: 'SUSPENDED'
      }
     
      this.postAdService.update(item._id!, data, {}).subscribe(res => {
        if(res)
        {
          this.posts = [];
          this.totalPages = 0;
          this.currentPage = 0;
          this.openTab = 2;
          localStorage.setItem('tab-your-post-ads', `${this.openTab}`);
          this.findAllPostUser();
          this.findAllAdsCount();
          
        }
      });
    }
  }

  onDelete(): void {
    this.loading = true;
    if(this.idPost)
    { 
      this.postAdService.delete(this.idPost).subscribe(res => {
        if(res)
        {
          this.modalService.close('delete');
          this.idPost = '';
          this.totalPages = 0;
          this.currentPage = 0;
          this.posts = [];
          this.loading = false;
          this.findAllPostUser();
          
        }
      });
    }
  }
}
