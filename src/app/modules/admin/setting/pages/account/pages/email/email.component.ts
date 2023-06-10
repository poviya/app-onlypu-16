import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumericValidator } from 'src/app/common/custom-validators.ts';
import { User } from 'src/app/interfaces';
import { AuthService, CountryService } from 'src/app/services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  exist = false;
  myform: FormGroup;
  user: User;
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
    this.userFindOne();
  }

  createFormControls() {
    this.myform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
     });
  }

  userFindOne()
  {
    const user = this.authService.user;
    this.userService.findOne(user._id).subscribe( res => {
      this.user = res!;
      this.myform.patchValue({
        email: this.user?.email,
      });
    });  
  }

  onSubmit(): void
  {
    if (this.myform.valid) {
      const user = this.authService.user;
      this.userService.updateUsername(this.myform.getRawValue()).subscribe( res => {
        if(!res)
        {
          this.router.navigateByUrl('/panel/setting');
        } else {
          this.exist = true;
        }
      });
    }
  }
}

