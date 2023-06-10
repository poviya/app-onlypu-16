import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, HostBinding, HostListener, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Country, User } from 'src/app/interfaces';
import { AppService, AuthService, ToolsService, UserService } from 'src/app/services';
import { Tools } from 'src/app/common/tools';
import { ModalService } from '../../../../library/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent implements OnInit {

  @Input() countryCode: any;
  @Input() categorySlug: any;
  @Input() stateCitySlug: any;
  @Input() cityZoneSlug: any;
  @Input() fixed: boolean;

  search = 'search';
  bodyText: string;
  country: Country | undefined;

  public sidebarShowOne: boolean = false;
  public sidebarShowTwo: boolean = false;

  isFixedNavbar: any;
  @HostBinding('class.navbar-opened') navbarOpened = false;

  isBrowser: boolean;
  user: User | undefined;

  constructor(
      private authService: AuthService,  
      @Inject(PLATFORM_ID) private platformId: Object,
      private toolsService: ToolsService,
      private modalService: ModalService,
      private appService: AppService,
      private userService: UserService,
      public router: Router,
      @Inject(DOCUMENT) private document: Document,
  ) {
    if (isPlatformBrowser(this.platformId)) {
        this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
    
    }
 }  

  ngOnInit(): void {
    this.userData();
    this.countryCurrent();
  }

  async userData() {
    //this.user = await this.userService.findOne(this.authService.user._id).toPromise(); 
    console.log(this.user);
  }

  logout() {

    this.authService.logout();
  }

  onCrop(text: string)
  {
    return Tools.cropText(text!, 14) + '...';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    //console.log(offset);
    if(offset > 10) {
      this.isFixedNavbar = true;
    } else {
      this.isFixedNavbar = false;
    }
  }

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }
  /*
  @HostListener("click")
  clicked() {
    this.navbarOpened = !this.navbarOpened;
  }
  */
  //@HostListener("document:click")
  clickedOut() {
    //this.sidebarShow = !this.sidebarShow;
    this.navbarOpened = false;
  }

  async countryCurrent() {
      const countries = await this.appService.appCountryfindAll().toPromise();
      const country = countries!.find( res => res.slug === this.countryCode);
      this.country = country;
    //return this.toolsService.country;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  onScrollTop() : void {
    if(this.countryCode)
    {
      this.document.documentElement.scrollTop = 0;
    } else {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.countryCode ]);
    }
    
  }
}

