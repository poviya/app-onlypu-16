import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces';

@Component({
  selector: 'app-center-dialog-ad',
  templateUrl: './dialog-ad.component.html',
  styleUrls: ['./dialog-ad.component.scss'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({transform: 'scale(0.5)'}),
        animate('150ms', style({transform: 'scale(1)'}))
      ]),
      transition('void => visible', [
        style({transform: 'scale(1)'}),
        animate('150ms', style({transform: 'scale(0.5)'}))
      ]),
    ]),
    trigger('animation2', [
      transition(':leave', [
        style({opacity: 1}),
        animate('50ms', style({opacity: 0.8}))
      ])
    ])
  ]
})
export class DialogAdComponent implements OnInit {

  post: Post;
  showCount = false;
  private element: any;
  previewImage = false;
  showMask = false;
  currentLinghtboxImage: any;
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;

  constructor(
    private el: ElementRef,
  ) {
    this.element = el.nativeElement;
   }

  ngOnInit(): void {
  }

  /****** lightbox */
  onPreviewImage(index: number) : void
  {
   
    // show immage
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLinghtboxImage = this.post.PostMedia![index];
    this.showCount = true;
  }

  onAnimationEnd(event: AnimationEvent )
  {
    if(event.toState == 'void') 
    {
      this.showMask = false;
    }
  }

  onClosePreview()
  {
    this.previewImage = false;
  }

  next(): void {
    this.currentIndex = this.currentIndex + 1;
    if(this.currentIndex > this.post.PostMedia!.length - 1)
    {
      this.currentIndex = 0;
    }

    this.currentLinghtboxImage = this.post.PostMedia![this.currentIndex];
  }

  prev() : void {
    this.currentIndex = this.currentIndex - 1;
    if(this.currentIndex < 0)
    {
      this.currentIndex = this.post.PostMedia!.length - 1;
    }

    this.currentLinghtboxImage = this.post.PostMedia![this.currentIndex];
  }
}
