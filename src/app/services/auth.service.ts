import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { AuthResponse, ResponseApi, User } from '../interfaces';
import { Router } from '@angular/router';
import { Headers } from 'src/app/common/http-headers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url  = `auth`;
  private baseUrl: string = environment.api;

  constructor( private http: HttpClient, private router: Router,  @Inject(PLATFORM_ID) private platformId: object,) { }

  register(data: any): Observable<any> { 
    //return this.http.post<any[]>(environment.api + 'user', data);
    const url  = `${ this.baseUrl }auth/register`;


    return this.http.post<AuthResponse>( url, data )
      .pipe(
        tap( resp => {
          if ( resp.ok === true ) {
              //const helper = new JwtHelperService();
              //const decoded = helper.decodeToken(resp.access_token);
              localStorage.setItem('access_token', resp.data?.access_token!);
              localStorage.setItem('user', JSON.stringify(resp.data.user!));
              //localStorage.setItem('country', JSON.stringify(resp.data.user?.Country!));
          }
          
        }),
        map( resp => resp ),
        catchError( err => of(err.error.msg) )
      );
  }

  login( username: string, password: string, Site: string ) {
    
    const url  = `${ this.baseUrl }auth/login`;
    const body = { username, password, Site };

    return this.http.post<ResponseApi>( url, body )
      .pipe(
        tap( resp => {
          if ( resp.ok == true ) {
            //const helper = new JwtHelperService();
            //const decoded = helper.decodeToken(resp.access_token);
            localStorage.setItem('access_token', resp.data?.access_token!);
            localStorage.setItem('user', JSON.stringify(resp.data?.user!));
          }
          
        }),
        map( resp => resp ),
        catchError( err => of(err.error.msg) )
      );
  }
  // verified-account

  verifiedAccount(data: any): Observable<any> {

    return this.http.post<any>(environment.api + 'auth/verified-account', data, Headers.HttpOptions());
  }

  get getToken(): any {
    return localStorage.getItem('access_token');
  }

  // VERIFICAR SI ESTA CONECTADO CON TOKEN
  get connected(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  // VERIFICAR SI ESTA CADUCADO EL TOKEN
  get expired(): boolean {

    /*const helper = new JwtHelperService();
    console.log(helper.isTokenExpired(this.getToken));
    return helper.isTokenExpired(this.getToken);*/
    return true;
  }

  authTemporal(data: any) {
    localStorage.setItem('auth_temporal', JSON.stringify(data));
  }

  authAccess(){
    const data = JSON.parse(localStorage.getItem('auth_temporal')!);
    localStorage.setItem('access_token', data?.access_token!);
    localStorage.setItem('user', JSON.stringify(data.user!));
  }

  addLocalStorateUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  get user(): User {
   
    const user = JSON.parse(localStorage.getItem('user')!);
    if(user == 'undefined' || !user) {
      //localStorage.clear();
      return user;
    } else {
      //const userData = JSON.parse(user);
      //return userData;
      return user;
    }
    
  }

  logout() {
    this.router.navigateByUrl('/auth/login');
    //localStorage.removeItem('access_token');
    //localStorage.removeItem('user');
    localStorage.clear();
    /*if(this.router.url == '/')
    {
      location.reload(); 
    }*/
  }
  
  get tokenExpired() {
    //console.log(this.getToken)
    if(this.getToken)
    {
      /*const expiry = (JSON.parse(atob(this.getToken.split('.')[1]))).exp;
      const res= (Math.floor((new Date).getTime() / 1000)) >= expiry;
      //console.log(new Date(Math.floor((new Date).getTime() / 1000)))
      //console.log(new Date(expiry));
      console.log(res);
      return res;*/
      return false;
    } else {
      return true;
    }
  }

  sendCodeEmail(): Observable<User> {
    const data = {};
    return this.http.post<User>(environment.api + this.url + '/send-code-email', data, Headers.HttpOptions());
  }

  /*
  validarToken(): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );

    return this.http.get<AuthResponse>( url, { headers } )
        .pipe(
          map( resp => {
            localStorage.setItem('token', resp.access_token! );
            this._user = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!
            }

            return resp.ok;
          }),
          catchError( err => of(false) )
        );

  }
  */

}
