import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Post, Suscription, User } from 'src/app/interfaces';
import { ModalService } from 'src/app/library/modal/modal.service';
import { AuthService, MoneyService, PostService, UserService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-posts',
  templateUrl: './main-posts.component.html',
  styleUrls: ['./main-posts.component.scss']
})
export class MainPostsComponent implements OnInit {

  loadingUser: boolean = false;
  loading: boolean = false;

  data: object;

  user: User;
  suscription: Suscription;
  posts: Post[] = [];
  
  slug: null | string;

  totalPages: 100;
  currentPage = 0;
  limitPage = 20;
  dataSearch: any;

  constructor(  
    private meta: Meta,
    private title: Title,
    private postService: PostService,
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
    this.findAllPostUser();
  }

  findAllPostUser() {
    this.loading = true;
    let data = {};
    if(this.authService.user) {
      data = {
        'username': this.slug,
        'Site': environment.site,
        'User': this.authService.user._id
      }
      } else {
        data = {
          'username': this.slug,
          'Site': environment.site,
        }
      }
    
  
    this.postService.findAllUser(data, this.limitPage, this.currentPage).subscribe(res =>  {
      if(res) {
        this.suscription = res.suscription;
        this.totalPages = res.totalPages;
        this.dataSearch = data;
        res.data.forEach((element: any) => {
          this.posts.push(element);
        });
        this.loading = false;
        //this.headPage();
      }
    });
  } 

  findAllPostsInfinite() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + this.limitPage;
     
      this.postService.findAllUserInfinite(this.dataSearch, this.limitPage, this.currentPage).subscribe(res => {
        res.data.forEach((element: any) => {
          this.posts.push(element);
        });
      });
    } else {
      console.log('no pages');
    }

  }

    /************************ SEO  *****************/
    headPage() {
      const data = {
        title: `Onlypu`,
        description: "Enjoy exclusive photos and videos of escort models",
        url: "https://onlypu.com/feed",
        image: 'https://onlypu.com/assets/logo/seo2.jpg'
      }
  
      this.title.setTitle(data.title);
  
      this.meta.addTag({ name: "title", content: data.title! });
      this.meta.addTag({ name: "description", content: data.description! });
  
      this.meta.addTag({ property: "og:type", content: "website" });
      this.meta.addTag({ property: "og:url", content: data.url });
      this.meta.addTag({ property: "og:title", content: data.title! });
      this.meta.addTag({ property: "og:description", content: data.description! });
      this.meta.addTag({ property: 'og:image', content: data.image });
  
      this.meta.addTag({ property: 'twitter:card', content: 'summary' });
      this.meta.addTag({ property: 'twitter:url', content: data.url });
      //this.meta.addTag({property: 'twitter:site', content: '@AngularUniv'});
      this.meta.addTag({ property: 'twitter:title', content: data.title! });
      this.meta.addTag({ property: 'twitter:description', content: data.description! });
      this.meta.addTag({ property: 'twitter:image', content: data.image });
    }

  
  prinImages(images: any) 
  { 
    return images[0]['url'];
  };

  async openModalTip(post: Post) {
    this.data = {
      type: 'tip_post',
      post: post
    };

    this.modalService.open('tip_post');
  }

}
