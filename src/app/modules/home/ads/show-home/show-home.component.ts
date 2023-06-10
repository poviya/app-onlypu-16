import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, PostAdService, ToolsService } from 'src/app/services';

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
import { ModalService } from '../../../../library/modal';
import { metaTags, Post } from 'src/app/interfaces';
import { iif } from 'rxjs';

@Component({
  selector: 'app-show-home',
  templateUrl: './show-home.component.html',
  styleUrls: ['./show-home.component.scss']
})
export class ShowHomeComponent implements OnInit, AfterViewInit {

  width = 'max-w-5xl';

  dataStory: any;
  dataPost: Post;

  loading = false;
  @ViewChildren('theLastList', {read: ElementRef})
  theLastList: QueryList<ElementRef>;

  alSub: any;

  showButton = false;
  scrollHeight = 400;

  date: any;
  isBrowser: boolean;
  isServer: boolean;

  countryCode:any;
  categorySlug: any;
  countryStateSlug: any;
  stateCitySlug: any;
  cityZoneSlug: any;
  searchText = 'search';
  search: any;
  dataSearch: any;

  data: any;
  postName: any;
  posts: any = [];
  postStories: any = [];
  totalPages: 100;
  currentPage = 0;
  limitPage = 6;
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

  postLoading:string[]=["hola","que","tal"];

  constructor(
    private meta: Meta,
    private title: Title,
    public router: Router,
    private toolsService: ToolsService,
    @Inject(PLATFORM_ID) private platformId: object,
    private activeRoute: ActivatedRoute,
    private postAdService: PostAdService,
    private fb: FormBuilder,
    private adCategoryService: AdCategoryService,
    private countryStateService: CountryStateService,
    private stateCityService: StateCityService,
    private cityZoneService: CityZoneService,
    @Inject(DOCUMENT) private document: Document,
    private modalService: ModalService,
    private appService: AppService,
    private _sanitizer: DomSanitizer
  ) { 
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/767046013?h=edafcd7ab5');
    this.date = new Date();

    this.search = this.activeRoute.snapshot.queryParamMap.get('search');
    this.countryCode =  this.router.url.split('/')[1];
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
   

   
    /*if(this.countryCode !== '') //&& this.countryCode !== 'all'  || this.toolsService.country
    {
      this.findAllAdsCountry();
      //this.updatePlan();
    } else {
      // this.findAllAds(); 
      // this.headPage();
    }
    */
    // this.headPage();
    //this.findAllAds(); 
    //this.appCountries();

    this.findAllAdsCountry();
    
  }

