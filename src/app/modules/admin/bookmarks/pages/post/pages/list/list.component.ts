import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Output() findAllInfiniteEvent = new EventEmitter<string>();
  
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;
  
  @Input() loading = false;
  @Input() bookmark: any = [];
  observer: any;

  postLoading: string[] = ["hola", "que", "tal"];

  constructor() { }

  ngOnInit(): void {
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.theLastList.changes.subscribe((d) => {
      if (d.last) this.observer.observe(d.last.nativeElement);
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
        this.findAllInfiniteEvent.emit();
      }
    }, options);
  }

  prinImages(images: any) 
  { 
    return images[0]['url'];
  };
}
