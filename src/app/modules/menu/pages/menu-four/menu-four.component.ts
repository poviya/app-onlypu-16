import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-four',
  templateUrl: './menu-four.component.html',
  styleUrls: ['./menu-four.component.scss']
})
export class MenuFourComponent implements OnInit {

  public sidebarShow: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
