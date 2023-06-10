import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { metaTags } from 'src/app/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  width = 'max-w-5xl';
  
  isBrowser: boolean;
  isServer: boolean;

  showButton = false;
  scrollHeight = 400;
  
  countryCode:any;
  categorySlug: any;
  countryStateSlug: any;
  stateCitySlug: any;
  cityZoneSlug: any;
  searchText = 'search';
  metaTags: metaTags;
  
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private meta: Meta,
    private title: Title,
  ) { }

  ngOnInit(): void {

    this.countryCode =  this.router.url.split('/')[1];
    this.categorySlug = this.activeRoute.snapshot.paramMap.get('categorySlug'); //this.router.url.split('/')[2]; 
    this.countryStateSlug = this.activeRoute.snapshot.paramMap.get('countryStateSlug');
    this.stateCitySlug = this.activeRoute.snapshot.paramMap.get('stateCitySlug');
    this.cityZoneSlug = this.activeRoute.snapshot.paramMap.get('cityZoneSlug');

    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }

    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    }

    this.headPageCountry();
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

  headPageCountry()
  {
    //console.log(postName);
 
    if(this.countryCode == 'bolivia') 
    {
      this.metaTags = {
        keyworks: 'Anuncios calientes para gente que busca placer en Bolivia Onlypu, putas, jovencitas, buscando sexo, 18 años, 19 años, 20 años, prostitutas, damas de compañia, escorts, gay, swingers y travestis, masajes, videollamadas, sexo, desnuada total, follame, trato de enamorados, besos, sexo duro, sexo suave, en cuatro, citas, trato de enamorados ',
        title: 'Citas y encuentros para gente que busca placer en Bolivia - Onlypu',
        description: "Busca y publica citas para una aventura caliente de escorts,  putas, damas de compañia, sugar dadys, hombres de compañia y  empleos swingers en Onlypu.com",
        url: `https://onlypu.com/${this.countryCode}`,
        image: 'https://onlypu.com/assets/logo/seo.jpg'
      }
    }
    
    this.title.setTitle(this.metaTags.title!);
    
    this.meta.updateTag({name: "keyworks", content: this.metaTags.keyworks!});
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

}
