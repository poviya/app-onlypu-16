import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumericValidator } from 'src/app/common/custom-validators.ts';
import { User } from 'src/app/interfaces';
import { AuthService, CountryService } from 'src/app/services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  edit = false;
  myform: FormGroup;
  @Input() user: User;
  countries: any;

  constructor(
    private countryService: CountryService,
    private fb: FormBuilder,
    public router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.createFormControls();
    this.countriesAll();
    this.userFindOne();
  }

  createFormControls() {
    this.myform = this.fb.group({
      phonePrefix: ['+1', Validators.required],
      phone: ['', [Validators.required, NumericValidator]],
     });
  }

  userFindOne()
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
        phonePrefix: this.user?.phonePrefix ? this.user.phonePrefix: '+1',
        phone: this.user?.phone ? this.user.phone : ''
      });
    }
  }

  countriesAll()
  {

    this.countryService.findAll().subscribe(res => {
     if(res) {
      this.countries = res;
      this.myform.patchValue({
        //Country: data.Country,
      });
     } else {
      this.countries = [];
     }
    });
  }

  onSubmit(): void
  {
    if (this.myform.valid) {
      const user = this.authService.user;
      this.userService.update(user._id, this.myform.getRawValue()).subscribe( res => {
        if(res.ok == true)
        {
          this.edit = false;
          this.user.phonePrefix = this.myform.value.phonePrefix;
          this.user.phone = this.myform.value.phone;
        }
      });
    }
  }

  onChangeEdit() {
    this.edit = true;
    if(this.user)
    {
      this.myform.patchValue({
        username: this.user?.username,
      });
    }
  }

  onCancel() {
    this.edit = false;
  }
}