  ngAfterViewInit() : void
  {
    this.theLastList.changes.subscribe((d) => {
      if(d.last) this.observer.observe(d.last.nativeElement);
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

  async findAllAdsCountry()
  {
      
      this.loading = true;

      this.data = {
        countryCode: this.countryCode,
        categorySlug: this.categorySlug,
        stateCitySlug: this.stateCitySlug,
        
      }
      if(this.search)
      {
        this.data.search = this.search;
      }
      
      this.alSub = this.postAdService.findAllSearch(this.data, this.limitPage, this.currentPage).subscribe(res => {
          //this.postName = res.name;
          //this.posts = res.data;  
          //console.log(this.postName);
          this.postStories = res.dataStories; //console.log(this.postStories)
          this.totalPages = res.totalPages;
          this.dataSearch = res.dataSearch;
          this.postName = res.postName;
          //this.headPageCountry(this.postName);
          res.data.forEach((element: any) => {
            this.posts.push(element);
          });
          this.loading = false;
          
      });
    
  }

  async findAllAds()
  {
    if (isPlatformBrowser(this.platformId))
    {
      this.data = {};
      this.postName = {};
      this.loading = true;
     
      const dataAdCategories = await this.appService.appAdCategoriesfindAll().toPromise();
      const resAdCategory = dataAdCategories!.find( category => category.type === 'ESCORTS' );
      this.categorySlug = resAdCategory?.slug;
      this.adCategories = dataAdCategories!.filter( category => category.active === true);

      this.data.PostAdCategory = resAdCategory!._id;
      this.postName.PostAdCategory = resAdCategory?.name;

      this.countryCode = 'all';

      this.alSub = this.postAdService.findAllSearch(this.data, this.limitPage, this.currentPage).subscribe(res => {
        console.log(res);
        //this.postName = res.name;
        //this.posts = res.data;  
        this.postStories = res.dataStories; //console.log(this.postStories)
        this.totalPages = res.totalPages;
        this.dataSearch = res.dataSearch;
        //this.headPageCountry(this.postName);
        res.data.forEach((element: any) => {
          this.posts.push(element);
        });
        this.loading = false;
        
    });
    }
  }

  findAllAdsInfinite()
  {
    if(this.search)
    {
      this.data.search = this.search;
    }

    this.alSub = this.postAdService.findAllSearchInfinite(this.data, this.limitPage, this.currentPage).subscribe(res => {
        res.data.forEach((element: any) => {
          this.posts.push(element);
        });
    });
  }

  findAllQueryCategories()
  {
    const data = {
      categorySlug: this.categorySlug  
    };

    this.adCategoryService.findAllCountry(data).subscribe(res => {
      this.adCategories = res;
    });
  }

  findAllQueryCountryState()
  {
    this.countryStateService.findAllCountry('').subscribe(res => {
      this.countryStates = res;  //console.log(res);
    });
  }

  // showing all the cites of the country
  findAllCountryCity()
  {
    // const data = {
    //   Country: this.toolsService.country()._id,
    // };
    // this.stateCityService.findAllCountry(data).subscribe(res => {
    //   this.stateCitiesAll = res;  //console.log(res);
    //   this.defaultStateCity();
    // });
  }

  // showing all te cihtes of the country
  findAllStateCity(data: any)
  {
    this.cityZoneService.findAllStateCity(data).subscribe(res => {
      this.cityZones = res;  //console.log(res);
      if(this.cityZones.length > 0) {
        this.swCityZones = false;
      } else {
        this.swCityZones = true;
        this.registroFormGroup.patchValue({
          cityZoneSlug: ''
        });
      }
    });
  }

  onCountryState(e:any): void {

    if(this.registroFormGroup.value.countryStateSlug !== '')
    {
      let CountryState;

      for(let item of  this.countryStates)
      {
        if(item.slug == e.target.value)
        {
          CountryState = item._id;
        }
      }

      const data = {
        CountryState: CountryState
      };
      this.stateCityService.findAllCountryState(data).subscribe(res => {
        this.stateCitiesOnly = res;
        
        if(this.stateCitiesOnly.length == 1)
        {
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

        for(let item of  this.stateCitiesOnly)
        {
          this.stateCitiesRest =  this.stateCitiesRest.filter((item2) => item2._id !== item._id);
        }
      });
    } else {
      this.registroFormGroup.patchValue({
        stateCitySlug: ''
      });
    }
  }

  defaultStateCity()
  {
    if(this.stateCitySlug)
    {
      this.queryStetecity(this.stateCitySlug);
    }
  }

  onStateCity(e:any): void {
    if(this.registroFormGroup.value.stateCitySlug !== '')
    {
        this.queryStetecity(e.target.value);
    } else {
      this.registroFormGroup.patchValue({
        stateCitySlug: ""
      });
    }
  }

  queryStetecity(slug: any)
  {
    let StateCity;
    
    for(let item of  this.stateCitiesAll)
    {
      if(item.slug == slug)
      {
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
   this.postAdService.updateClick(data).toPromise();
  }
  

  toggleBookmark(post: Post) {
    
    const data = {
      Bookmark: !post.Bookmark
    }
    post.published = !post.published;
    this.postAdService.update(post._id!, data, {}).subscribe(res => {
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
  headPage()
  {
    const data = {
      title: `Escorts, Swingers, Transvestites, Acompanhantes, videollamadas, Call, Massagens, Encontros Casuais    ` +`- Onlypu`,
      description: "Search and publish free erotic ads, escort and whore classifieds, gay escort ads, swingers and transvestites in Onlypu.com",
      url: "https://onlypu.com/bolivia/escorts",
      image: 'https://onlypu.com/assets/logo/seo.jpg'
    }
    
    this.title.setTitle(data.title);
    
    this.meta.updateTag({name: "title", content: data.title!});
    this.meta.updateTag({name: "description", content: data.description!});

    this.meta.updateTag({property: "og:type", content: "website"});
    this.meta.updateTag({property: "og:url", content: data.url});
    this.meta.updateTag({property: "og:title", content: data.title!});
    this.meta.updateTag({property: "og:description", content: data.description!});
    this.meta.updateTag({property: 'og:image', content: data.image});

    this.meta.updateTag({property: 'twitter:card', content: 'summary'});
    this.meta.updateTag({property: 'twitter:url', content: data.url});
    //this.meta.addTag({property: 'twitter:site', content: '@AngularUniv'});
    this.meta.updateTag({property: 'twitter:title', content: data.title!});
    this.meta.updateTag({property: 'twitter:description', content: data.description!});
    this.meta.updateTag({property: 'twitter:image', content: data.image});
    
  }

  headPageCountry(postName: any)
  {
    //console.log(postName);
 
    if(postName.Country && !postName.PostAdCategory && !postName.StateCity && !postName.CityZone)
    {
      this.metaTags = {
        keyworks: `Anuncios calientes para gente que busca placer ' + postName.Country + ' - Onlypu, putas, jovencitas, buscando sexo, 18 años, 19 años, 20 años, prostitutas, damas de compañia, escorts, gay, swingers y travestis, masajes, videollamadas, sexo, desnuada total, follame, trato de enamorados, besos, sexo duro, sexo suave, en cuatro, citas, trato de enamorados`,
        title: 'Anuncios calientes para gente que busca placer ' + postName.Country + ' - Onlypu',
        description: "Busca y publica anuncios eróticos gratis, clasificados de escorts y putas, avisos de escorts gay, swingers y travestis en Onlypu.com",
        url: `https://onlypu.com/${this.countryCode}`,
        image: 'https://onlypu.com/assets/logo/seo.jpg'
      }
    } 
    else  if(postName.Country && postName.PostAdCategory && !postName.StateCity && !postName.CityZone)
    { 
      this.metaTags = {
        keyworks: `Anuncios calientes para gente que busca placer ${postName.PostAdCategory} en ${postName.Country} - Onlypu, putas, jovencitas, buscando sexo, 18 años, 19 años, 20 años, prostitutas, damas de compañia, escorts, gay, swingers y travestis, masajes, videollamadas, sexo, desnuada total, follame, trato de enamorados, besos, sexo duro, sexo suave, en cuatro, citas, trato de enamorados`,
        title: `Anuncios calientes para gente que busca placer ${postName.PostAdCategory} en ${postName.Country} - Onlypu`,
        description: "Busca y publica anuncios eróticos gratis, clasificados de escorts y putas, avisos de escorts gay, swingers y travestis en Onlypu.com",
        url: `https://onlypu.com/${this.countryCode}/${this.categorySlug}`,
        image: 'https://onlypu.com/assets/logo/seo.jpg'
      }
    }
    else  if(postName.Country && postName.PostAdCategory && postName.StateCity && !postName.CityZone)
    {
      this.metaTags = {
        keyworks: `Anuncios calientes para gente que busca placer ${postName.PostAdCategory} en ${postName.Country} ${postName.StateCity} - Onlypu, putas, jovencitas, buscando sexo, 18 años, 19 años, 20 años, prostitutas, damas de compañia, escorts, gay, swingers y travestis, masajes, videollamadas, sexo, desnuada total, follame, trato de enamorados, besos, sexo duro, sexo suave, en cuatro, citas, trato de enamorados `,
        title: `Anuncios calientes para gente que busca placer ${postName.PostAdCategory} en ${postName.Country} ${postName.StateCity} - Onlypu`,
        description: "Busca y publica anuncios eróticos gratis, clasificados de escorts y putas, avisos de escorts gay, swingers y travestis en Onlypu.com",
        url: `https://onlypu.com/${this.countryCode}/${this.categorySlug}/${this.stateCitySlug}`,
        image: 'https://onlypu.com/assets/logo/seo.jpg'
      }
    }
    else if(postName.Country && postName.PostAdCategory && postName.StateCity && postName.CityZone)
    {
      this.metaTags = {
        keyworks: `Anuncios calientes para gente que busca placer ${postName.PostAdCategory} en ${postName.Country} ${postName.CityZone} zona ${postName.StateCity} ' - Onlypu, putas, jovencitas, buscando sexo, 18 años, 19 años, 20 años, prostitutas, damas de compañia, escorts, gay, swingers y travestis, masajes, videollamadas, sexo, desnuada total, follame, trato de enamorados, besos, sexo duro, sexo suave, en cuatro, citas, trato de enamorados `,
        title: `Anuncios calientes para gente que busca placer  ${postName.PostAdCategory} en ${postName.Country} ${postName.CityZone} zona ${postName.StateCity} - Onlypu`,
        description: "Busca y publica anuncios eróticos gratis, clasificados de escorts y putas, avisos de escorts gay, swingers y travestis en Onlypu.com",
        url: `https://onlypu.com/${this.countryCode}/${this.categorySlug}/${this.stateCitySlug}/${this.cityZoneSlug}`,
        image: 'https://onlypu.com/assets/logo/seo.jpg'
      }
    } else {
      this.headPage();
    }
    
    this.title.setTitle(this.metaTags.title!);
    
    this.meta.updateTag({name: "keywords", content: this.metaTags.keyworks!});
    this.meta.updateTag({name: "title", content: this.metaTags.title!});
    this.meta.updateTag({name: "description", content: this.metaTags.description!});

    this.meta.updateTag({property: "og:type", content: "website"});
    this.meta.updateTag({property: "og:url", content: this.metaTags.url!});
    this.meta.updateTag({property: "og:title", content: this.metaTags.title!});
    this.meta.updateTag({property: "og:description", content: this.metaTags.description!});
    this.meta.updateTag({property: 'og:image', content: this.metaTags.image!});

    this.meta.updateTag({property: 'twitter:card', content: 'summary'});
    this.meta.updateTag({property: 'twitter:url', content: this.metaTags.url!});
    //this.meta.addTag({property: 'twitter:site', content: '@AngularUniv'});
    this.meta.updateTag({property: 'twitter:title', content: this.metaTags.title!});
    this.meta.updateTag({property: 'twitter:description', content: this.metaTags.description!});
    this.meta.updateTag({property: 'twitter:image', content: this.metaTags.image!});
    
  }

  innerText(text: any)
  {
    return Tools.innerText(text);
  }

  onStory(item: Post)
  {
    //this.dataStory = item; 
    this.dataPost = item; 
    this.modalService.open('story');
  }

  onViewPost(item: Post)
  {
    this.dataPost = item; 
    this.modalService.open('viewPost');
  }

  postMedia(item: any) 
  {
    return item.slice(0, 3);
  }

  onCategory(countryCode: string, categorySlug: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([countryCode + '/' + categorySlug ]);
  }

  /********* UPDATE PLAN */
  updatePlan()
  {
    this.postAdService.updatePlan(null).subscribe(res => {
      
    });
  }

}
