import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/common/custom-validators.ts';
import { User } from 'src/app/interfaces';
import { AuthService, CountryService } from 'src/app/services';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  edit = false;

  exist = false;
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
  }

  createFormControls() {
    this.myform = this.fb.group({
      
      password: [ null, Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        //CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        //CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        //CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        //CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':"|,.<>/?]/>), { hasSpecialCharacters: true }),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(6)])
     ],
     confirmPassword: [null, [Validators.required]]

     },
     {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
      }

     );
  }

  onSubmit(): void
  {
    if (this.myform.valid) {
      const user = this.authService.user;
      const data = {
        password: this.myform.getRawValue().password
      }

      this.userService.update(user._id, data).subscribe( res => {
        if(res.status)
        {
          this.authService.logout();
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


