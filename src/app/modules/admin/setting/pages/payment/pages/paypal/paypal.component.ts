import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserTransfer } from 'src/app/interfaces';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { UserTransferService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit, AfterViewInit{

  @Output() updatePaypalEvent = new EventEmitter<string>();
  @Output() createPaypalEvent = new EventEmitter<string>();
  @Input() userTransfer: UserTransfer;
  myform: FormGroup;

  constructor(
    private spinnerService: SpinnerService,
    private userTransferService: UserTransferService,
    private fb: FormBuilder,
    ) { }

  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
    this.createFormControls();
    this.findPayment();
  }

  createFormControls() {
    this.myform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
     });
  }

  findPayment() {
    if(this.userTransfer)
    {
      this.myform.patchValue({
        email: this.userTransfer.details!.email
      });
    }

  }

  onSubmit(): void {
    this.spinnerService.start();
    if(this.userTransfer) {
      const data = {
        Money: environment.money,
        email: this.myform.value.email
      }
      //this.updatePaypalEvent.emit(dataSend);
      this.clearMyform();

      this.userTransferService.updatePaypal(this.userTransfer._id!, data).subscribe(res => {
        if(res) {
          this.userTransfer = res;
          this.findPayment();
          this.spinnerService.close();
        }
      })

    } else {
      const data: any = {
        Money: environment.money,
        email: this.myform.value.email
      }
      //this.createPaypalEvent.emit(data);
      this.clearMyform();

      this.userTransferService.createPaypal(data).subscribe(res => {
        if(res) {
          this.userTransfer = res;
          this.findPayment();
          this.spinnerService.close();
        }
      })
    }
  }

  clearMyform() {
    this.myform.patchValue({
      email: null,
    });
  }
}
