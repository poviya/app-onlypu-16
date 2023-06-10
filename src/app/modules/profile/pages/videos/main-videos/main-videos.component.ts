import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/library/modal/modal.service';
import { AuthService, MoneyService, PostService, UserService } from 'src/app/services';
import { environment } from 'src/environments/environment';

import { Post, PostMedia, User } from 'src/app/interfaces';

@Component({
  selector: 'app-main-videos',
  templateUrl: './main-videos.component.html',
  styleUrls: ['./main-videos.component.scss']
})
export class MainVideosComponent implements OnInit {

  data: object;

  user: User;
  postMedia: PostMedia[] = [];
  
  slug: null | string;

  constructor(  
    
    private moneyService: MoneyService,
    public router: Router,  
    private modalService: ModalService,
    private userService: UserService,
    public authService: AuthService,
    ) {
    //console.log('slug',this.activeRoute.snapshot.queryParamMap.get('slug'));
    this.slug = this.router.url.split('/')[1]; 
    if(this.slug == 'panel')
    this.slug = this.router.url.split('/')[2];
   }

  ngOnInit(): void {
  }

}
