import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {getJson} from './servercall.service';

export const registrationCreateURL = 'users/registration/create';
export const registrationGetByKeyURL = 'users/registration/getbykey';
export const registrationConfirmURL = 'users/registration/confirm';

export class RegistrationCompleteData{
  registrationKey: string;
  password: string;
}

export class RegistrationData{
  email: string;
  override: boolean;
}

export class RegistrationRequestDataIn {
  // tslint:disable-next-line:variable-name
  registration_key: string;
}

export interface RegistrationRequestDataOut {
  // tslint:disable-next-line:variable-name
  registration_key: string;
  email: string;
  // tslint:disable-next-line:variable-name
  req_time: string;
  // tslint:disable-next-line:variable-name
  reg_time: string;
  active: boolean;
}

export class RegistrationConfimDataIn {
  // tslint:disable-next-line:variable-name
  registration_key: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {

  private registrationSentSubject: BehaviorSubject<boolean>;
  public registrationSent$: Observable<boolean>;

  private registrationConfirmedSubject: BehaviorSubject<boolean>;
  public registrationConfirmed$: Observable<boolean>;

  private registrationReqSubject: BehaviorSubject<RegistrationRequestDataOut>;
  public registrationReq$: Observable<RegistrationRequestDataOut>;


  static  onSuccessRegistrationSent(retData: any, serviceObject: RegistrationService): void {
      serviceObject.registrationSentSubject.next(true);
  }
  static onErrorRegistrationSent(retData: any, serviceObject: RegistrationService): void {
    serviceObject.registrationSentSubject.next(false);
  }

  static  onSuccessRegistration(retData: any, serviceObject: RegistrationService): void {
  }
  static onErrorRegistration(retData: any, serviceObject: RegistrationService): void {
  }

  static  onSuccessRegistrationReq(retData: any, serviceObject: RegistrationService): void {
     console.log(retData);
     getJson(retData.rspObject)
     .then( (jsdata) => {
       console.log(jsdata);
       const obj: RegistrationRequestDataOut = jsdata;
       serviceObject.registrationReqSubject.next(obj);
     })
  }
  static onErrorRegistrationReq(retData: any, serviceObject: RegistrationService): void {
    serviceObject.registrationReqSubject.next(null);
  }

  static  onSuccessRegistrationConfirm(retData: any, serviceObject: RegistrationService): void {
    serviceObject.registrationConfirmedSubject.next(true);
  }
  static onErrorRegistrationConfirm(retData: any, serviceObject: RegistrationService): void {
    serviceObject.registrationConfirmedSubject.next(false);
  }


  constructor(){
    super();

    const registrationSent = false;
    this.registrationSentSubject = new BehaviorSubject<boolean>(registrationSent);
    this.registrationSent$ = this.registrationSentSubject.asObservable();

    const registered = false;
    this.registrationConfirmedSubject = new BehaviorSubject<boolean>(registered);
    this.registrationConfirmed$ = this.registrationSentSubject.asObservable();


    this.registrationReqSubject = new BehaviorSubject<RegistrationRequestDataOut>(null);
    this.registrationReq$ = this.registrationReqSubject.asObservable();

  }

  get registrationSentObservable(): Observable<boolean>{
    return this.registrationSentSubject.asObservable();
  }

  get registrationConfirmedObservable(): Observable<boolean>{
    return this.registrationConfirmedSubject.asObservable();
  }

  get registrationReqObservable(): Observable<RegistrationRequestDataOut>{
    return this.registrationReqSubject.asObservable();
  }


  register(registrationData: RegistrationData): void {
    this.postData(registrationCreateURL,
                  registrationData,
                  RegistrationService.onSuccessRegistrationSent,
                  RegistrationService.onErrorRegistrationSent,this);
  }

  confirm(registrationConfirmData: RegistrationConfimDataIn): void {
    this.postData(registrationConfirmURL,
      registrationConfirmData,
      RegistrationService.onSuccessRegistrationConfirm,
      RegistrationService.onErrorRegistrationConfirm,this);
  }


  loadRegistrationDataRequest(registrationReqData: RegistrationRequestDataIn): void {
    this.postData(registrationGetByKeyURL,
      registrationReqData,
      RegistrationService.onSuccessRegistrationReq,
      RegistrationService.onErrorRegistrationReq,this);
  }

}



