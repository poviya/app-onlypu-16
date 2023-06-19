import { DOCUMENT, isPlatformBrowser, isPlatformServer, Location } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cam, Membership, Money, PaymentOrder, Post, PostMedia, Suscription, User } from 'src/app/interfaces';
import { AuthService, ErrorHandlerService, MoneyService, PaymentOrderService, PostService, TipService, UserService } from 'src/app/services';
import { Tools } from 'src/app/common/tools';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  width = 'max-w-5xl';
  showButton = false;
  scrollHeight = 400;

  loadingUser: boolean = false;
  loadingPosts: boolean = false;
  loadingPhotos: boolean = false;
  loadingVideos: boolean = false;

  isBrowser: boolean;
  isServer: boolean;
  user: User;
  membership: Membership[];
  suscription: Suscription;
  posts: Post[];
  postsMedia: PostMedia[];
  count: any;

  slug: null | string;
  money: Money;
  paymentOrder: PaymentOrder;
  errorMessage: string = '';
  currentUser: boolean = false;

  postMediaRecent: PostMedia[] = [];

  dataTip: object;

  constructor(
    private meta: Meta,
    private title: Title,
    public router: Router,
    private userService: UserService,
    public authService: AuthService,
    private activeRoute: ActivatedRoute,
    private paymentOrderService: PaymentOrderService,
    private postService: PostService,
    private moneyService: MoneyService,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document,
    private tipService: TipService,
    private dialogService: DialogService,
    private location: Location
  ) {
    
    let fragmento = this.location.path().split('?')[0];
    const parts = fragmento.split('/');
    fragmento = parts[1];
    const value = fragmento.substr(fragmento.lastIndexOf('/') + 1);
    this.slug = value;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    };
    this.findOne()
    this.onScrollTop();
    //this.findOneMoney();
  }

  obtenerParametro(): void {
    this.activeRoute.queryParamMap.subscribe((params) => {
      this.slug = params.get('fbclid');
      if (this.slug) {
        this.slug = this.slug.split('?')[0]; // Obtener solo "leysi" eliminando el resto de la URL
      }
    });
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event) {
    if (document.domain === 'onlypu.com') {
      event.preventDefault(); // Evita la acción predeterminada del clic derecho
      // Aquí puedes agregar cualquier lógica adicional que desees ejecutar cuando se detecte el clic derecho
    }
  }
  
  findOne() {
    this.loadingUser = true;
    this.loadingPosts = true;
    const data = {
      'username': this.slug,
      'Site': environment.site
    }
    // this.userService.slug(data)
    // .subscribe({
    //   next: (res) => this.user = res,
    //   error: (err: HttpErrorResponse) => {
    //     this.errorHandler.handleError(err);
    //     this.errorMessage = this.errorHandler.errorMessage;
    //   }
    // })

    if (this.authService.user) {
      this.userService.slugOnlypuAuth(data).subscribe(res => {
        if (res) {
          this.user = res!.user;
          this.suscription = res!.suscription;
          this.count = res!.count;
          if (this.authService.user._id == this.user._id) {
            this.currentUser = true;
          }
          this.headPage(this.user);
          this.loadingUser = false;
          //this.findAllPostUser(res._id!);
        } else {
          //this.router.navigate(['/panel/setting']);
        }
      }, (err) => {
        //this.errorHandler.handleError(err);                  //Error callback
        console.log(err.status)
        //this.errorMessage = error;

        //throw error;   //You can also throw the error to a global error handler
      });
    } else {
      this.userService.slugOnlypu(data).subscribe(res => {
        if (res) {
          this.user = res!.user;
          this.suscription = res!.suscription;
          this.count = res!.count;
          this.loadingUser = false;
          this.headPage(this.user);
          //this.findAllPostUser(res._id!);
        } else {
          //this.router.navigate(['/panel/setting']);
        }
      }, (err) => {
        //this.errorHandler.handleError(err);                  //Error callback
        console.log(err.status)
        //this.errorMessage = error;

        //throw error;   //You can also throw the error to a global error handler
      });
    }
  }

  prinImages(images: any) {
    return images[0]['url'];
  };



  innerText(text: any) {
    if (text)
      return Tools.innerText(text);
  }

  findOneMoney() {
    const moneyId = '6353f7d040fda4ba1d240de0';   // USD
    this.moneyService.findOne(moneyId).subscribe(res => {
      if (res.ok == true) {
        this.money = res.data;
      }
    })
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffset || scrollTop) > this.scrollHeight;

  }
  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  // ++++++++++ recent photos
  findRecentPhotosUser(userId: string) {
    this.postService.findRecentPhotosUser(userId).subscribe(res => {
      if (res) {
        this.postMediaRecent = res;
      }
    })
  }


  // modal
  get modalDelete() {
    return this.dialogService.modalDelete;
  }

  closeModalDelete() {
    this.dialogService.toogleDelete();
  }

  get modalTip() {
    return this.dialogService.modalTip;
  }

  closeModalTip() {
    this.dialogService.toogleTip();
  }

  onTipDialog(post: Post) {
    this.dialogService.toogleTip();
    this.dataTip = {
      type: 'tip_post',
      post: post,
      user: post.User
    };

    this.tipService.create(this.dataTip);
  }

  /************************ SEO  *****************/
  headPage(user: User) {
    const data = {
      title: user.username!,
      description: user.bio!,
      url: `https://onlypu.com/${user.username}`,
      image: user.Profile?.length! > 0 ? user.Profile![0].url! : 'https://onlypu.com/assets/logo/seo2.jpg'
    }

    this.title.setTitle(data.title);

    this.meta.addTag({ name: "title", content: data.title! });
    this.meta.addTag({ name: "description", content: data.description! });

    this.meta.addTag({ property: "og:type", content: "website" });
    this.meta.addTag({ property: "og:url", content: data.url });
    this.meta.addTag({ property: "og:title", content: data.title! });
    this.meta.addTag({ property: "og:description", content: data.description! });
    this.meta.addTag({ property: 'og:image', content: data.image });

    this.meta.addTag({ property: 'twitter:card', content: 'summary' });
    this.meta.addTag({ property: 'twitter:url', content: data.url });
    //this.meta.addTag({property: 'twitter:site', content: '@AngularUniv'});
    this.meta.addTag({ property: 'twitter:title', content: data.title! });
    this.meta.addTag({ property: 'twitter:description', content: data.description! });
    this.meta.addTag({ property: 'twitter:image', content: data.image });
  }
}
