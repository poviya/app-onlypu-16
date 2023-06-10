import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  constructor( private toastService: ToastService) {}
  
  get message() {
    return this.toastService.message;
  }

}
