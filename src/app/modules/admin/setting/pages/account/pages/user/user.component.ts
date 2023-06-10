import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumericValidator } from 'src/app/common/custom-validators.ts';
import { User } from 'src/app/interfaces';
import { AuthService, CountryService } from 'src/app/services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  edit = false;

  exist = false;
  myform: FormGroup;
  countries: any;
  @Input() user: User;
  
  constructor(
    private countryService: CountryService,
    private fb: FormBuilder,
    public router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.createFormControls();
    this.userFindOne();
  }

  createFormControls() {
    this.myform = this.fb.group({
      username: ['', Validators.required],
     });
  }

  userFindOne()
  {
    /*const user = this.authService.user;
    this.userService.findOne(user._id).subscribe( res => {
      this.user = res;
      this.myform.patchValue({
        username: res?.username,
      });
    }); 
    */
    if(this.user)
    {
      this.myform.patchValue({
        username: this.user?.username,
      });
    }
  }

  onSubmit(): void
  {
    if (this.myform.valid) {
      const user = this.authService.user;
      const data = {
        username: this.myform.value.username.trim()
      }
      this.userService.updateUsername(data).subscribe( res => {
        if(res)
        { 
          this.user.username = this.myform.value.username;
          this.authService.addLocalStorateUser(res);
          this.edit = false;
          location.reload(); 
        } else {
          this.exist = true;
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

