import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';

import { MainMessagesComponent } from './pages/messages/main-messages/main-messages.component';
import { MainUsersComponent } from './pages/users/main-users/main-users.component';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { ListMessagesComponent } from './pages/messages/list-messages/list-messages.component';


@NgModule({
  declarations: [
   
    MainMessagesComponent,
    MainUsersComponent,
    ListUsersComponent,
    ListMessagesComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
