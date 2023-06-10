import { DOCUMENT } from '@angular/common';
import { Component, Directive, ElementRef, HostListener, Inject, Input, OnInit, Pipe, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post, Bookmark, User, Suscription } from 'src/app/interfaces';
import { AuthService, PostAdService } from 'src/app/services';
import { Tools } from 'src/app/common/tools';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { MemoryStorage } from 'src/app/shared/local-storage';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({transform: 'scale(0.5)'}),
        animate('150ms', style({transform: 'scale(1)'}))
      ]),
      transition('void => visible', [
        style({transform: 'scale(1)'}),
        animate('150ms', style({transform: 'scale(0.5)'}))
      ]),
    ]),
    trigger('animation2', [
      transition(':leave', [
        style({opacity: 1}),
        animate('50ms', style({opacity: 0.8}))
      ])
    ])
  ]
})
export class MainComponent implements OnInit {

  width = 'max-w-5xl';
  
  loading: boolean = false;
  isBrowser: boolean;
  isServer: boolean;

  user: User;
  suscription: Suscription;

  categorySlug: any;  stateCitySlug: any; slug: any;
  countrySlug: any;

  post: Post;
  postBookmarkStatus: boolean = false;
  bookmark: Bookmark;
  showHtml: any;

  //@Input() 
  showCount = false;
  private element: any;
  previewImage = false;
  showMask = false;
  currentLinghtboxImage: any;
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;

  showButton = false;
  scrollHeight = 400;

