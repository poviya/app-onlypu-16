import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, AuthService, PostAdService, PostService, TelegramBotService, ToolsService } from 'src/app/services';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostAdCategory } from 'src/app/interfaces/adCategory';
import { CountryState } from 'src/app/interfaces/countryState';
import { StateCity } from 'src/app/interfaces/stateCity';
import { AdCategoryService } from 'src/app/services/post-ad-category.service';
import { CountryStateService } from 'src/app/services/country-state.service';
import { StateCityService } from 'src/app/services/state-city.service';
import { CityZone } from 'src/app/interfaces/cityZone';
import { CityZoneService } from 'src/app/services/city-zone.service';
import { Tools } from 'src/app/common/tools';
import { metaTags, Post, Suscription } from 'src/app/interfaces';
import { iif } from 'rxjs';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { ToastService } from 'src/app/library/toast/toast.service';
import { environment } from 'src/environments/environment';


import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({ transform: 'scale(0.5)' }),
        animate('150ms', style({ transform: 'scale(1)' }))
      ]),
      transition('void => visible', [
        style({ transform: 'scale(1)' }),
        animate('150ms', style({ transform: 'scale(0.5)' }))
      ]),
    ]),
    trigger('animation2', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('50ms', style({ opacity: 0.8 }))
      ])
    ])
  ]
})
export class ListComponent implements OnInit {

  @Input() slug: string | null;

  dataStory: any;
  dataPost: Post;

  loading = false;
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;

  alSub: any;

  showButton = false;
  scrollHeight = 400;

  date: any;
  isBrowser: boolean;
  isServer: boolean;

  @Input() countryCode: any;
  @Input() categorySlug: any;
  @Input() countryStateSlug: any;
  @Input() stateCitySlug: any;
  @Input() cityZoneSlug: any;
  searchText = 'search';
  @Input() search: any;
  dataSearch: any;

  data: any;
  dataTip: any;
  postName: any;
  posts: any = [];
  totalPages: 0;
  currentPage = 0;
  limitPage = 20;
  observer: any;

  registroFormGroup: FormGroup;
  adCategories: PostAdCategory[];
  countryStates: CountryState[];

  stateCitiesAll: StateCity[];
  stateCitiesOnly: StateCity[];
  stateCitiesRest: StateCity[];
  swStateCitiesOnly = false;

  cityZones: CityZone[];
  swCityZones = true;

  bodyText: string;
  metaTags: metaTags;
  public safeURL: SafeResourceUrl;

  postLoading: string[] = ["hola", "que", "tal", "hola", "que", "tal"];

  suscription: Suscription;
  //
  showCount = false;
  private element: any;
  previewImage = false;
  showMask = false;
  currentLinghtboxImage: any;
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;

  constructor(
    private meta: Meta,
    private title: Title,
    public router: Router,
    private toolsService: ToolsService,
    @Inject(PLATFORM_ID) private platformId: object,
    private activeRoute: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private adCategoryService: AdCategoryService,
    private countryStateService: CountryStateService,
    private stateCityService: StateCityService,
    private cityZoneService: CityZoneService,
    @Inject(DOCUMENT) private document: Document,
    private appService: AppService,
    private _sanitizer: DomSanitizer,
    private dialogService: DialogService,
    private telegramBotService: TelegramBotService,
    private toastService: ToastService,
    private el: ElementRef,
    public authService: AuthService,
  ) {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/767046013?h=edafcd7ab5');
    this.date = new Date();

    this.search = this.activeRoute.snapshot.queryParamMap.get('search');
    this.countryCode = this.router.url.split('/')[1];
    this.categorySlug = this.activeRoute.snapshot.paramMap.get('categorySlug'); //this.router.url.split('/')[2]; 
    this.countryStateSlug = this.activeRoute.snapshot.paramMap.get('countryStateSlug');
    this.stateCitySlug = this.activeRoute.snapshot.paramMap.get('stateCitySlug');
    this.cityZoneSlug = this.activeRoute.snapshot.paramMap.get('cityZoneSlug');

  }

