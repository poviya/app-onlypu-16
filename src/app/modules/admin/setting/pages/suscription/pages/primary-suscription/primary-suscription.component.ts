import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumericValidator, pricePrimary } from 'src/app/common/custom-validators.ts';
import { Membership, User } from 'src/app/interfaces';
import { AuthService, UserService } from 'src/app/services';

@Component({
  selector: 'app-primary-suscription',
  templateUrl: './primary-suscription.component.html',
  styleUrls: ['./primary-suscription.component.scss']
})
export class PrimarySuscriptionComponent implements OnInit, AfterViewInit {

  message: string = "Hola Mundo!"

  @Output() updateMembershipEvent = new EventEmitter<string>();
  @Output() createMembershipEvent = new EventEmitter<string>();

  myform: FormGroup;
  @Input() user: User;
  @Input() membership: Membership[];

  constructor(
    private fb: FormBuilder) {
     }

  ngOnInit(): void {
    this.createFormControls();
  }

  ngAfterViewInit(): void {
    this.findPayment();
    //this.sendMessage();
  }

  createFormControls() {
    this.myform = this.fb.group({
      credit: [0, [Validators.required, pricePrimary]],
     });
  }

  findPayment() {
    if(this.membership.length > 0)
    {
      this.myform.patchValue({
        credit: this.membership[0].credit ? Number(this.membership[0].credit) : 0
      });
    }

  }

  sendMessage() {
    //this.messageEvent.emit(this.message)
  }
  
  onSubmit(): void {
    if(this.membership.length > 0)
    {
      this.updateMembershipEvent.emit(this.myform.getRawValue());
    } else {
      this.createMembershipEvent.emit(this.myform.getRawValue());
    }
  }
}
