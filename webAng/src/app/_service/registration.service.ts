import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {LoginData} from '../_model/login-data';
import {AuthenticationService, authenticationUrl, loggedUserLSID, onErrorLogin, onSuccessLogin} from './authentication.service';
import {environment} from '../../environments/environment';
import {removeLocalStorageItem, setLocalStorageItem} from '../tools/common/common';
import {BehaviorSubject, Observable} from "rxjs";

export const registrationCreateURL = 'users/registration/create';

export class RegistrationData{
  email: string;
  override: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {

  private registeredSubject: BehaviorSubject<boolean>;
  public registered$: Observable<boolean>;


  constructor(){
    super();

    const registered = false;
    this.registeredSubject = new BehaviorSubject<boolean>(registered);
    this.registered$ = this.registeredSubject.asObservable();
  }

  get registeredObservable(): Observable<boolean>{
    return this.registeredSubject.asObservable();
  }


  register(registrationData: RegistrationData): void {
    this.postData(registrationCreateURL,registrationData,onSuccessRegistration,onErrorRegistration,this);
  }


}

export function onSuccessRegistration(retData: any, serviceObject: RegistrationService): void {

}

export function onErrorRegistration(retData: any, serviceObject: RegistrationService): void {
}
