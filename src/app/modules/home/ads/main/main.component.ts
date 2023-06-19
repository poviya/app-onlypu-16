import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User, metaTags } from 'src/app/interfaces';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { AuthService, GeoService, PostAdService, TelegramBotService } from 'src/app/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showButton = false;
  scrollHeight = 400;

  width = 'max-w-5xl';

  isBrowser: boolean;
  isServer: boolean;

  countryCode: any;
  categorySlug: any;
  countryStateSlug: any;
  stateCitySlug: any;
  cityZoneSlug: any;
  search: any;
  dataSearch: any;
  dataSearchSlug: any;

  loading = false;
  date: any; data: any;
  dataTip: any;
  postName: any;
  posts: any = [];
  postStories: any = [];
  totalPages: 100;
  currentPage = 0;
  limitPage = 2;
  observer: any;
  user: User;
  isFirstElement = true;
  metaTags: metaTags;

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private postAdService: PostAdService,
    private telegramBotService: TelegramBotService,
    private meta: Meta,
    private title: Title,
    public dialogService: DialogService,
    private geoService: GeoService,
    private authService: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }

    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    }



  }

  ngOnInit(): void {

    this.search = this.activeRoute.snapshot.queryParamMap.get('search');
    this.countryCode = this.router.url.split('/')[1];
    this.categorySlug = this.activeRoute.snapshot.paramMap.get('categorySlug'); //this.router.url.split('/')[2]; 
    this.countryStateSlug = this.activeRoute.snapshot.paramMap.get('countryStateSlug');
    this.stateCitySlug = this.activeRoute.snapshot.paramMap.get('stateCitySlug');
    this.cityZoneSlug = this.activeRoute.snapshot.paramMap.get('cityZoneSlug');

    this.countryCode =  this.countryCode.toUpperCase();
    console.log(this.countryCode);
    this.dataSearchSlug = {
      search: this.search,
      countryCode: this.countryCode,
      categorySlug: this.categorySlug,
      countryStateSlug: this.countryStateSlug,
      stateCitySlug: this.stateCitySlug,
      cityZoneSlug: this.cityZoneSlug
    }
    this.onScrollTop();

    this.findAllAdsCountry();
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event) {
    if (document.domain === 'onlypu.com') {
      event.preventDefault(); // Evita la acción predeterminada del clic derecho
      // Aquí puedes agregar cualquier lógica adicional que desees ejecutar cuando se detecte el clic derecho
    }
  }

  // list posts
  async findAllAdsCountry() {

    this.loading = true;

    this.data = {
      countryCode: this.countryCode,
      categorySlug: this.categorySlug,
      stateCitySlug: this.stateCitySlug,

    }
    if (this.search) {
      this.data.search = this.search;
    }
    this.postAdService.findAllSearch(this.data, this.limitPage, this.currentPage).subscribe(res => {
      if (res) {
        this.postStories = res.dataStories; 
        this.totalPages = res.totalPages;
        this.dataSearch = res.dataSearch;
        this.postName = res.postName;
        this.headPageCountry(this.postName);
        res.data.forEach((element: any) => {
          this.posts.push(element);
        });
        this.loading = false;
        if (res.dataGeo.StateCity) {
          const dataUpdate = {
            Country: res.dataGeo.Country,
            StateCity: res.dataGeo.StateCity,
          };
         
          if(this.authService.user)
          {
            this.geoService.create(dataUpdate).subscribe(res => {

            });
          } else {
            this.postAdService.latestPost(dataUpdate).subscribe(res => {
            });
          }
          //this.telegramBotService.latestPostAll(dataTelegram).subscribe(res => { });
        } else {
          if(this.authService.user)
          {
            const dataUpdate = {
              Country: res.dataGeo.Country,
            };
            this.geoService.create(dataUpdate).subscribe(res => {

            });
          }
        }

        // if (this.currentPage < this.totalPages) {
        //   this.currentPage = this.currentPage + this.limitPage;
        // }
      }
    });

  }

  findAllPostsInfinite() {

    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + this.limitPage;
      if (this.search) {
        this.dataSearch.search = this.search;
      }
     
      this.postAdService.findAllSearchInfinite(this.dataSearch, this.limitPage, this.currentPage).subscribe(res => {
        if (this.isFirstElement) {
          res.data.shift();
          this.isFirstElement = false;
        }
        res.data.forEach((element: any) => {
          this.posts.push(element);
        });
      });
    } else {
      console.log('no pages');
    }

  }

  /************************ SEO  *****************/
  headPage() {
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

  headPageCountry(postName: any) {
    //console.log(postName);

    if (postName) {
      if (postName.Country && !postName.PostAdCategory && !postName.StateCity && !postName.CityZone) {
        this.metaTags = {
          keyworks: `Anuncios calientes para gente que busca placer ' + postName.Country + ' - Onlypu, putas, jovencitas, buscando sexo, 18 años, 19 años, 20 años, prostitutas, damas de compañia, escorts, gay, swingers y travestis, masajes, videollamadas, sexo, desnuada total, follame, trato de enamorados, besos, sexo duro, sexo suave, en cuatro, citas, trato de enamorados`,
          title: `Anuncios calientes para gente que busca placer ' + ${postName.Country} + ' - Onlypu`,
          description: "Busca y publica anuncios eróticos gratis, clasificados de escorts y putas, avisos de escorts gay, swingers y travestis en Onlypu.com",
          url: `https://onlypu.com/${this.countryCode}`,
          image: 'https://onlypu.com/assets/logo/seo.jpg'
        }
      }
      else if (postName.Country && postName.PostAdCategory && !postName.StateCity && !postName.CityZone) {
        this.metaTags = {
          keyworks: `Anuncios calientes para gente que busca placer ${postName.PostAdCategory} en ${postName.Country} - Onlypu, putas, jovencitas, buscando sexo, 18 años, 19 años, 20 años, prostitutas, damas de compañia, escorts, gay, swingers y travestis, masajes, videollamadas, sexo, desnuada total, follame, trato de enamorados, besos, sexo duro, sexo suave, en cuatro, citas, trato de enamorados`,
          title: `Anuncios calientes para gente que busca placer ${postName.PostAdCategory} en ${postName.Country} - Onlypu`,
          description: "Busca y publica anuncios eróticos gratis, clasificados de escorts y putas, avisos de escorts gay, swingers y travestis en Onlypu.com",
          url: `https://onlypu.com/${this.countryCode}/${this.categorySlug}`,
          image: 'https://onlypu.com/assets/logo/seo.jpg'
        }
      }
      else if (postName.Country && postName.PostAdCategory && postName.StateCity && !postName.CityZone) {
        this.metaTags = {
          keyworks: `Anuncios calientes para gente que busca placer ${postName.PostAdCategory} en ${postName.Country} ${postName.StateCity} - Onlypu, putas, jovencitas, buscando sexo, 18 años, 19 años, 20 años, prostitutas, damas de compañia, escorts, gay, swingers y travestis, masajes, videollamadas, sexo, desnuada total, follame, trato de enamorados, besos, sexo duro, sexo suave, en cuatro, citas, trato de enamorados `,
          title: `Anuncios calientes para gente que busca placer ${postName.PostAdCategory} en ${postName.Country} ${postName.StateCity} - Onlypu`,
          description: "Busca y publica anuncios eróticos gratis, clasificados de escorts y putas, avisos de escorts gay, swingers y travestis en Onlypu.com",
          url: `https://onlypu.com/${this.countryCode}/${this.categorySlug}/${this.stateCitySlug}`,
          image: 'https://onlypu.com/assets/logo/seo.jpg'
        }
      }
      else if (postName.Country && postName.PostAdCategory && postName.StateCity && postName.CityZone) {
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

      if (this.metaTags) {
        this.title.setTitle(this.metaTags.title!);

        this.meta.updateTag({ name: "keywords", content: this.metaTags.keyworks! });
        this.meta.updateTag({ name: "title", content: this.metaTags.title! });
        this.meta.updateTag({ name: "description", content: this.metaTags.description! });

        this.meta.updateTag({ property: "og:type", content: "website" });
        this.meta.updateTag({ property: "og:url", content: this.metaTags.url! });
        this.meta.updateTag({ property: "og:title", content: this.metaTags.title! });
        this.meta.updateTag({ property: "og:description", content: this.metaTags.description! });
        this.meta.updateTag({ property: 'og:image', content: this.metaTags.image! });

        this.meta.updateTag({ property: 'twitter:card', content: 'summary' });
        this.meta.updateTag({ property: 'twitter:url', content: this.metaTags.url! });
        //this.meta.addTag({property: 'twitter:site', content: '@AngularUniv'});
        this.meta.updateTag({ property: 'twitter:title', content: this.metaTags.title! });
        this.meta.updateTag({ property: 'twitter:description', content: this.metaTags.description! });
        this.meta.updateTag({ property: 'twitter:image', content: this.metaTags.image! });
      }
    }
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

  // search dialog
  get modalSearch() {
    return this.dialogService.modalSearch;
  }

  closeModalSearch() {
    this.dialogService.toogleSearch();
  }
}
