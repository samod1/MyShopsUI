import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable,of} from 'rxjs';
import {LoginData} from '../_model/login-data';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {BaseService} from './base.service';
import {getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem} from '../tools/common/common';

export const authenticationUrl = 'auth/login';
export const loggedUserLocalStorageUID = 'loggedUser';
export const authIsLoggedUrl = 'auth/isLogged';

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
    const user =  getLocalStorageItem(loggedUserLocalStorageUID);
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

    this.loggedSubject = new BehaviorSubject<boolean>(null);
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

  logout() {
    localStorage.removeItem(loggedUserLocalStorageUID);
    localStorage.removeItem(environment.authorizationHeaderName);
    this.loggedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
  }

  isLogged(): void {

    if(this.router.url === 'register'){
      return;
    }

    const _jwt  = getLocalStorageItem(environment.authorizationHeaderName);
    if(!_jwt){
      this.logout();
      return ;
    }
    this.getData(authIsLoggedUrl,null,onSuccessIsLogin,null,this);
  }
}

export function onSuccessLogin(retData: any, serviceObject: AuthenticationService): void {

  retData.rspObject.headers.forEach((val, key) => {
    // console.log(key, val);
    // console.log(environment);

    if (key.toUpperCase() === environment.authorizationHeaderName.toUpperCase()) {
      setLocalStorageItem(environment.authorizationHeaderName,val);
      const jwtToken = AuthenticationService.decodeJWT(val);
      setLocalStorageItem(loggedUserLocalStorageUID,jwtToken.jwtClaims.identity);
      serviceObject.currentUserSubject.next(jwtToken.jwtClaims.identity);
      serviceObject.loggedSubject.next(true);
    }
  });
}

export function onErrorLogin(retData: any, serviceObject: AuthenticationService): void {
  // console.log('onErrorLogin');
  removeLocalStorageItem(environment.authorizationHeaderName);
  removeLocalStorageItem(loggedUserLocalStorageUID);
  serviceObject.loggedSubject.next(false);
  serviceObject.currentUserSubject.next('');
}

export function getLoggedUserName(): string{
  const uname = getLocalStorageItem(loggedUserLocalStorageUID);
  return uname;
}

export function onSuccessIsLogin(retData: any, serviceObject: AuthenticationService): void {
  serviceObject.loggedSubject.next(true);
}



