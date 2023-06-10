import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlValidator } from 'src/app/common/custom-validators.ts';
import { UserTransfer } from 'src/app/interfaces';
import { SpinnerService } from 'src/app/library/spinner/spinner.service';
import { UserTransferService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-link-pay',
  templateUrl: './link-pay.component.html',
  styleUrls: ['./link-pay.component.scss']
})
export class LinkPayComponent implements OnInit {

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
      amount: [20, [Validators.required]],
      link: ['', [Validators.required, UrlValidator]],
     });
  }

  findPayment() {
    if(this.userTransfer)
    {
      this.myform.patchValue({
        link: this.userTransfer.details!.link
      });
    }

  }

  onSubmit(): void {
    this.spinnerService.start();
    if(this.userTransfer) {
      const data = {
        Money: environment.money,
        link: this.myform.value.link
      }
      //this.updatePaypalEvent.emit(dataSend);
      this.clearMyform();

      this.userTransferService.updateLinkPay(this.userTransfer._id!, data).subscribe(res => {
        if(res) {
          this.userTransfer = res;
          this.findPayment();
          this.spinnerService.close();
        }
      })

    } else {
      const data: any = {
        Money: environment.money,
        link: this.myform.value.link
      }
      //this.createPaypalEvent.emit(data);
     
      this.clearMyform();
      this.userTransferService.createLinkPay(data).subscribe(res => {
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
      amount: 0,
      link: null,
    });
  }
}

