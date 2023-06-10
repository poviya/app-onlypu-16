import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.scss']
})
export class ListMessagesComponent implements OnInit {

  @Input() idChat: string | null;
  
  constructor() { }

  ngOnInit(): void {
  }

}
