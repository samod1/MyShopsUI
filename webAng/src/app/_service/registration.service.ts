import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {LoginData} from '../_model/login-data';
import {AuthenticationService, authenticationUrl, loggedUserLSID, onErrorLogin, onSuccessLogin} from './authentication.service';
import {environment} from '../../environments/environment';
import {removeLocalStorageItem, setLocalStorageItem} from '../tools/common/common';

export const registrationCreateURL = 'registration/create';

export class RegistrationData{
  email: string;
  override: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {

  constructor(){
    super();
  }

  register(registrationData: RegistrationData): void {
    this.postData(registrationCreateURL,registrationData,onSuccessRegistration,onErrorRegistration,this);
  }


}

export function onSuccessRegistration(retData: any, serviceObject: RegistrationService): void {

}

export function onErrorRegistration(retData: any, serviceObject: RegistrationService): void {
}
