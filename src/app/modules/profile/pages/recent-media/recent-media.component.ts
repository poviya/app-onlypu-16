import { Component, Input, OnInit } from '@angular/core';
import { PostMedia } from 'src/app/interfaces';

@Component({
  selector: 'app-recent-media',
  templateUrl: './recent-media.component.html',
  styleUrls: ['./recent-media.component.scss']
})
export class RecentMediaComponent implements OnInit {

  @Input() postMedia: PostMedia[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
