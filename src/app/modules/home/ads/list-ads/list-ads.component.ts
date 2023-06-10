import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AuthService, PostAdService, PostService, TipService, } from 'src/app/services';

import { Tools } from 'src/app/common/tools';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { ToastService } from 'src/app/library/toast/toast.service';
import { Post } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';

@Component({
  selector: 'app-list-ads',
  templateUrl: './list-ads.component.html',
  styleUrls: ['./list-ads.component.scss']
})
export class ListAdsComponent implements OnInit {

  @Input() loading = false;
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;

  date: any;

  @Input() dataSearchSlug: any

  dataTip: any;
  @Input() postName: any;
  @Input() posts: any = [];
  @Input() postStories: any = [];

  observer: any;
  post: Post;

  @Output() findAllAdsInfiniteEvent = new EventEmitter<string>();
  
  postLoading: string[] = ["hola", "que", "tal"];

  constructor(
    public router: Router,
    private postAdService: PostAdService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private tipService: TipService,
    private spinnerService: SpinnerService,
    private postService: PostService,
    public authService: AuthService
  ) {
    this.date = new Date();
  }

  ngOnInit(): void {

    this.intersectionObserver();

  }

  ngAfterViewInit(): void {
    this.theLastList.changes.subscribe((d) => {
      if (d.last) this.observer.observe(d.last.nativeElement);
    });
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

  intersectionObserver() {
    let options = {
      root: null,//document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 0.5//1.0
    }

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.findAllAdsInfiniteEvent.emit();
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

  /********* UPDATE PLAN */
  updatePlan() {
    this.postAdService.updatePlan(null).subscribe(res => {

    });
  }

  /***************MODAL */

  onTipDialog(post: Post) {
    this.dialogService.toogleTip();
    this.dataTip = {
      type: 'tip_post',
      post: post,
      user: post.User
    };
    this.tipService.create(this.dataTip);
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

  compartir(post: Post) {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url:  " https://onlypu.com/pu/" + post.slug
      })
        .then(() => console.log('Contenido compartido exitosamente'))
        .catch((error) => console.log('Error al compartir:', error));
    } else {
      console.log('La API de Web Share no está disponible en este navegador');
    }
  }

  onEdit(post: Post): void {
    this.router.navigate(['/panel/create-ad/details/' + post._id]);
  }

  //********* delete  */
  get modalDelete() {
    return this.dialogService.modalDelete;
  }

  closeModalDelete() {
    this.dialogService.toogleDelete();
  }
  
  onDeleteDialog(post: Post) {
    this.dialogService.toogleDelete();
    this.post = post;
  }

  onDelete(): void {
    if(!this.post)
    return;

    this.spinnerService.start();
    this.dialogService.toogleDelete();
    this.postService.delete(this.post._id).subscribe(res => {
      if(res) {
        this.posts = this.posts.filter((item: Post) => item._id!.split('.')[0] !== this.post._id);
        this.spinnerService.close();
        this.post = {};
      }
    })
  }
}
