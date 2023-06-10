import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { ToastService } from 'src/app/library/toast/toast.service';
import { AuthService } from 'src/app/services';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/interfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;
  
  @Input() post: Post;
  
  myform: FormGroup;
  
  loading: boolean = false;
  comment: Comment[] = [];
  totalPages: 100;
  currentPage = 0;
  limitPage = 3;
  dataSearch: any;

  observer: any;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    public authService: AuthService,
    private commentService: CommentService,
    private spinnerService: SpinnerService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.createFormControls();
    this.findAll();
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.theLastList.changes.subscribe((d) => {
      if (d.last) this.observer.observe(d.last.nativeElement);
    });
  }

  createFormControls() {
    this.myform = this.fb.group({
      text: ['', [Validators.nullValidator]]
    });
  }

  findAll(): void {
    this.loading = true;
    const data = {
      Post: this.post._id
    }
    this.commentService.findAllPost(data, this.limitPage, this.currentPage).subscribe(res => {
      if (res) {
        this.totalPages = res.totalPages;
        this.dataSearch = data;
        res.data.forEach((element: any) => {
          this.comment.push(element);
        });
        this.loading = false;
      }
    });
  }

  findAllInfinite() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + this.limitPage;
     
      this.commentService.findAllPostInfinite(this.dataSearch, this.limitPage, this.currentPage).subscribe(res => {
        res.data.forEach((element: any) => {
          this.comment.push(element);
        });
      });
    } else {
      console.log('no pages');
    }

  }

  intersectionObserver() {
    let options = {
      root: null,//document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 0.5//1.0
    }

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.findAllInfinite();
      }
    }, options);
  }

  onSend(): void {

    if(!this.authService.user)
    {
      this.router.navigateByUrl('auth/login');
      return;
    }

    if (this.myform.valid && this.authService.user) {
      const data = {
        Post: this.post._id,
        text: this.myform.value.text
      }

      this.commentService.create(data).subscribe(res => {
        if(res) {
          this.toastService.start('wasPublished');
          setTimeout( () => this.toastService.close(), 2000 );
          res.User = this.authService.user;
          this.myform.patchValue({
            text: '',
          });
          this.comment.unshift(res);
        }
      })
    }
  }

  onDeleteDialog(id: string): void {
    if(this.authService.user) {
      this.commentService.delete(id).subscribe(res => {
        if(res) {
          this.comment = this.comment.filter((item: Comment) => item._id!.split('.')[0] !== id);
        }
      })
    }
  }
}
