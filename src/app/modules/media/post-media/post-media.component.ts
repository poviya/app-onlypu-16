import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { PostMedia } from 'src/app/interfaces';
import { VideoMediaService } from './video-media.service';

@Component({
  selector: 'app-post-media',
  templateUrl: './post-media.component.html',
  styleUrls: ['./post-media.component.scss'],
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
export class PostMediaComponent implements OnInit, AfterViewInit  {

  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;

  @Input() postMedia: PostMedia[] | undefined;

  @Input() i: number;

  showButton: boolean = false;

  showCount = false;
  private element: any;
  previewImage = false;
  showMask = false;
  currentLinghtboxImage: any;
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;

  src: string = 'https://images3.alphacoders.com/994/thumbbig-994703.webp';
  public srcPreload: string = './assets/images/image-preload.png';
  public srcError: string = './assets/images/image-preload.png';
  public imgSrc: string;
  private tmpImage: HTMLImageElement;

  countClock: number = 0;
  clock: any;
  clockHandle: any;

  // carousel media
  slideWidth: number;
  transitionDuration = 0.5;
  autoSlideInterval = 5000; // change slide every 3 seconds
  autoSlideTimer: any;

  document: Document;

  @ViewChild('main')
  main: ElementRef;

  //play: boolean = false;
  playId: string;

  @Input() slides: PostMedia[] | undefined = [];
  public videos: string[] = [];

  @ViewChildren('videoElement') videoElements: QueryList<ElementRef>;
  currentVideoIndex: number = 0;

  constructor(public videoMediaService: VideoMediaService, 
            private renderer: Renderer2,
              private el: ElementRef,) { 
    
  }

  ngOnInit(): void {
    //this.onPreviewImage(0);

    // console.log(this.src);
    //     this.imgSrc = this.srcPreload;
    //     if (this.tmpImage) {
    //         this.tmpImage.onload = null;
    //     }

    //     let loaded = () => { 
    //         this.imgSrc = this.src;
    //     };

    //     let imgError = () => {
    //         console.error('Error al cargar la imagen', this.imgSrc);
    //         this.imgSrc = this.srcError;
    //     };

    //     this.tmpImage = new Image();
    //     this.tmpImage.onload = loaded;
    //     this.tmpImage.onerror = imgError;
    //     this.tmpImage.src = this.src;

    //++ carousel media
    this.slideWidth = 400;//window.innerWidth;
    //console.log(this.slideWidth);
    setInterval(() => {
      this.next();
    }, this.autoSlideInterval); // Cambia de slide cada 5 segundos (5000ms)

  }

  /****** lightbox */
  onPreviewImage(index: number): void {

    if (this.postMedia) {
      // show immage
      this.showMask = true;
      this.previewImage = true;
      this.currentIndex = index;
      this.currentLinghtboxImage = this.postMedia![index].url;
      this.showCount = true;
      this.totalImageCount = this.postMedia!.length;

      if (this.postMedia![index].type == 'image') {
        this.loaderImage(index);
      }
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
    this.currentLinghtboxImage = '';
    this.previewImage = false;
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex > this.postMedia!.length - 1) {
      this.currentIndex = 0;
    }

    this.currentLinghtboxImage = this.postMedia![this.currentIndex].url;
    this.previewImage = true;

    if (this.postMedia![this.currentIndex].type == 'image') {
      this.loaderImage(this.currentIndex);
    }
  }

  prev(): void {
    this.currentLinghtboxImage = '';
    this.previewImage = false;
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.postMedia!.length - 1;
    }

    this.currentLinghtboxImage = this.postMedia![this.currentIndex].url;
    this.previewImage = true;

    if (this.postMedia![this.currentIndex].type == 'image') {
      this.loaderImage(this.currentIndex);
    }
  }

  loaderImage(index: number) {
    this.src = this.postMedia![index].url!;
    // preload image
    // console.log(this.src);
    this.imgSrc = this.srcPreload;
    if (this.tmpImage) {
      this.tmpImage.onload = null;
    }

    let loaded = () => {
      this.imgSrc = this.src;
    };

    let imgError = () => {
      //console.error('Error al cargar la imagen', this.imgSrc);
      this.imgSrc = this.srcError;
    };

    this.tmpImage = new Image();
    this.tmpImage.onload = loaded;
    this.tmpImage.onerror = imgError;
    this.tmpImage.src = this.src;
  }
  /********* UPDATE PLAN */
  updatePlan(data: any) {
    //  this.postAdService.updatePlan(data).subscribe(res => {

    //  });
  }

  ngAfterViewInit() {
    // this.clockHandle = setInterval(()=>{
    //   this.clock = new Date().toLocaleString();
    //   if(this.countClock === 6 )
    //   {
    //     this.countClock = 0;
    //     this.next();
    //   } else {
    //     this.countClock ++;
    //   }
    // },1000);

    // carosel media
    if (this.slides![0].type == 'image') {
      this.getScreen();
    }

    // if(this.slides) 
    // {
    //   this.videoPlayer!.nativeElement!.controls! = false;
    // }

    //this.playCurrentVideo();
    
  }


  // carousel media

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.slides![0].type == 'image') {
      this.getScreen();
    }
  }

  jumpToSlide(index: number) {
    this.currentIndex = index;
    clearInterval(this.autoSlideTimer);
    this.autoSlide();
  }

  prevCarouselMedia() {
    this.currentIndex = (this.currentIndex === 0) ? this.slides!.length - 1 : this.currentIndex - 1;
    clearInterval(this.autoSlideTimer);
    this.autoSlide();

  }

  nextCarouselMedia() {
    this.currentIndex = (this.currentIndex === this.slides!.length - 1) ? 0 : this.currentIndex + 1;
    clearInterval(this.autoSlideTimer);
    this.autoSlide();
  }

  autoSlide() {
    this.autoSlideTimer = setInterval(() => {
      this.currentIndex = (this.currentIndex === this.slides!.length - 1) ? 0 : this.currentIndex + 1;
    }, this.autoSlideInterval);
  }

  getScreen() {
    this.slideWidth = this.main.nativeElement.offsetWidth;
    // if(this.slideWidth < 500 )
    // {
    //   this.slideWidth = window.innerWidth + 0;
    // } else if(this.slideWidth < 1100)
    // {
    //   this.slideWidth = window.innerWidth - 0;
    // } else {
    //   this.slideWidth = window.innerWidth - 0;
    // }
  }


  ///

  // selectVideo(index: number) {
  //   this.currentVideoIndex = index;
  //   this.playCurrentVideo();
  // }

  // playCurrentVideo() {
  //   this.videoElements.forEach((videoElement, index) => {
  //     const video: HTMLVideoElement = videoElement.nativeElement;

  //     // Detener la reproducción de todos los videos
  //     video.pause();
  //     video.currentTime = 0;

  //     if (index === this.currentVideoIndex) {
  //       // Reproducir el video actual
  //       video.play();
  //     }
  //   });
  // }

  // @HostListener('window:scroll')
  // onWindowScroll() {
  //   const windowHeight = window.innerHeight;
  //   const videoElements = this.videoElements.toArray();

  //   videoElements.forEach((videoElement, index) => {
  //     const video: HTMLVideoElement = videoElement.nativeElement;
  //     const rect = video.getBoundingClientRect();

  //     const centerScreen = windowHeight / 2;
  //     const videoCenter = (rect.top + rect.bottom) / 2;

  //     if (
  //       rect.top >= 0 &&
  //       rect.bottom <= windowHeight &&
  //       !video.paused &&
  //       videoCenter > centerScreen
  //     ) {
  //       // El video está en el centro vertical de la pantalla y está reproduciendo
  //       video.pause();
  //     } else if (
  //       rect.top >= 0 &&
  //       rect.bottom <= windowHeight &&
  //       video.paused &&
  //       index === this.currentVideoIndex &&
  //       videoCenter <= centerScreen
  //     ) {
  //       // El video está en el centro vertical de la pantalla y está pausado
  //       video.play();
  //     }
  //   });
  // }
}

