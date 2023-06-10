import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { Tools } from 'src/app/common/tools';
import { ToolsService } from 'src/app/services';
import { ModalService } from 'src/app/library/modal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() fixed: any;
  @Input() width: any;
  isBrowser: boolean;
  userData: User;
  
  public sidebarShow: boolean = false;
  private element: any;

  constructor(
    private el: ElementRef,
      private authService: AuthService,  
      private modalService: ModalService,
      @Inject(PLATFORM_ID) private platformId: Object,
      private toolsService: ToolsService) {
        this.element = el.nativeElement;
    if (isPlatformBrowser(this.platformId)) {
        this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
    
    }
 }  

  ngOnInit(): void {
    this.user();
    //document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
      //this.sidebarShow = true;
        //console.log(el.target.className)
    });
  }

  user() {
    this.userData = this.authService.user;
  }

  logout() {

    this.authService.logout();
  }

  get countryData() {
    return this.toolsService.country;
  }

  onCrop(text: string)
  {
    return Tools.cropText(text!, 14) + '...';
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }
}
