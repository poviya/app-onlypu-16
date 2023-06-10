import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-setting',
  templateUrl: './main-setting.component.html',
  styleUrls: ['./main-setting.component.scss']
})
export class MainSettingComponent implements OnInit {

  user: User;
  
  constructor(
    public router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { 
    
  }

  ngOnInit(): void {
    //this.userFindOne();
  }

  userFindOne()
  {
    const user = this.authService.user;
    this.userService.findOne(user._id).subscribe( res => {
      this.user = res!;  //console.log(res)
    });  
  }
}