import { Component, OnInit } from '@angular/core';
import { PostAdService } from 'src/app/services';

@Component({
  selector: 'app-main-suspended',
  templateUrl: './main-suspended.component.html',
  styleUrls: ['./main-suspended.component.scss']
})
export class MainSuspendedComponent implements OnInit {

  data: any;
  posts: any = [];
  alSub: any;
  totalPages: any;
  currentPage = 0;
  limitPage = 5;
  observer: any;
  loading = false;

  constructor( private postAdService: PostAdService,) { }

  ngOnInit(): void {
    this.findAllPostUser(); 
  }

  findAllPostUser()
  {
    this.data = {
      search: '',
      status: 'SUSPENDED'
    };
    this.loading = true;
    this.alSub = this.postAdService.findAllUser(this.data, this.limitPage, this.currentPage).subscribe(res => {
      this.totalPages = res.totalPages;
      res.data.forEach((element: any) => {
        this.posts.push(element);
      });
      this.loading = false;
    });
  }

  findAllPostUserInfinite($event: any)
  {
    this.data = {
      search: '',
      status: 'SUSPENDED'
    };
    this.currentPage = $event.currentPage;
    console.log(this.limitPage, this.currentPage);
    this.alSub = this.postAdService.findAllUserInfinite(this.data, this.limitPage, this.currentPage).subscribe(res => {
      res.data.forEach((element: any) => {
        this.posts.push(element);
      });
    });
  }
}