import { Component, Directive, ElementRef, HostListener, Inject, Input, OnInit, Pipe, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post, Bookmark, User, Suscription } from 'src/app/interfaces';
import { AuthService, PostAdService, PostService } from 'src/app/services';
import { Tools } from 'src/app/common/tools';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { MemoryStorage } from 'src/app/shared/local-storage';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
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
export class PostModalComponent implements OnInit {

  loading: boolean = false;
  isBrowser: boolean;
  isServer: boolean;

  user: User;
  categorySlug: any; stateCitySlug: any; slug: any;
  countrySlug: any;

  @Input() suscription: Suscription;
  @Input() post: Post;
  @Input() bookmark: Bookmark | null;
  bookmarkActive: boolean;

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

  constructor(
    private activeRoute: ActivatedRoute,
    private postAdService: PostAdService,
    private meta: Meta,
    private title: Title,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef,
    private bookmarkService: BookmarkService,
    private authService: AuthService,
    private postService: PostService
  ) {
    this.slug = this.activeRoute.snapshot.paramMap.get('slug');
    this.element = el.nativeElement;
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

    //this.findOneSlug();

    //console.log(JSON.parse(localStorage.getItem('user')!))
    if (this.bookmark) { 
      this.bookmarkActive = true;
    }
  }

  textMessage() {
    // quiero hacerte darte en cuatro
    // quiero besarte toda
    // quiero hacerte genir rico
    // quiero penetrarte rico
    // estoy caliente quiero hacerte rico
    // me gustaría hacer le delicioso contigo
    return "Hola, acabo de ver tu anuncio en Onlypu.com, "
      + Tools.cropText(this.post.title!, 25) + '(...)' +
      ",  quiero una cita contigo."
      + " https://onlypu.com/pu/" + this.post.slug;
  }

  addBookmark(): void {
    if (this.authService.user && this.post.User) {
      if (this.post.User?._id != this.authService.user._id) {
        const data = {
          Post: this.post._id,
        }
        this.bookmarkActive = true;
        this.bookmarkService.create(data).subscribe(res => {
          if (res) {
            this.bookmark = res;
          }
        });
      }
    }
  }

  /// other bookmark
  findOneFavoriteUser(): void {

    if (this.authService.user) {
      const data = {
        Post: this.post._id,
        User: this.authService.user._id
      }
      this.bookmarkService.findOneUser(data).subscribe(res => {
        if (res) {
          this.bookmark = res;
        }
      });
    }

  }

  deletePostBookmark(): void {
    if (this.authService.user && this.bookmark) {
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

      this.bookmarkActive = false;
      this.bookmarkService.delete(this.bookmark._id).subscribe(res => {
        if (res) {
          this.bookmark = null;
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

  innerText(text: any) {
    return Tools.innerText(text);
  }


  /****** lightbox */

  onPreviewImage(index: number): void {

    // show immage
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLinghtboxImage = this.post.PostMedia![index];
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
    if (this.currentIndex > this.post.PostMedia!.length - 1) {
      this.currentIndex = 0;
    }

    this.currentLinghtboxImage = this.post.PostMedia![this.currentIndex];
  }

  prev(): void {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.post.PostMedia!.length - 1;
    }

    this.currentLinghtboxImage = this.post.PostMedia![this.currentIndex];
  }

  /********* UPDATE PLAN */
  updatePlan(data: any) {
    this.postAdService.updatePlan(data).subscribe(res => {

    });
  }

  shared() {
    if (navigator.share) {
      navigator.share({
        title: this.post.title,
        text: `${this.post.title}\n ${this.post.description}`,
        url: "https://onlypu.com/pu/" + this.post.slug
      })
        .then(() => console.log('Contenido compartido exitosamente'))
        .catch((error) => console.log('Error al compartir:', error));
    } else {
      console.log('La API de Web Share no está disponible en este navegador');
    }
  }

  //********* likes */
  onLikes() {
    if (this.post && this.authService.user) {
      const data = {};
      this.post.likes! += 1;
      this.postService.likes(this.post._id!, data).subscribe(res => {
        if (res) {

        }
      });
    }
  }
}


