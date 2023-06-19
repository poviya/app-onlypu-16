import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumeriDiscount } from 'src/app/common/custom-validators.ts';
import { Membership, User } from 'src/app/interfaces';
import { AuthService, MembershipService } from 'src/app/services';

@Component({
  selector: 'app-bundles-suscription',
  templateUrl: './bundles-suscription.component.html',
  styleUrls: ['./bundles-suscription.component.scss']
})
export class BundlesSuscriptionComponent implements OnInit, AfterViewInit {

  @Output() createMembershipEvent = new EventEmitter<string>();
  
  myformThree: FormGroup;
  myformSix: FormGroup;
  myformTwelve: FormGroup;

  dataThree: Membership | undefined;
  dataSix: Membership | undefined;
  dataTwelve: Membership | undefined;

  @Input() user: User;
  @Input() membership: Membership[];

  constructor(
        private fb: FormBuilder, 
        public router: Router,
        private authService: AuthService,
        private membershipService: MembershipService) { }

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

  onSubmit(membership: Membership): void { 
    if(this.authService.user && this.membership.length > 0)
    {
      const data: any = {
        Membership: membership,
        //Receiver: this.membership[0].User?._id,
      }
      this.createMembershipEvent.emit(data);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
