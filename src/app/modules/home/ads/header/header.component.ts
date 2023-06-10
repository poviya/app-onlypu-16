import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/interfaces';
import { DialogService } from 'src/app/library/dialog/dialog.service';
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

  @Input() countryCode: string;
  public country: Country | undefined;
  
  constructor( 
    private searchService: SearchService,
    private appService: AppService,
    private dialogService: DialogService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document,) { }

  ngOnInit(): void {
    this.findCountry();
  }

  async findCountry()
  {
    const dataCountries = await this.appService.appCountryfindAll().toPromise();
    this.country = dataCountries!.find( country => country.code === this.countryCode ); //? this.countryCode :  this.toolsService.country._id
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

  onSearch(): void {
    this.onScrollTop();
   this.dialogService.toogleSearch();
  }

  onAdd() {
    this.router.navigate(['/panel/create-ad/details']);
  }
}