  ngOnInit(): void {


    //this.isBrowser = isPlatformBrowser(platformId);
    //this.isServer = isPlatformServer(this.platformId);

    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
      this.intersectionObserver();
    }

    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    }

    this.findMedia();

  }

  ngAfterViewInit(): void {
    this.theLastList.changes.subscribe((d) => {
      if (d.last) this.observer.observe(d.last.nativeElement);
    });
  }

  // categoriesCountry()
  // {
  //   const data = {
  //     Country: this.toolsService.country._id,
  //   };
  //   this.adCategoryService.findAllCountry(data).subscribe(res => {
  //     this.adCategories = res;  //console.log(res);
  //   });
  // }

  async findMedia() {

    this.loading = true;


    if (this.authService.user) {
      this.data = {
        'username': this.slug,
        'type': 'image',
        'User': this.authService.user._id,
        'Site': environment.site,
      }
    } else {
      this.data = {
        'username': this.slug,
        'Site': environment.site,
        'type': 'image',
      }
    }

    this.alSub = this.postService.findAllUserMedia(this.data, this.limitPage, this.currentPage).subscribe(res => {
      if (res) {
        this.suscription = res.suscription;
        this.totalPages = res.totalPages;
        this.dataSearch = res.dataSearch;
        this.postName = res.postName;

        this.headPage(this.postName);
        res.data.forEach((element: any) => {
          this.posts.push(element);
        });
      }
      this.loading = false;
    });

  }

  findAllAdsInfinite() {
    this.data = {
      'username': this.slug,
      'type': 'image',
      'Site': environment.site
    }
    this.alSub = this.postService.findAllUserMediaInfinite(this.data, this.limitPage, this.currentPage).subscribe(res => {
      res.data.forEach((element: any) => {
        this.posts.push(element);
      });
    });
  }

  findAllQueryCategories() {
    const data = {
      categorySlug: this.categorySlug
    };

    this.adCategoryService.findAllCountry(data).subscribe(res => {
      this.adCategories = res;
    });
  }

  findAllQueryCountryState() {
    this.countryStateService.findAllCountry('').subscribe(res => {
      this.countryStates = res;  //console.log(res);
    });
  }

  // showing all the cites of the country
  findAllCountryCity() {
    // const data = {
    //   Country: this.toolsService.country()._id,
    // };
    // this.stateCityService.findAllCountry(data).subscribe(res => {
    //   this.stateCitiesAll = res;  //console.log(res);
    //   this.defaultStateCity();
    // });
  }

  // showing all te cihtes of the country
  findAllStateCity(data: any) {
    this.cityZoneService.findAllStateCity(data).subscribe(res => {
      this.cityZones = res;  //console.log(res);
      if (this.cityZones.length > 0) {
        this.swCityZones = false;
      } else {
        this.swCityZones = true;
        this.registroFormGroup.patchValue({
          cityZoneSlug: ''
        });
      }
    });
  }

  onCountryState(e: any): void {

    if (this.registroFormGroup.value.countryStateSlug !== '') {
      let CountryState;

      for (let item of this.countryStates) {
        if (item.slug == e.target.value) {
          CountryState = item._id;
        }
      }

      const data = {
        CountryState: CountryState
      };
      this.stateCityService.findAllCountryState(data).subscribe(res => {
        this.stateCitiesOnly = res;

        if (this.stateCitiesOnly.length == 1) {
          this.swStateCitiesOnly = false;
          this.registroFormGroup.patchValue({
            stateCitySlug: this.stateCitiesOnly[0].slug
          });
        } else {
          this.swStateCitiesOnly = true;
          this.registroFormGroup.patchValue({
            stateCitySlug: ''
          });
        }

        this.stateCitiesRest = this.stateCitiesAll;

        for (let item of this.stateCitiesOnly) {
          this.stateCitiesRest = this.stateCitiesRest.filter((item2) => item2._id !== item._id);
        }
      });
    } else {
      this.registroFormGroup.patchValue({
        stateCitySlug: ''
      });
    }
  }

  defaultStateCity() {
    if (this.stateCitySlug) {
      this.queryStetecity(this.stateCitySlug);
    }
  }

  onStateCity(e: any): void {
    if (this.registroFormGroup.value.stateCitySlug !== '') {
      this.queryStetecity(e.target.value);
    } else {
      this.registroFormGroup.patchValue({
        stateCitySlug: ""
      });
    }
  }

  queryStetecity(slug: any) {
    let StateCity;

    for (let item of this.stateCitiesAll) {
      if (item.slug == slug) {
        StateCity = item._id;
      }
    }
    const data = {
      StateCity: StateCity
    };

    this.stateCityService.findOne(StateCity).subscribe(res => {
      this.registroFormGroup.patchValue({
        countryStateSlug: res.CountryState?.slug
      });
    });
    this.findAllStateCity(data);

    //console.log( this.stateCitiesAll);
  }

  onUpdateClick(id: string, clickType: string) {

    const data = {
      Post: id,
      clickType: clickType
    }
    //this.postService.updateClick(data).toPromise();
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
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage = this.currentPage + this.limitPage;
          this.findAllAdsInfinite();
        }
      }
    }, options);
  }

  cropTitle(text: string) {
    return Tools.cropText(text!, 72) + '...';
  }

  prinImages(images: any) {
    return images[0]['url'];
  };

  textMessage(item: Post) {
    // quiero hacerte darte en cuatro
    // quiero besarte toda
    // quiero hacerte genir rico
    // quiero penetrarte rico
    // estoy caliente quiero hacerte rico
    // me gustaría hacer le delicioso contigo
    return "Hola, acabo de ver tu anuncio en Onlypu.com, "
      + Tools.cropText(item.title!, 25) + '(...)' +
      ", quiero hacer el delicioso contigo."
      + " https://onlypu.com/pu/" + item.slug;
  }

  /************************ SEO  *****************/
  headPage(postName: any) {
    const data = {
      title: `Escorts, Swingers, Transvestites, Acompanhantes, videollamadas, Call, Massagens, Encontros Casuais    ` + `- Onlypu`,
      description: "Search and publish free erotic ads, escort and whore classifieds, gay escort ads, swingers and transvestites in Onlypu.com",
      url: "https://onlypu.com/bolivia/escorts",
      image: 'https://onlypu.com/assets/logo/seo.jpg'
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


  innerText(text: any) {
    return Tools.innerText(text);
  }

  postMedia(item: any) {
    return item.slice(0, 3);
  }

  onCategory(countryCode: string, categorySlug: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([countryCode + '/' + categorySlug]);
  }

  /***************MODAL */
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
  }

  copyText(post: Post) {
    const textToCopy = " https://onlypu.com/pu/" + post.slug;
    navigator.clipboard.writeText(textToCopy).then(() => {
      this.toastService.start('copied_link');
      setTimeout(() => this.toastService.close(), 2000);
      console.log('El texto ha sido copiado al portapapeles');
    }, (err) => {
      console.error('Error al copiar el texto al portapapeles: ', err);
    });
  }


  /****** lightbox */

  onPreviewImage(index: number): void {

    // show immage
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLinghtboxImage = this.posts[index];
    this.showCount = true;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.previewImage = false;
    }
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState == 'void') {
      this.showMask = false;
    }
  }

  onClosePreview() {
    this.previewImage = false;
  }

  next(): void {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex > this.posts!.length - 1) {
      this.currentIndex = 0;
    }

    this.currentLinghtboxImage = this.posts![this.currentIndex];
  }

  prev(): void {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.posts!.length - 1;
    }

    this.currentLinghtboxImage = this.posts![this.currentIndex];
  }

  onCloseLightbox(): void {
    this.previewImage = false;
  }
}
