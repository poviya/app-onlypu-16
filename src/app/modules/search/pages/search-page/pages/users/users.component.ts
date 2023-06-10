import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, User } from 'src/app/interfaces';
import { UserService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  search: string | null;

  loading: boolean;
  users: User[] = [];
  posts: Post[] = [];
  
  postLoading:string[]=["hola","que","tal"];

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
  ) { 
    this.search = this.activeRoute.snapshot.queryParamMap.get('q');
  }

  ngOnInit(): void {
    this.findSearch();
  }

  findSearch() {
    this.loading = true;
    const data = {
      search: this.search,
      Site: environment.site,
    }

    this.userService.searchUsersPosts(data).subscribe( res => {
      if(res) {
        this.users = res.users;
        this.posts = res.posts;

        this.loading = false;
      }
    })
  }

  prinImages(images: any) 
  { 
    return images[0]['url'];
  };

  openModalTip(item: any) {
    
  }
}
