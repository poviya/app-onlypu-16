import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  date: any;

  @Input() dataSearchSlug: any

  dataTip: any;
  @Input() postName: any;
  @Input() posts: any = [];
  @Input() postStories: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
