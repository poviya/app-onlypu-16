import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tools } from 'src/app/common/tools';
import { Cam, Money, PaymentOrder, Suscription, User } from 'src/app/interfaces';
import { ModalService } from 'src/app/library/modal/modal.service';
import { AuthService, ChatService, MoneyService, PaymentOrderService, TipService } from 'src/app/services';
import { TipComponent } from '../../../tip/tip.component';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { ToastService } from 'src/app/library/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isActive: boolean;

  loading: boolean;
  dataTip: object;
  @Input() loadingUser: boolean;
  @Input() user: User;
  @Input() suscription: Suscription;

  money: Money;
  paymentOrder: PaymentOrder;

  constructor(
    public router: Router,
    public authService: AuthService,
    private paymentOrderService: PaymentOrderService,
    private modalService: ModalService,
    private chatService: ChatService,
    private spinnerService: SpinnerService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private moneyService: MoneyService,
    private tipService: TipService,
  ) { }

  ngOnInit(): void {
  }

  get modalDelete() {
    return this.dialogService.modalDelete;
  }

  closeModalDelete() {
    this.dialogService.toogleDelete();
  }

  get modalTip() {
    return this.dialogService.modalTip;
  }

  closeModalTip() {
    this.dialogService.toogleTip();
  }


  prinImages(images: any) {
    return images[0]['url'];
  };

  onSetting() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/panel/setting/personalization']);

  }

  innerText(text: any) {
    if (text)
      return Tools.innerText(text);
  }

  onTipAccount() {

  }

  /************** tip */
  onTipDialog() {
    this.dialogService.toogleTip();
    this.dataTip = {
      type: 'tip_account',
      user: this.user
    };

    this.tipService.create(this.dataTip);
  }

  onCreateChat() {
    if (this.authService.user) {

      if (!this.suscription) {
        this.dialogService.toogleTip();
        this.dataTip = {
          type: 'tip_account',
          user: this.user
        };
        this.tipService.create(this.dataTip);
      } else {
        const data = {
          UserTwo: this.user._id
        }
        this.chatService.create(data).subscribe(res => {
          if (res) {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            //this.router.navigate(['/chat/messages', res._id]);
          }
        });
      }
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  openModal(value: any) {
    value.active = true
  }

  closeModal(value: any) {
    value.active = false
  }

  copyText() {
    const textToCopy = " https://onlypu.com/" + this.user.username;
    navigator.clipboard.writeText(textToCopy).then(() => {
      this.toastService.start('copied_link');
      setTimeout(() => this.toastService.close(), 2000);
      console.log('El texto ha sido copiado al portapapeles');
    }, (err) => {
      console.error('Error al copiar el texto al portapapeles: ', err);
    });
  }

  onCam(): void {
    if (this.authService.user) {
      if (!this.suscription) {
        this.dialogService.toogleTip();
        this.dataTip = {
          type: 'tip_account',
          user: this.user
        };
        this.tipService.create(this.dataTip);
      } else {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/cam'],
          { queryParams: { roomID: this.user.Cam!.roomId } });
      }
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  compartir() {
    if (navigator.share) {
      navigator.share({
        title: this.user.username,
        text: this.user.bio,
        url: " https://onlypu.com/" + this.user.username
      })
        .then(() => console.log('Contenido compartido exitosamente'))
        .catch((error) => console.log('Error al compartir:', error));
    } else {
      console.log('La API de Web Share no está disponible en este navegador');
    }
  }
}

