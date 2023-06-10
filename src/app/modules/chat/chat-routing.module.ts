import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMessagesComponent } from './pages/messages/main-messages/main-messages.component';
import { MainUsersComponent } from './pages/users/main-users/main-users.component';

const routes: Routes = [
  {
    path: 'users',
    component: MainUsersComponent
  },
  {
    path: 'messages/:idChat',
    component: MainMessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
