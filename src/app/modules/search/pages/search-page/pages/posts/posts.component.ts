import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, User } from 'src/app/interfaces';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { ToastService } from 'src/app/library/toast/toast.service';
import { AuthService, PostService, UserService } from 'src/app/services';
import { environment } from 'src/environments/environment';
import { Tools } from 'src/app/common/tools';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  search: string | null;

  loading: boolean;
  users: User[] = [];
  posts: Post[] = [];
  post: Post;

  dataTip: object;

  postLoading:string[]=["hola","que","tal"];

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public userService: UserService,
    public authService: AuthService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private postService: PostService,
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
  get modalDelete() {
    return this.dialogService.modalDelete;
  }

  get modalTip() {
    return this.dialogService.modalTip;
  }

  closeModalDelete() {
    this.dialogService.toogleDelete();
  }
 
  closeModalTip() {
    this.dialogService.toogleTip();
  }


  async openModalTip(post: Post) {
    this.dataTip = {
      type: 'tip_post',
      post: post,
      user: post.User
    };
  }

  postMedia(item: any) 
  {
    return item.slice(0, 3);
  }

  onEdit(post: Post): void {
    this.router.navigate(['/panel/create-post/details/' + post._id]);
  }

  //********* delete  */
  onDeleteDialog(post: Post) {
    this.dialogService.toogleDelete();
    this.post = post;
  }

  onDelete(): void {
    if(!this.post)
    return;

    this.spinnerService.start();
    this.dialogService.toogleDelete();
    this.postService.delete(this.post._id).subscribe(res => {
      if(res) {
        this.posts = this.posts.filter((item: Post) => item._id!.split('.')[0] !== this.post._id);
        this.spinnerService.close();
        this.post = {};
      }
    })
  }

  innerText(text: any)
  {
    return Tools.innerText(text);
  }

  /************** tip */
  onTipDialog(post: Post) {
    this.dialogService.toogleTip();
    this.dataTip = {
      type: 'tip_post',
      post: post,
      user: post.User
    };
  }

  copyText(post: Post) {
    const textToCopy = " https://onlypu.com/pu/" + post.slug;
    navigator.clipboard.writeText(textToCopy).then(() => {
      this.toastService.start('copied_link');
      setTimeout( () => this.toastService.close(), 2000 );
      console.log('El texto ha sido copiado al portapapeles');
    }, (err) => {
      console.error('Error al copiar el texto al portapapeles: ', err);
    });
  }
}
