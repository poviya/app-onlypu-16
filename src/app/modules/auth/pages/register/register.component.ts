import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator, NumericValidator } from 'src/app/common/custom-validators.ts';
import { Country, StateCity } from 'src/app/interfaces';
import { ToastService } from 'src/app/library/toast/toast.service';
import { AppService, CountryService, ToolsService } from 'src/app/services';

import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
//import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  exist = false;
  msg = false;
  useExists: boolean;
  ipapi: any;

  countries: Country[]; 
  stateCitiesAll: StateCity[]; 

  myform: FormGroup = this.fb.group({
    gender: ['', Validators.required],
    email:    ['', [ Validators.required, Validators.email ]],
    terms: [false, Validators.requiredTrue],
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

  constructor( private fb: FormBuilder,
               private router: Router,
               private countryService: CountryService,
               private toolsService: ToolsService,
               private toastService: ToastService,
               private appService: AppService,
               private authService: AuthService ) {
               
                }


  ngOnInit(): void {
    
  }

  async onCountry(e: any) {
    const data = {
      Country: e.target.value,
    };
    
    const dataStateCities = await this.appService.appStateCitiesfindAll().toPromise();
    this.stateCitiesAll = dataStateCities!.filter( res => res.Country === data.Country);
    /*
    this.stateCityService.findAllCountry(data).subscribe(res => {
      this.stateCitiesAll = res;  //console.log(res);
      //this.defaultStateCity();
    });

    this.adCategoryService.findAllCountry(data).subscribe(res => {
      this.adCategories = res;  //console.log(res);
    });
    */
    this.myform.patchValue({
      StateCity: "",
      CityZone: "",
      AdCategory: ""
    });
  }

  register() {
  
    const data = {
      gender: this.myform.value.gender,
      email: this.myform.value.email.trim(),
      password: this.myform.value.password.trim(),
      //phonePrefix: this.myform.value.phonePrefix,
      //phone: this.myform.value.phone,
      //whatsapp: true,
      Site: environment.site
    }
    this.authService.register(data )
        .subscribe(res => {
        if ( res.data.useExists!) {
          this.toastService.start('email_already_exists');
          setTimeout( () => this.toastService.close(), 2000 );
          this.useExists = true;
        } else if ( res.ok == true) {
          this.router.navigateByUrl('auth/verified-account');
        }else {
          //Swal.fire('Error', ok, 'error');
        }
      });

  }

  findAllCountry()
  {
    this.appService.appCountryfindAll().subscribe(async res => {
      this.countries = res!.filter( countries => countries.activeOnlypu === true);;
      this.phoneLocation();
      const dataStateCities = await this.appService.appStateCitiesfindAll().toPromise();
      //this.stateCitiesAll = dataStateCities!.filter( res => res.Country === Country);
      //console.log(this.ipapi)
      
      //this.defaultStateCity();
    });
  }

  
  phoneLocation()
  {
    this.myform.patchValue({
      phonePrefix: '+1',
    });
    /*
    this.ipapi = this.toolsService.ipapi;
   
    if(!this.ipapi)
    {
      this.myform.patchValue({
        phonePrefix: '+1',
      });
    } else { 
      this.myform.patchValue({
        phonePrefix: '+' + this.ipapi['location']['calling_code'],
      });
    }*/
  }
}
