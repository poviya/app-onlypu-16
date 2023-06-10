import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumericValidator } from 'src/app/common/custom-validators.ts';
import { User } from 'src/app/interfaces';
import { AuthService, ToolsService } from 'src/app/services';

@Component({
  selector: 'app-verified-account',
  templateUrl: './verified-account.component.html',
  //styleUrls: ['./verified-account.component.scss']
})
export class VerifiedAccountComponent implements OnInit {

  ok: boolean = true;
  userData: User;
  
  myform: FormGroup = this.fb.group({
    codeVerified: ['', [ Validators.required, Validators.minLength(6), NumericValidator ]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private toolsService: ToolsService,
               private authService: AuthService ) {
               
                }

  ngOnInit(): void {
  }

  get user() {
    return this.authService.user; 
  }

  register(): void {
    const data = {
      codeVerified: this.myform.value.codeVerified,
    }
    this.authService.verifiedAccount(data).subscribe(ok => {
        if(!ok)
        {
          this.ok = false;

        } else {
          this.router.navigateByUrl('/');
          this.ok = true;
        }
    });
  }

  onSendCodeEmail() {
    this.authService.sendCodeEmail().subscribe(res => {
      if(res) {
        console.log('Send email');
      }
    });
  }

}
