import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToolsService } from './tools.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { UserCredit } from '../interfaces';
import { Headers } from 'src/app/common/http-headers';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserCreditService {

  url = 'user-credit';

  userCreditData: UserCredit;
  
  constructor(
    private http: HttpClient,
    private toolsService: ToolsService,
    private authService: AuthService,
  ) 
  { 
    
  }

  
  create(data: any): Observable<UserCredit> {

    return this.http.post<UserCredit>(environment.api + this.url + '/', data,  Headers.HttpOptions());
  }

  findOneUser(): Observable<UserCredit> {
    return this.http.get<UserCredit>(environment.api + this.url + '/find-one-user', Headers.HttpOptions());
  }

  get credit() {
    return this.userCreditData;
  }

  async getUserCreditCurrentLocal(): Promise<UserCredit> {

    try {
      const res = await this.findOneUser().toPromise();
      return res!;
    } catch (error) {
      console.error(error);
      throw error;
    }

    // let userCreditData = JSON.parse(localStorage.getItem('user_credit')!);
    // if (userCreditData) {
    //   return userCreditData;
    // } else {
    //   try {
    //     const res = await this.findOneUser().toPromise();
    //     localStorage.setItem('user_credit', JSON.stringify(res));
    //     return res!;
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // }
  }

  async clearUserCredit() {
    try {
      localStorage.removeItem('user_credit');
      const res = await this.getUserCreditCurrentLocal();
      this.userCreditData = res;
      return res!;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}