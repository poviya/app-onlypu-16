import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumeriDiscount } from 'src/app/common/custom-validators.ts';
import { Membership, User } from 'src/app/interfaces';
import { MembershipService } from 'src/app/services';

@Component({
  selector: 'app-bundles-suscription',
  templateUrl: './bundles-suscription.component.html',
  styleUrls: ['./bundles-suscription.component.scss']
})
export class BundlesSuscriptionComponent implements OnInit, AfterViewInit {

  @Output() updateDiscountEvent = new EventEmitter<string>();
  
  myformThree: FormGroup;
  myformSix: FormGroup;
  myformTwelve: FormGroup;

  dataThree: Membership | undefined;
  dataSix: Membership | undefined;
  dataTwelve: Membership | undefined;

  @Input() user: User;
  @Input() membership: Membership[];

  constructor(private fb: FormBuilder, private membershipService: MembershipService) { }

  ngAfterViewInit(): void {
    this.createFormControls();
    this.findPayment();
  }

  ngOnInit(): void {
  }

  createFormControls() {
    this.myformThree = this.fb.group({
      id: [null, Validators.required],
      discount: [0, [Validators.required, NumeriDiscount]],
     });

     this.myformSix = this.fb.group({
      id: [null, Validators.required],
      discount: [0, [Validators.required, NumeriDiscount]],
     });

     this.myformTwelve = this.fb.group({
      id: [null, Validators.required],
      discount: [0, [Validators.required, NumeriDiscount]],
     });
  }
  
  async findPayment() {
    if(this.membership)
    {
      this.dataThree = await this.membership.find(res => res.quantyTime == 3);
      this.myformThree.patchValue({
        id: this.dataThree!._id,
        discount: Number(this.dataThree!.discount)
      });
      this.dataSix = this.membership.find(res => res.quantyTime == 6);
      this.myformSix.patchValue({
        id: this.dataSix?._id,
        discount: Number(this.dataSix?.discount)
      });

      this.dataTwelve = this.membership.find(res => res.quantyTime == 12);
      this.myformTwelve.patchValue({
        id: this.dataTwelve?._id,
        discount: Number(this.dataTwelve?.discount)
      });

    }

  }

  onSubmit(quantyTime: any) {
    let data;
    if(quantyTime == 3) {
      data = this.myformThree.getRawValue();
    } else     if(quantyTime == 6) {
      data = this.myformSix.getRawValue();
    } else     if(quantyTime == 12) {
      data = this.myformTwelve.getRawValue();
    } else {
       return;
    }

    const dataSend = {
      id: data.id,
      discount: Number(data.discount)
    };

    this.membershipService.updateDiscount(dataSend).subscribe(res => {
      if(res) {
        if(res.quantyTime == 3) {
          this.dataThree = res;
        } else if(res.quantyTime == 6) {
          this.dataSix = res;
        } else if(res.quantyTime == 12)  {
          this.dataTwelve = res;
        }
        
      }
    });

    //this.updateDiscountEvent.emit(data);

  }
}
