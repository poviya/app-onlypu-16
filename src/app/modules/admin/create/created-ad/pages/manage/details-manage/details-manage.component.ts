import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces';
import { PostAdService, PostService } from 'src/app/services';
import { Tools } from 'src/app/common/tools';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { DialogService } from 'src/app/library/dialog/dialog.service';

@Component({
  selector: 'app-details-manage',
  templateUrl: './details-manage.component.html',
  styleUrls: ['./details-manage.component.scss']
})
export class DetailsManageComponent implements OnInit {

  showButton = false;
  scrollHeight = 400;
  
  isBrowser: boolean = false;
  isServer: boolean = false;
  idPost: string | null;
  post: Post;

  constructor(
      private activatedRoute: ActivatedRoute,
      private postAdService: PostAdService,
      private postService: PostService,
      private spinnerService: SpinnerService,
      private dialogService: DialogService,
      public router: Router,
      ) {

      this.idPost = this.activatedRoute.snapshot.paramMap.get('id');

   }

  ngOnInit(): void {
    this.idPost = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.idPost)
    {
      this.finPostAddOne();
    } else {
     
    }
  }

  finPostAddOne()
  {
    this.postAdService.findOne(this.idPost).subscribe(res => {
      if(res)
      {
          this.post = res;
      }
    }); 
  }

  textMessage(item: Post) {
    // quiero hacerte darte en cuatro
    // quiero besarte toda
    // quiero hacerte genir rico
    // quiero penetrarte rico
    // estoy caliente quiero hacerte rico
    // me gustaría hacer le delicioso contigo
    return ""
      + Tools.cropText(item.title!, 25) + '(...)' +
      ""
      + " https://onlypu.com/pu/" + item.slug;
  }


  onEdit(id: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/panel/create-ad/details/' + id]);
  }

  onManage(id: string): void {
    this.router.navigate(['/panel/create-ad/manage/' + id]);
  }

  onPromote(id: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/panel/create-ad/promote/' + id]);
  }

  onPhotos(id: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/panel/create/media/' + id]);
  }
  
  togglePublished(post: Post) {
    
    if(post.publishedCount! > 0)
    {
      const data = {
        published: !post.published
      }
      post.published = !post.published;
      this.postAdService.update(post._id!, data, {}).subscribe(res => {
      });
    }
  } 

  prinImages(images: any) 
  { 
    if(images[0].type == 'video') {
      return images[0]['urlSnapshot'];
    } else  {
      return images[0]['url'];
    }
    
  };
  
  onActive(item: Post): void {

    if(item)
    { 
      const data = {
        status: 'ACTIVE'
      }
      
      this.postAdService.update(item._id!, data, {}).subscribe(res => {
        if(res)
        {
          //this.findAllPostUser();
        }
      });
    }
  }

  onDelete(): void {
    if(!this.post)
    return;

    this.spinnerService.start();
    this.dialogService.toogleDelete();
    this.postService.delete(this.post._id).subscribe(res => {
      if(res) {
        this.spinnerService.close();
        this.post = {};
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/panel/your-ads/active']);
      }
    })
  }


  // +++ delete
  onDeleteDialog(post: Post) {
    this.dialogService.toogleDelete();
    this.post = post;
  }

  get moodalDelete() {
    return this.dialogService.modalDelete;
  }

  closeModalDelete() {
    this.dialogService.toogleDelete();
  }

  // suspended

  onSuspendedDialog(post: Post) {
    this.dialogService.toogleSuspended();
    this.post = post;
  }

  get moodalSuspended() {
    return this.dialogService.modalSuspended;
  }

  closeModalSuspended() {
    this.dialogService.toogleSuspended();
  }

  onSuspended(): void {

    this.spinnerService.start();

    if(!this.post)
    return;
    const data = {
      status: this.post.status == 'SUSPENDED' ? 'ACTIVE': 'SUSPENDED',
    }
    this.dialogService.toogleSuspended();
    this.postAdService.updateStatus(this.post._id!, data).subscribe(res => {
      if(res)
      {
        this.spinnerService.close();
        this.post = res;
      }
    });
  }
}