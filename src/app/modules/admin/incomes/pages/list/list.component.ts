import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post, TransactionCredit } from 'src/app/interfaces';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { ModalService } from 'src/app/library/modal';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { PostAdService, PostService } from 'src/app/services';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() transactionCredits: TransactionCredit[] = []; 
  transactionCredit: Post;

  idPost: string;
  @Input() loading = false;
  //openTab = 1;  
  @ViewChildren('theLastList', {read: ElementRef})
  theLastList: QueryList<ElementRef>;
  @Output() infiniteEvent = new EventEmitter<string>();
  
  showButton = false;
  scrollHeight = 500;

  alSub: any;
  @Input() totalPages: any;
  @Input() currentPage = 0;
  @Input() limitPage = 0;
  observer: any;

  isBrowser: boolean;
  data: any;
  adCount: any;
  myForm: FormGroup;
  
  bodyText: string;
  postLoading:string[]=["hola","que","tal"];

  constructor(
    private postAdService: PostAdService,
    private postService: PostService,
    private fb: FormBuilder,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private spinnerService: SpinnerService,
    private dialogService: DialogService
  ) {

    this.myForm = this.fb.group({
      search: [null],
    });

    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    
      this.intersectionObserver();
    }

    if (isPlatformServer(this.platformId)) {
    
    } 
    
  }

  ngOnInit(): void {
    //this.findAllPostUser();  //console.log(this.openTab == 1 ? 'ACTIVE' : this.openTab == 2 ? 'INACTIVE' :  '');
    //this.findAllAdsCount();
  }

  ngAfterViewInit() : void
  {
    this.theLastList.changes.subscribe((d) => {
      if(d.last) this.observer.observe(d.last.nativeElement);
    });
  }

  // findAllPostUser()
  // {
  //   this.data = {
  //     search: this.myForm.value.search,
  //     status: this.openTab == 1 ? 'ACTIVE' : 'SUSPENDED'
  //   };
  //   this.loading = true;
  //   this.alSub = this.postAdService.findAllUser(this.data, this.limitPage, this.currentPage).subscribe(res => {
  //     this.totalPages = res.totalPages;
  //     res.data.forEach((element: any) => {
  //       this.transactionCredits.push(element);
  //     });
  //     this.loading = false;
  //   });
  // }

  // findAllPostUserInfinite()
  // {
  //   this.data = {
  //     search: this.myForm.value.search,
  //     status: this.openTab == 1 ? 'ACTIVE' : 'SUSPENDED'
  //   };
    
  //   this.alSub = this.postAdService.findAllUserInfinite(this.data, this.limitPage, this.currentPage).subscribe(res => {
  //     res.data.forEach((element: any) => {
  //       this.transactionCredits.push(element);
  //     });
  //   });
  // }

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
    };
    this.observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
          if(this.currentPage < this.totalPages) {
            this.currentPage = this.currentPage + this.limitPage;
            const data: any = {
              currentPage: this.currentPage
            }
            this.infiniteEvent.emit(data);
            //this.findAllPostUserInfinite();
          }
        }
    }, options);
  }

  findAllAdsCount()
  {
    const data = {
      //search: this.myForm.value.search,
      //status: this.openTab == 1 ? 'ACTIVE' : 'INACTIVE'
    };
    
    this.postAdService.findAllUserCount(data).subscribe(res => {
        this.adCount = res; //console.log(res);
    });
  }

  onSubmit(): void {
    this.totalPages = 0;
    this.currentPage = 0;
    this.transactionCredits = [];
    //this.findAllPostUser();
   
  }

  toggleTabs($tabNumber: number){
    this.router.navigate(['/panel/your-ads/suspended']);
    /*
    this.openTab = $tabNumber;
    this.totalPages = 0;
    this.currentPage = 0;
    this.transactionCredits = [];
    this.findAllPostUser();
    this.myForm.patchValue({
      search: null
    });*/
  }
 
  onEdit(id: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/panel/create-ad/details/' + id]);
  }

  onManage(id: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/panel/create-ad/manage/' + id]);
  }

  onPromote(id: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/panel/create-ad/promote/' + id]);
  }

  onPhotos(id: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/panel/create-ad/media/' + id]);
  }
  
  togglePublished(transactionCredit: Post) {
    
    if(transactionCredit.publishedCount! > 0)
    {
      const data = {
        published: !transactionCredit.published
      }
      transactionCredit.published = !transactionCredit.published;
      this.postAdService.update(transactionCredit._id!, data, {}).subscribe(res => {
      });
    }
  } 

  prinImages(images: any) 
  { 
    if(images[0].type == 'video') {
      return images[0]['urlSnapshot'];
    } else  {
      return images[0]['url'];
    }
    
  };

  onDelete1(): void {
    this.dialogService.toogleDelete();
    this.transactionCredits = this.transactionCredits.filter((item: TransactionCredit) => item._id!.split('.')[0] !== this.idPost);
    console.log(this.transactionCredits);
  }

  onDelete(): void {
    if(!this.transactionCredit)
    return;

    this.spinnerService.start();
    this.dialogService.toogleDelete();
    this.postService.delete(this.transactionCredit._id).subscribe(res => {
      if(res) {
        this.transactionCredits = this.transactionCredits.filter((item: TransactionCredit) => item._id!.split('.')[0] !== this.transactionCredit._id);
        this.spinnerService.close();
        this.transactionCredit = {};
      }
    })
  }

}

