import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumericValidator } from 'src/app/common/custom-validators.ts';
import { StateCity, User } from 'src/app/interfaces';
import { AppService, AuthService, CountryService } from 'src/app/services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styleUrls: ['./info-personal.component.scss']
})
export class InfoPersonalComponent implements OnInit {

  edit = false;
  myform: FormGroup;
  @Input() user: User;

  countries: any;
  stateCitiesAll: StateCity[]; 

  constructor(
    private countryService: CountryService,
    private fb: FormBuilder,
    public router: Router,
    private userService: UserService,
    private authService: AuthService,
    private appService: AppService,
  ) { }
  ngOnInit(): void {
    this.createFormControls();
    this.userFindOne();
  }

  createFormControls() {
    this.myform = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      bio: ['', Validators.required],
     });
  }

  async userFindOne()
  {
    /*const user = this.authService.user;
    this.userService.findOne(user._id).subscribe( res => {
      this.user = res;  console.log(res);
      this.myform.patchValue({
        phonePrefix: res?.phonePrefix ? res.phonePrefix: '+1',
        phone: res?.phone ? res.phone : ''
      });
    });  
    */
    if(this.user)
    {
      this.myform.patchValue({
        name: this.user?.name ? this.user.name : '',
        gender: this.user?.gender ? this.user.gender : '',
        bio: this.user?.gender ? this.user.bio : ''
      });
    }
  }

  onSubmit(): void
  {
    if (this.myform.valid) {
      const user = this.authService.user;
      this.userService.update(user._id, this.myform.getRawValue()).subscribe( res => {
        if(res)
        {
          this.edit = false;
          this.user = res;
        }
      });
    }
  }

  async onChangeEdit() {
    this.edit = true;
  }

  onCancel() {
    this.edit = false;
  }
}

