import { DOCUMENT, Location } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showButton = false;
  scrollHeight = 400;

  countryCurrentIso: string;
  
  constructor(
    private toolsService: ToolsService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document,) { 
    if (this.toolsService.countryCurrent || this.toolsService.countryCurrent != null) {
      this.countryCurrentIso = `/${this.toolsService.countryCurrent}`;
    } else {
      this.countryCurrentIso = '/';
    }
  }

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
