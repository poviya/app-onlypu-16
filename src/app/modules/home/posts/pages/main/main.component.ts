import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Post, User } from 'src/app/interfaces';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { PostService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  width = 'max-w-5xl';
  showButton = false;
  scrollHeight = 400;

  public snapshotImageName: string = 'sample_snapshot';
  public snapshotImageType: string = 'JPG';

  loading: boolean = false;

  isBrowser: boolean;
  isServer: boolean;
  user: User;
  posts: Post[] = [];
  totalPages: 100;
  currentPage = 0;
  limitPage = 2;
  dataSearch: any;
  isFirstElement = true;

  constructor(
    private readonly postService: PostService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private meta: Meta,
    private title: Title,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    };
    this.findAllPosts()
    this.onScrollTop();
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event) {
    if (document.domain === 'onlypu.com') {
      event.preventDefault(); // Evita la acción predeterminada del clic derecho
      // Aquí puedes agregar cualquier lógica adicional que desees ejecutar cuando se detecte el clic derecho
    }
  }

  findAllPosts(): void {
    this.loading = true;
    const data = {
      Site: environment.site
    }
    this.postService.findAll(data, this.limitPage, this.currentPage).subscribe(res => {
      if (res) {
        this.totalPages = res.totalPages;
        this.dataSearch = data;
        res.data.forEach((element: any) => {
          this.posts.push(element);
        });
        this.loading = false;
        this.headPage();
        const dataUpdate = {

        };
        this.postService.latestPost(dataUpdate).subscribe(res => {

        });
      }
    });
  }

  findAllPostsInfinite() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + this.limitPage;

      this.postService.findAllInfinite(this.dataSearch, this.limitPage, this.currentPage).subscribe(res => {
        if (res) {
          if (this.isFirstElement) {
            res.data.shift();
            this.isFirstElement = false;
          }
          res.data.forEach((element: any) => {
            this.posts.push(element);
          });
        }
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
