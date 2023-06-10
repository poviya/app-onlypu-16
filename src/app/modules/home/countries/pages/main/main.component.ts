import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isBrowser: boolean;
  isServer: boolean;

  public getScreenWidth: any;
  public getScreenHeight: any;

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: object,
    private meta: Meta,
    private title: Title,
  ) { 
    //this.document.body.classList.remove('background-one');
    //
    //this.document.body.classList.add(`background-two`);
    //this.document.body.classList.add('via-pink-500');
    //this.document.body.classList.add('to-pink-700');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }

    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    }

    this.headPage();

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    // console.log('getScreenWidth', this.getScreenWidth);
    // console.log('getScreenHeight', this.getScreenHeight);
  }
  

    /************************ SEO  *****************/
    headPage()
    {
      const data = {
        title: `Modelos, Escorts, Acompanhantes, videollamadas, Call, Massagens, Encontros Casuais    ` +` Onlypu`,
        description: "Onlypu dating platform with escort models for a casual fling or a live virtual meeting, chat, talk and enjoy. ❤️ It's FREE and no registration is required. 🔥 Girls from various countries ready for an adventure.",
        url: "https://onlypu.com/",
        image: 'https://onlypu.com/assets/logo/seo.jpg'
      }
      
      this.title.setTitle(data.title);
      
      this.meta.addTag({name: "title", content: data.title!});
      this.meta.addTag({name: "description", content: data.description!});
  
      this.meta.addTag({property: "og:type", content: "website"});
      this.meta.addTag({property: "og:url", content: data.url});
      this.meta.addTag({property: "og:title", content: data.title!});
      this.meta.addTag({property: "og:description", content: data.description!});
      this.meta.addTag({property: 'og:image', content: data.image});
  
      this.meta.addTag({property: 'twitter:card', content: 'summary'});
      this.meta.addTag({property: 'twitter:url', content: data.url});
      //this.meta.addTag({property: 'twitter:site', content: '@AngularUniv'});
      this.meta.addTag({property: 'twitter:title', content: data.title!});
      this.meta.addTag({property: 'twitter:description', content: data.description!});
      this.meta.addTag({property: 'twitter:image', content: data.image});
      
    }
}
