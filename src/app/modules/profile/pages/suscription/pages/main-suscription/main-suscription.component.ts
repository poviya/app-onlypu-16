import { Component, Input, OnInit } from '@angular/core';
import { Membership, Suscription, User, UserCredit } from 'src/app/interfaces';
import { AuthService, MembershipService, PaymentOrderService, SuscriptionService, UserCreditService } from 'src/app/services';
import { Tools } from 'src/app/common/tools';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { ToastService } from 'src/app/library/toast/toast.service';

@Component({
  selector: 'app-main-suscription',
  templateUrl: './main-suscription.component.html',
  styleUrls: ['./main-suscription.component.scss']
})
export class MainSuscriptionComponent implements OnInit {

  loading: boolean;
  data: object;
  @Input() loadingUser: boolean;
  @Input() user: User;
  @Input() suscription: Suscription;

  message: string;

  @Input() membership: Membership[] = [];
  membershipPrimary: Membership[] = [];
  membershipBundles: Membership[] = [];

  userCredit: UserCredit;

  constructor(
    public router: Router,
    public authService: AuthService,
    private membershipService: MembershipService,
    private paymentOrderService: PaymentOrderService,
    private userCreditService: UserCreditService,
    private spinnerService: SpinnerService,
    private suscriptionService: SuscriptionService,
    private dialogService: DialogService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.findAllUser();
  }



  receiveMessage($event: any) {
    this.message = $event
    console.log(this.message);
  }

  findAllUser2(): void {
    if (this.membership.length > 0) {
      this.membershipPrimary = this.membership.filter(res => res.quantyTime == 1);
      this.membershipBundles = this.membership.filter(res => res.type == 'PAYMENT' && (res.quantyTime == 3 || res.quantyTime == 6 || res.quantyTime == 12));
    }
  }

  findAllUser0(): void {
    this.loading = true;
    if (this.user) {
      const data = {
        User: this.user._id
      };
      this.membershipService.findAllUserJoin(data).subscribe(res => {
        if (res) {
          this.suscription = res.suscription;
          if (!this.suscription) {
            console.log(1);
            this.membership = res!.membership;
            this.membershipPrimary = this.membership.filter(res => res.quantyTime == 1);
            this.membershipBundles = this.membership.filter(res => res.type == 'PAYMENT' && (res.quantyTime == 3 || res.quantyTime == 6 || res.quantyTime == 12));
          }
          this.loading = false;
        }
      })
    }
  }

  findAllUser(): void {
    this.membership = [];
    this.membershipPrimary = [];
    this.membershipBundles = [];
    this.loading = true;
    if (this.user) {
      this.membership = this.user!.Membership!;
      this.membershipPrimary = this.membership.filter(res => res.quantyTime == 1);
      this.membershipBundles = this.membership.filter(res => res.type == 'PAYMENT' && res.credit !== 0 && (res.quantyTime == 3 || res.quantyTime == 6 || res.quantyTime == 12));
      this.loading = false;
    }
  }

  async onCreateMembership($event: any) {

    if (this.authService.user) {
      this.spinnerService.start();
      this.userCredit = await this.userCreditService.getUserCreditCurrentLocal();
      const membership: Membership = $event.Membership;
      if (Number(membership.credit) <= Number(this.userCredit.current)) {
        const data = {
          Membership: membership._id,
          type: 'PAY',
          Join: this.user._id
        }
        this.suscriptionService.createSubscribers(data).subscribe(res => {
          if (res) {
            this.spinnerService.close();
            this.toastService.start('successfulSubscription');
            setTimeout(() => this.toastService.close(), 2000);
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/', this.user.username]);
          }
        });

      } else {
        this.dialogService.toogleBuyCredit();
        this.spinnerService.close();
      }
    }

  }

  onCreateMembershipFree($event: any) {
    const data = {
      Join: $event.Join,
      type: 'FREE'
    }
    this.suscriptionService.createSubscribers(data).subscribe(res => {
      if (res) {
        //location.reload(); 
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/', this.user.username]);
      }
    });
  }
}
