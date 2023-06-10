import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  @Input() chats: Chat[];
  constructor() { }

  ngOnInit(): void {
  }

}
