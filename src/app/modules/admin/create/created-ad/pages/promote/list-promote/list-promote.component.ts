import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post, ProductAdCredit, UserCredit } from 'src/app/interfaces/index';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { AuthService, PaymentOrderService, PostAdService, ToolsService, ProductAdCreditService, UserCreditService, TransactionCreditService } from 'src/app/services/index';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-promote',
  templateUrl: './list-promote.component.html',
  styleUrls: ['./list-promote.component.scss']
})
export class ListPromoteComponent implements OnInit {

  loading = false;
  idPost: string | null;
  post: Post;
  productAdCredit: ProductAdCredit[] = [];
  userCredit: UserCredit;

  postLoading: string[] = ["hola", "que", "tal", "hola", "que", "tal"];

  constructor(
    private postAdService: PostAdService,
    private productAdCreditService: ProductAdCreditService,
    private paymentOrderService: PaymentOrderService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private toolsService: ToolsService,
    private authService: AuthService,
    private dialogService: DialogService,
    private userCreditService: UserCreditService,
    private transactionCreditService: TransactionCreditService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.idPost = this.activatedRoute.snapshot.paramMap.get('id'); //console.log(this.idPost)
    if (this.idPost == 'undefined') {
      this.router.navigateByUrl('/panel/your-ads');
    } else {
      this.findAllPostCredit();
    }

  }

  findAllPostCredit() {
    const data = {
      Post: this.idPost
    }
    this.productAdCreditService.findAllPostCredit(data).subscribe(res => {
      if (res) {
        console.log(res);
        this.post = res.Post;
        this.productAdCredit = res.PostAdCredit;
        this.post = res.Post;
      } else {
        this.router.navigate(['/panel/create-ad/details/']);
      }
    });
    //}
  }

  async onProduct(item: ProductAdCredit) {

    try {
      this.userCredit = await this.userCreditService.getUserCreditCurrentLocal();

      this.loading = true;
      this.spinnerService.start();

      if (Number(item.credit) < Number(this.userCredit.current)) {
        // promote
        const data = {
          ProductAdCredit: item._id,
          Post: this.post._id
        }
        this.transactionCreditService.createAdBuy(data).subscribe(res => {
          if (res) {
            //this.router.navigateByUrl('/pu/' + this.post.slug);
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/panel/create-ad/manage/' + this.post._id]);
            this.spinnerService.close();

            this.userCreditService.clearUserCredit();
            this.loading = false;
          }
        });
      } else {
        //buy credit
        this.dialogService.toogleBuyCredit();
        this.spinnerService.close();
        this.loading = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  onProduct0(item: ProductAdCredit): void {

    this.loading = true;

    let production = false;
    const validExtensions = ['test@onlypu.com', 'rc486903@gmail.com', 'vcelina862@gmail.com'];

    if (validExtensions.includes(this.authService.user.email!)) {
      production = false;
    } else {
      production = true;
    }

    const data = {
      Post: this.idPost,
      dataProduct: item,
      production: production
    };

    this.paymentOrderService.createAdSale(data).subscribe(res => {
      if (res.ok == true) {
        this.openLinkPagePoviya(res.data);
        this.loading = false;
        //this.openLinkPageWhatsApp(res);
      }
    });
  }

  openLinkPagePoviya(data: any) {
    var a = document.createElement("a");
    //a.target = "_blank";
    let url = '';
    if (document.domain === 'localhost') {
      url = 'http://localhost:4200/on/' + data._id;
    } else if (document.domain === 'onlypu.com') {
      url = 'https://poviya.com/on/' + data._id;
    }
    window.open(url, '_blank');
    //a.href = url.trim();
    //a.click();
  }


  openLinkPageWhatsApp(data: any) {
    const msj = "Link de pago, "
      + " https://poviya.com/on/" + data._id;
    var a = document.createElement("a");

    //a.target = "_blank";
    const url = 'https://wa.me/' + data.User.phonePrefix + data.User.phone + '/?text=' + msj;
    window.open(url, '_blank');
    //a.href = url.trim();
    //a.click();
  }

  publishedFree(): void {
    const data: Post = {
      planAt: Date.now(),
      status: 'ACTIVE',
      published: true,
      plan: 0,
      publishedCount: Number(this.post.publishedCount ? this.post.publishedCount : 0 + 1)
    };
    this.postAdService.update(this.idPost!, data, []).subscribe(res => {
      if (res) {
        this.router.navigateByUrl('/pu/' + this.post.slug);
      }
    });
  }
}
