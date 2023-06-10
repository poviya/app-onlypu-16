import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces';
import { ModalService } from 'src/app/library/modal';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-menu-zero',
  templateUrl: './menu-zero.component.html',
  styleUrls: ['./menu-zero.component.scss']
})
export class MenuZeroComponent implements OnInit {

  userData: User;
  public sidebarShow: boolean = false;
  
  constructor(
    private authService: AuthService, 
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.user();

  }

  user() {
    this.userData = this.authService.user; 
  }

  logout() {

    this.authService.logout();
  }
  
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

}
