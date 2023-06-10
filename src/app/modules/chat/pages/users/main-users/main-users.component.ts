import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Chat } from 'src/app/interfaces';
import { ChatService } from 'src/app/services';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
  styleUrls: ['./main-users.component.scss']
})
export class MainUsersComponent implements OnInit {

  isBrowser: boolean;
  isServer: boolean;
  chats: Chat[];
  
  constructor(private chatService: ChatService,  @Inject(PLATFORM_ID) private platformId: object,) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    if (isPlatformServer(this.platformId)) {
      this.isServer = true;
    };
   }

  ngOnInit(): void {
    this.findByIdUser();
  }

  findByIdUser() {
    const data = {};
    this.chatService.findByIdUser(data).subscribe(res =>  {
      if(res) {
        this.chats = res;
      }
    });
  }
}

