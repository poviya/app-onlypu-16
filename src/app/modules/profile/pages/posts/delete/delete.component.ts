import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter', animate('300ms ease-in-out')),
      transition(':leave', animate('300ms ease-in-out')),
    ]),
  ],
})
export class DeleteComponent implements OnInit {

  @Output() onClose = new EventEmitter<void>();
  modalState = '';

  constructor() { }

  ngOnInit(): void {
    this.openModal();
  }
  
  closeModal() {
    this.modalState = 'void';
    setTimeout(() => {
      this.onClose.emit();
    }, 300);
  }

  openModal() {
    this.modalState = 'show';
  }

  

}
