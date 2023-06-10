import { DOCUMENT, Location } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { Country, Post } from 'src/app/interfaces';
import { SearchService } from 'src/app/modules/search/search.service';
import { AppService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showButton = false;
  scrollHeight = 400;

  @Input() post: Post | undefined;
  
  constructor( 
    private searchService: SearchService,
    private appService: AppService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document,) { }

  ngOnInit(): void {
    //this.findCountry();
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
