import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable,of} from 'rxjs';
import {LoginData} from '../_model/login-data';
import {environment} from '../../environments/environment';
import {postData} from './servercall.service';
import {MyShopsException, ServerError} from '../myshopsexceptions';
import {Router} from '@angular/router';
import {ReturnData} from './servercall.service';
import {UserData} from '../_model/User';
import {ErrorData} from '../_model/error-data';
import {BaseService} from './base.service';
import {getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem} from '../tools/common/common';
import {NotificationService} from './notification.service';

export const authenticationUrl = 'auth/login';
export const loggedUserLSID = 'loggedUser';

export class JwtToken {
  jwtHeader: string;
  jwtClaims: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService{

  public currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  public loggedSubject: BehaviorSubject<boolean>;
  public logged$: Observable<boolean>;

  static getLocalLoggedUser(): string {
    const user =  getLocalStorageItem(loggedUserLSID);
    return user;
  }

  static decodeJWT(jwtToken: string): JwtToken  {

    if(!jwtToken) {
      return null;
    }
    let tokens = jwtToken.split(' ');

    tokens = tokens[1].split('.')
    let jwtHeader = window.atob(tokens[0]);
    let jwtClaims = window.atob(tokens[1]);
    jwtHeader = JSON.parse(jwtHeader);
    jwtClaims = JSON.parse(jwtClaims);
    // console.log(jwtHeader);
    // console.log(jwtClaims);
    const retObj = new JwtToken();
    retObj.jwtClaims = jwtClaims;
    retObj.jwtHeader = jwtHeader;
    return retObj;
  }

  // @ts-ignore
  constructor(private router: Router) {
    super();
    const user: string = AuthenticationService.getLocalLoggedUser();
    this.currentUserSubject = new BehaviorSubject<string>(user);
    this.currentUser = this.currentUserSubject.asObservable();

    const logged = false;
    this.loggedSubject = new BehaviorSubject<boolean>(logged);
    this.logged$ = this.loggedSubject.asObservable();

  }

  get currentUserObservable(): Observable<string> {
    return this.currentUserSubject.asObservable();
  }

  get loggedObservable(): Observable<boolean>{
    return this.loggedSubject.asObservable();
  }

  login(loginData: LoginData): void {
      this.postData(authenticationUrl,loginData,onSuccessLogin,onErrorLogin,this);
  }



  logout(returnUrl?: string) {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login'], returnUrl ? {queryParams: {returnUrl}} : undefined);
  }

}

export function onSuccessLogin(retData: any, serviceObject: AuthenticationService): void {

  retData.rspObject.headers.forEach((val, key) => {
    // console.log(key, val);
    // console.log(environment);

    if (key.toUpperCase() === environment.authorizationHeaderName.toUpperCase()) {
      setLocalStorageItem(environment.authorizationHeaderName,val);
      const jwtToken = AuthenticationService.decodeJWT(val);
      serviceObject.loggedSubject.next(true);
      setLocalStorageItem(loggedUserLSID,jwtToken.jwtClaims.identity);
      serviceObject.currentUserSubject.next(jwtToken.jwtClaims.identity);
      console.log(jwtToken);
    }
  });
}

export function onErrorLogin(retData: any, serviceObject: AuthenticationService): void {
  // console.log('onErrorLogin');
  removeLocalStorageItem(environment.authorizationHeaderName);
  removeLocalStorageItem(loggedUserLSID);
  serviceObject.loggedSubject.next(false);
  serviceObject.currentUserSubject.next('');
}

