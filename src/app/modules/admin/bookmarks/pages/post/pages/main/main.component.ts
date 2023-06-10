import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Bookmark } from 'src/app/interfaces';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isBrowser: boolean;
  isServer: boolean;

  width = 'max-w-5xl';
  showButton = false;
  scrollHeight = 400;

  loading: boolean = false;
  bookmark: Bookmark[] = [];
  totalPages: 100;
  currentPage = 0;
  limitPage = 5;
  dataSearch: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private bookmarkService: BookmarkService,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document,
    private spinnerService: SpinnerService
  ) {

    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    }
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.loading = true;
    const data = {
      Site: environment.site
    }
    this.bookmarkService.findAllUser(data, this.limitPage, this.currentPage).subscribe(res => {
      if (res) {
        this.totalPages = res.totalPages;
        this.dataSearch = data;
        res.data.forEach((element: any) => {
          this.bookmark.push(element);
        });
        this.loading = false;
        this.headPage();
      }
    });
  }

  findAllInfinite() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + this.limitPage;
     
      this.bookmarkService.findAllUserInfinite(this.dataSearch, this.limitPage, this.currentPage).subscribe(res => {
        res.data.forEach((element: any) => {
          this.bookmark.push(element);
        });
      });
    } else {
      console.log('no pages');
    }

  }

  /************************ SEO  *****************/
  headPage() {
    const data = {
      title: `Onlypu`,
      description: "Enjoy exclusive photos and videos of escort models",
      url: "https://onlypu.com/feed",
      image: 'https://onlypu.com/assets/logo/seo2.jpg'
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

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffset || scrollTop) > this.scrollHeight;

  }
  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  onSpinner(): void {
    this.spinnerService.start();
  }
}
