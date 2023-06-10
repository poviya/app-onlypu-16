import { Component, OnInit } from '@angular/core';
import { Membership } from 'src/app/interfaces';
import { AuthService, MembershipService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-suscription',
  templateUrl: './main-suscription.component.html',
  styleUrls: ['./main-suscription.component.scss']
})
export class MainSuscriptionComponent implements OnInit {

  message: string;

  membership: Membership[] = [];
  membershipPrimary:  Membership[] = [];
  membershipBundles: Membership[] = [];

  constructor(private authService: AuthService, private membershipService: MembershipService) { }

  ngOnInit(): void {
    this.findAllUser();
  }

 

  receiveMessage($event: any) {
    this.message = $event
    console.log(this.message);
  }

  findAllUser(): void {
    if( this.authService.user)
    {
      const data = {
        User: this.authService.user._id
      };
      this.membershipService.findAllUser(data).subscribe(res => {
        if(res.length > 0) {
          this.membership = res;
          this.membershipPrimary = this.membership.filter(res => res.quantyTime == 1);
          this.membershipBundles = this.membership.filter(res => res.quantyTime == 3 || res.quantyTime == 6 || res.quantyTime == 12);
        } 
      })
    }
  }

  onCreateMembership($event: any) {
    const data = {
      credit: Number($event.credit),
    }
    this.membershipBundles = [];
    this.membershipService.create(data).subscribe(res => {
      if(res) {
        this.findAllUser();
      }
    })

  }

  onUpdateMembership($event: any) {
    const data = {
      credit: Number($event.credit),
    }
    this.membershipBundles = [];
    this.membershipService.updateMembership(data).subscribe(res => {
      if(res) {
        this.findAllUser();
      }
    })

  }

  onUpdateDiscount($event: any) {
    const data = {
      id: $event.id,
      discount: Number($event.discount)
    };
    this.membershipService.updateDiscount(data).subscribe(res => {
      if(res) {
        console.log(res);
      }
    });
  }
}
