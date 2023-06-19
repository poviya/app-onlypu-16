import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumericValidator, NumericValidatorTip } from 'src/app/common/custom-validators.ts';
import { Money, Post, User, UserCredit } from 'src/app/interfaces';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { ModalService } from 'src/app/library/modal';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { ToastService } from 'src/app/library/toast/toast.service';
import { AuthService, MoneyService, PaymentOrderService, TipService, TransactionCreditService, UserCreditService } from 'src/app/services';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {

  loading: boolean = false;
  //dataTip: any;
  myform: FormGroup;
  money: Money;
  userCredit: UserCredit;

  constructor(
    private fb: FormBuilder,
    private moneyService: MoneyService,
    private toastService: ToastService,
    private authService: AuthService,
    private dialogService: DialogService,
    private transactionCreditService: TransactionCreditService,
    private tipService: TipService,
    private userCreditService: UserCreditService,
    private spinnerService: SpinnerService,
    public router: Router,
  ) {

  }

  ngOnInit(): void {
    this.createFormControls();
    //this.userCreditFinOne();
  }


  async userCreditFinOne() {
    try {
      this.userCredit = await this.userCreditService.credit;
      console.log('userCredit', this.userCredit);
    } catch (error) {
      console.error(error);
    }
  }

  get dataTip() {
    //console.log(this.tipService.tip.user.Profile);
    return this.tipService.tip;
  }

  createFormControls() {
    this.myform = this.fb.group({
      amount: [1, [Validators.required, NumericValidatorTip]],
      message: ['', [Validators.nullValidator]]
    });
  }

  prinImages(images: any) {
    return images[0]['url'];
  };

  findOneMoney() {
    const data = {
      iso: 'USD'
    }
    this.moneyService.findOneIso(data).subscribe(res => {
      if (res) {
        this.money = res;
      }
    })
  }

  closeModal() {
    this.dialogService.toogleTip();
  }

  async onSubmit0() {
    this.dialogService.toogleTip();

    this.userCreditService.clearUserCredit();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  async onSubmit() {
    try {
      this.dialogService.toogleTip();

      if(!this.authService.user)
      {
        this.router.navigateByUrl('auth/login');
        return;
      }

      this.userCredit = await this.userCreditService.getUserCreditCurrentLocal();
      this.loading = true;

      this.spinnerService.start();

      if (!this.userCredit) {

        const data = {
          User: this.authService.user._id
        }
        this.userCreditService.create(data).subscribe(res => {
          if (res) {
            this.dialogService.toogleBuyCredit();
            this.spinnerService.close();
          }
        });
        return;
      }

      if (Number(this.myform.value.amount) <= Number(this.userCredit.current)) {

        let data;

        if (this.dataTip.type == 'tip_account') {
          data = {
            Receiver: this.dataTip.user!._id,
            amountCredit: Number(this.myform.value.amount)
          }

          this.transactionCreditService.createTransferTipAccount(data).subscribe(res => {
            if (res) {

              this.toastService.start('tipWasSent');
              setTimeout(() => this.toastService.close(), 2000);
              this.spinnerService.close();
              this.myform.patchValue({
                amount: Number(1),
              });
            }
          });
        }


        if (this.dataTip.type == 'tip_post') {
          data = {
            Post: this.dataTip.post!._id,
            amountCredit: Number(this.myform.value.amount)
          }

          this.transactionCreditService.createTransferTipPost(data).subscribe(res => {
            if (res) {
              this.toastService.start('tipWasSent');
              setTimeout(() => this.toastService.close(), 2000);
              this.spinnerService.close();
              this.myform.patchValue({
                amount: Number(1),
              });
            }
          });
        }

        if (this.dataTip.type == 'tip_cam') {
          data = {
            Receiver: this.dataTip.user!._id,
            amountCredit: Number(this.myform.value.amount)
          }
          console.log(data);
          this.transactionCreditService.createTransferTipCam(data).subscribe(res => {
            if (res) {

              this.toastService.start('tipWasSent');
              setTimeout(() => this.toastService.close(), 2000);
              this.spinnerService.close();
              this.myform.patchValue({
                amount: Number(1),
              });
            }
          });
        }

        this.spinnerService.close();

      } else {
        //buy credit
        this.dialogService.toogleBuyCredit();
        this.spinnerService.close();
      }
    } catch (error) {
      console.error(error);
    }
  }



  get modalTip() {
    return this.dialogService.modalTip;
  }

  closeModalTip() {
    this.dialogService.toogleTip();
  }

  // onTipDialog(post: Post) {
  //   this.dialogService.toogleTip();
  //   this.dataTip = {
  //     type: 'tip_post',
  //     post: post,
  //     user: post.User
  //   };

  //   this.tipService.create(this.dataTip);
  // }
}
