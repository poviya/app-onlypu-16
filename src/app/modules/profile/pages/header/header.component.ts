import { DOCUMENT, Location } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user: User;
  showButton = false;
  scrollHeight = 400;

  constructor(
    private location: Location,
    @Inject(DOCUMENT) private document: Document
    ) { }

  ngOnInit(): void {
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

  goBack(): void {
    this.location.back();
  }

}
