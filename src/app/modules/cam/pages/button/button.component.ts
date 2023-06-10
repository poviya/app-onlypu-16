import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'src/app/library/dialog/dialog.service';
import { ToastService } from 'src/app/library/toast/toast.service';
import { AuthService, TipService } from 'src/app/services';
import { Location } from '@angular/common';
import { Cam } from 'src/app/interfaces';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  dataTip: object;
  @Input() cam: Cam;

  constructor(
    private dialogService: DialogService,
    private toastService: ToastService,
    private tipService: TipService,
    public authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  get modalTipCollection() {
    return this.dialogService.modalTipCollection;
  }

  closeModalTipCollection() {
    this.dialogService.toogleTipCollection();
  }

  goBack(): void {
    this.location.back();
  }

  onTipDialog() {
    if (this.authService.user && this.cam) {
      if (this.authService.user._id != this.cam.User?._id) {
        this.dialogService.toogleTip();
        this.dataTip = {
          type: 'tip_cam',
          user: this.cam.User
        };
        this.tipService.create(this.dataTip);
      }
    }
  }

  onTipCollectionDialog() {
    if (this.authService.user && this.cam) {
      if (this.authService.user._id == this.cam.User?._id) {
        this.dialogService.toogleTipCollection();
        
      }
    }
  }
}
