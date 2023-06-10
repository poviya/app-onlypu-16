import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces';
import { ModalService } from 'src/app/library/modal';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-menu-right',
  templateUrl: './menu-right.component.html',
  styleUrls: ['./menu-right.component.scss']
})
export class MenuRightComponent implements OnInit {

  userData: User;
  
  constructor(
    private authService: AuthService, 
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
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
