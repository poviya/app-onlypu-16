import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-main-messages',
  templateUrl: './main-messages.component.html',
  styleUrls: ['./main-messages.component.scss']
})
export class MainMessagesComponent implements OnInit {

  idChat: string | null;
  constructor(private route: ActivatedRoute) {
    this.idChat = this.route.snapshot.paramMap.get('idChat');
    console.log(this.idChat);
   }

  ngOnInit(): void {
  }

}
