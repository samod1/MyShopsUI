import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable,of} from 'rxjs';
import {LoginData} from '../_model/login-data';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {BaseService} from './base.service';
import {getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem} from '../tools/common/common';
import {registrationGetByKeyURL, RegistrationRequestDataIn, RegistrationRequestDataOut} from './registration.service';
import {getLoggedUserName} from './authentication.service';
import {getJson} from './servercall.service';

export const userdataGetURL = 'users/';
export const userAliasSetURL = 'users/XX/alias';
export const userLocaleSetURL = 'users/XX/locale';
export const userDeleteStartURL = 'users/XX/unregister/start';
export const userDeleteStopURL = 'users/XX/unregister/stop';

export  interface UserIdentity {
  super_secure: boolean;
  disabled: boolean;
  expired: boolean;
  deleted: boolean;
  expire_time: string;
  disable_time: string;
}
export interface UserDeleting {
  unreg_inprogress: boolean;
  unregtime_enter: Date;
  unregtime_done: Date;
  unregtime_start: Date;
}

export interface UserData
{
  id: bigint;
  username: string;
  alias: string,
  uuid: string;
  active: boolean
  regdate: string;
  locale: string;
  deleting: UserDeleting;
  userIdentity: UserIdentity;
}




export class AliasIn {
  alias: string;
}

export class SessionSettings{
  locale: string;
}

export interface DeleteUserStartOut{
  entertime: string;
  starttime: string;
}
export interface DeleteUserStopOut{
  endproctime: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserSettingsService  extends BaseService{

  private loaduserdataSubject: BehaviorSubject<UserData>;
  public loaduserdata$: Observable<UserData>;

  private setAliasSubject: BehaviorSubject<boolean>;
  public setAlias$: Observable<boolean>;

  private setSessionSettingsSubject: BehaviorSubject<boolean>;
  public setSessionSettings$: Observable<boolean>;

  private deleteUserStartSubject: BehaviorSubject<DeleteUserStartOut>;
  public  deleteUserStart$: Observable<DeleteUserStartOut>;

  private deleteUserStopSubject: BehaviorSubject<DeleteUserStopOut>;
  public  deleteUserStop$: Observable<DeleteUserStopOut>;


  static  onSuccessLoadUserData(retData: any, serviceObject: UserSettingsService): void {
    console.log(retData);
    getJson(retData.rspObject)
      .then( (jsdata) => {
        console.log(jsdata);
        const obj: UserData = jsdata;
        serviceObject.loaduserdataSubject.next(obj);
      })
  }
  static onErrorLoadUserData(retData: any, serviceObject: UserSettingsService): void {
    serviceObject.loaduserdataSubject.next(null);
  }

  static  onSuccessSetAlias(retData: any, serviceObject: UserSettingsService): void {
    serviceObject.setAliasSubject.next(true);
  }
  static onErrorSetAlias(retData: any, serviceObject: UserSettingsService): void {
    serviceObject.setAliasSubject.next(false);
  }

  static onSuccessSetSessionSettings(retData: any, serviceObject: UserSettingsService){
    serviceObject.setSessionSettingsSubject.next(true);
  }
  static onErrorSetSessionSettings(retData: any, serviceObject: UserSettingsService){
    serviceObject.setSessionSettingsSubject.next(false);
  }

  static onSuccessDeleteUserStart(retData: any, serviceObject: UserSettingsService){
    console.log(retData);
    getJson(retData.rspObject)
      .then( (jsdata) => {
        console.log(jsdata);
        const obj: DeleteUserStartOut = jsdata;
        serviceObject.deleteUserStartSubject.next(obj);
      })
  }

  static onErrorDeleteUserStart(retData: any, serviceObject: UserSettingsService){
    serviceObject.deleteUserStartSubject.next(null);
  }

  static onSuccessDeleteUserStop(retData: any, serviceObject: UserSettingsService){
    console.log(retData);
    getJson(retData.rspObject)
      .then( (jsdata) => {
        console.log(jsdata);
        const obj: DeleteUserStopOut = jsdata;
        serviceObject.deleteUserStopSubject.next(obj);
      })
  }

  static onErrorDeleteUserStop(retData: any, serviceObject: UserSettingsService){
    serviceObject.deleteUserStopSubject.next(null);
  }



  constructor() {
    super();


    this.loaduserdataSubject = new BehaviorSubject<UserData>(null);
    this.loaduserdata$ = this.loaduserdataSubject.asObservable();

    this.setAliasSubject = new BehaviorSubject<boolean>(null);
    this.setAlias$ = this.setAliasSubject.asObservable();

    this.setSessionSettingsSubject = new BehaviorSubject<boolean>(null);
    this.setSessionSettings$ = this.setSessionSettingsSubject.asObservable();

    this.deleteUserStartSubject = new BehaviorSubject<DeleteUserStartOut>(null);
    this.deleteUserStart$ = this.deleteUserStartSubject.asObservable();

    this.deleteUserStopSubject = new BehaviorSubject<DeleteUserStopOut>(null);
    this.deleteUserStop$ = this.deleteUserStopSubject.asObservable();

  }


  loadUserData(): void {
    console.log('loadUserData');
    const user = getLoggedUserName();
    this.getData(userdataGetURL+user,
                  null,
                  UserSettingsService.onSuccessLoadUserData,
                  UserSettingsService.onErrorLoadUserData,
                  this );
  }


  setAlias(alias: AliasIn){
    console.log('setAlias' + AliasIn);
    const user = getLoggedUserName();
    const repl = 'XX';
    let url = userAliasSetURL;
    url = url.replace(repl,user);
    this.postData(url,alias,
                  UserSettingsService.onSuccessSetAlias,
                  UserSettingsService.onErrorSetAlias,
                  this);
  }


  setSessionSettings(settings: SessionSettings){
    console.log('startDeleteUser' + AliasIn);
    const user = getLoggedUserName();
    const repl = 'XX';
    let url = userLocaleSetURL;
    url = url.replace(repl,user);
    this.postData(url,settings,
      UserSettingsService.onSuccessSetSessionSettings,
      UserSettingsService.onErrorSetSessionSettings,
      this);
  }

  startDeleteUser(): void{
    console.log('startDeleteUser' + AliasIn);
    const user = getLoggedUserName();
    const repl = 'XX';
    let url = userDeleteStartURL;
    url = url.replace(repl,user);
    this.postData(url,null,
      UserSettingsService.onSuccessDeleteUserStart,
      UserSettingsService.onErrorDeleteUserStart,
      this);
  }

  stopDeleteUser(): void{
    console.log('stopDeleteUser' + AliasIn);
    const user = getLoggedUserName();
    const repl = 'XX';
    let url = userDeleteStopURL;
    url = url.replace(repl,user);
    this.postData(url,null,
      UserSettingsService.onSuccessDeleteUserStop,
      UserSettingsService.onErrorDeleteUserStop,
      this);
  }



}