  constructor(
    private activeRoute: ActivatedRoute,
    private postAdService: PostAdService,
    private meta: Meta,
    private title: Title,
    private sanitizer:DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef,
    private postBookmarkService: BookmarkService,
    private authService: AuthService,  
    @Inject(DOCUMENT) private document: Document,
  ) { 
    this.slug = this.activeRoute.snapshot.paramMap.get('slug');
    this.element = el.nativeElement;

    //this.onScrollTop();
  }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
        this.isBrowser = true;
      // move element to bottom of page (just before </body>) so it can be displayed above everything else
      // document.body.appendChild(this.element);
      // // close modal on background click
      // this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
      //   var target = el.target.className;
      //   if(target.length)
      //   {
      //     var index = target.indexOf('lightbox');
      //     var indexNone = target.indexOf('icon-lightbox-carousel'); 
      //     if (index >= 0 && indexNone < 0) {
      //       this.previewImage = false;
      //     }
      //     //console.log(index)
      //     //console.log(indexNone)
      //   }
      // });
      //console.log(window?.localStorage)
      //console.log(window?.localStorage['user']!);
      //console.log(JSON.parse(localStorage.getItem('user')!));
    }
    if (isPlatformServer(this.platformId)) {
      //localStorage.setItem('saludo', 'HOla');
    }
    
    this.findOneSlug();
    
    //console.log(JSON.parse(localStorage.getItem('user')!))
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event) {
    if (document.domain === 'onlypu.com') {
      event.preventDefault(); // Evita la acción predeterminada del clic derecho
      // Aquí puedes agregar cualquier lógica adicional que desees ejecutar cuando se detecte el clic derecho
    }
  }
  
  textMessage()
  {
    // quiero hacerte darte en cuatro
    // quiero besarte toda
    // quiero hacerte genir rico
    // quiero penetrarte rico
    // estoy caliente quiero hacerte rico
    // me gustaría hacer le delicioso contigo
    return "Hola, acabo de ver tu anuncio en Onlypu.com, "
            + Tools.cropText(this.post.title!, 25) + '(...)' + 
            ",  quiero hacertelo rico."
            + " https://onlypu.com/pu/" + this.post.slug;
  }


  findOneSlug(): void
  {
    this.loading = true;
    let data = {};
    if(!this.authService.user)
    {

      data = {
        "slug": this.slug, 
        //"categorySlug": this.categorySlug,
        //"stateCitySlug": this.stateCitySlug
      };
    } else {
      data = {
        "slug": this.slug, 
        "User": this.authService.user._id
        //"categorySlug": this.categorySlug,
        //"stateCitySlug": this.stateCitySlug
      };
      this.user = this.authService.user;
    }

    this.postAdService.findOneSlug(data).subscribe( res => {
     if(res.post)
     { 
      this.suscription = res.suscription;
      this.post = res.post;  
      this.headPage(this.post);
      if(this.post.type == 'AD') {
        this.countrySlug = res.post.Country.slug;
      }
      this.showHtml = this.sanitizer.bypassSecurityTrustHtml (this.post.description!);
      this.currentLinghtboxImage = this.post.PostMedia![0];
      this.totalImageCount = this.post.PostMedia!.length;

      if(res.bookmark)
      {
        this.bookmark = res.bookmark;
      }

      this.loading = false;
     
     
     } else {
      this.loading = false;
     }
     const data = {
      Country: res.Country,
      StateCity: res.StateCity,
     };
     this.updatePlan(data);
    });
  }

  findBookmarks(data: any) {
    if(this.authService.user)
    {
      var index = data.indexOf(this.authService.user._id);
      if (index >= 0) {
          this.postBookmarkStatus = true;
      }
    }
  }

  addPostBookmark(): void {
    if(this.authService.user)
    {
      const data = {
        Post: this.post._id,
        User: this.authService.user._id
      }
      this.postBookmarkStatus = true;
      /*
      this.postAdService.createBookmark(data).subscribe(res => {
        if(!res) {
          this.postBookmarkStatus = true;
        }
      });
      */
      this.postBookmarkService.create(data).subscribe(res => {
        if(res) {
          this.bookmark = res;
        } else {
          this.postBookmarkStatus = false;
        }
      });
    }
  }

  /// other bookmark
  findOneFavoriteUser(): void {
    
    if(this.authService.user)
    {
      const data = {
        Post: this.post._id,
        User: this.authService.user._id
      }
      this.postBookmarkService.findOneUser(data).subscribe(res => {
        if(res) {
          this.bookmark = res;
        }
      });
    }
    
  }

  deletePostBookmark(): void {
    if(this.authService.user && this.bookmark)
    {
      this.postBookmarkStatus = false;
      /*
      const data = {
        Post: this.post._id,
        User: this.authService.user._id
      }
      
      this.postAdService.deleteBookmark(data).subscribe(res => {
        if(!res) {
          //this.bookmark = {};
          this.postBookmarkStatus = true;
        }
      });
      */
      this.postBookmarkService.delete(this.bookmark._id).subscribe(res => {
        if(res) {
          this.bookmark = {};
        } else {
          this.postBookmarkStatus = true;
        }
      });
    }
  }

  onUpdateClick(id: string, clickType: string) {
    
    const data = {
      Post: id,
      clickType: clickType
    }
   this.postAdService.updateClick(data).toPromise();
  }

   /************************ SEO  *****************/
   headPage(post?: Post) {
    let data;
    data = {
      title: `${post?.title} `,
      description: `${post!.description}`,
      url: `https://onlypu.com/pu/${post!.slug}`,
      image: `${post!.PostMedia!.length > 0 ? post!.PostMedia![0].url : 'https://onlypu.com/assets/logo/seo2.jpg'}`
    }

    this.title.setTitle(data.title);

    this.meta.updateTag({ name: "title", content: data.title! });
    this.meta.updateTag({ name: "description", content: data.description! });

    this.meta.updateTag({ property: "og:type", content: "website" });
    this.meta.updateTag({ property: "og:url", content: data.url });
    this.meta.updateTag({ property: "og:title", content: data.title! });
    this.meta.updateTag({ property: "og:description", content: data.description! });
    this.meta.updateTag({ property: 'og:image', content: data.image });

    this.meta.updateTag({ property: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ property: 'twitter:url', content: data.url });
    //this.meta.addTag({property: 'twitter:site', content: '@AngularUniv'});
    this.meta.updateTag({ property: 'twitter:title', content: data.title! });
    this.meta.updateTag({ property: 'twitter:description', content: data.description! });
    this.meta.updateTag({ property: 'twitter:image', content: data.image });

  }

  innerText(text: any)
  {
    return Tools.innerText(text);
  }


  /****** lightbox */
  onPreviewImage(index: number) : void
  {
   
    // show immage
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLinghtboxImage = this.post.PostMedia![index];
    this.showCount = true;
  }

  onAnimationEnd(event: AnimationEvent )
  {
    if(event.toState == 'void') 
    {
      this.showMask = false;
    }
  }

  onClosePreview()
  {
    this.previewImage = false;
  }

  next(): void {
    this.currentIndex = this.currentIndex + 1;
    if(this.currentIndex > this.post.PostMedia!.length - 1)
    {
      this.currentIndex = 0;
    }

    this.currentLinghtboxImage = this.post.PostMedia![this.currentIndex];
  }

  prev() : void {
    this.currentIndex = this.currentIndex - 1;
    if(this.currentIndex < 0)
    {
      this.currentIndex = this.post.PostMedia!.length - 1;
    }

    this.currentLinghtboxImage = this.post.PostMedia![this.currentIndex];
  }

   /********* UPDATE PLAN */
   updatePlan(data:any)
   {
     this.postAdService.updatePlan(data).subscribe(res => {
       
     });
   }

  /*** */
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
