import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces';
import { AuthService, UserService } from 'src/app/services';

@Component({
  selector: 'app-main-account',
  templateUrl: './main-account.component.html',
  styleUrls: ['./main-account.component.scss']
})
export class MainAccountComponent implements OnInit {

  user: User;
  
  constructor(
      private userService: UserService, 
      private authService: AuthService) { }

  ngOnInit(): void {
    this.userFindOne(); 
  }

  userFindOne()
  {
    const user = this.authService.user;
    this.userService.findOne(user._id).subscribe( res => {
      this.user = res!;  
    });  
  }
}
