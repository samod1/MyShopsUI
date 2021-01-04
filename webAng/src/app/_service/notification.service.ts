import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public static instance: NotificationService;

  public errorMessageSubject: BehaviorSubject<Array<string>>;
  public errorMessage: Observable<Array<string>>;

  public warningMessageSubject: BehaviorSubject<Array<string>>;
  public warningMessage: Observable<Array<string>>;

  public informationMessageSubject: BehaviorSubject<Array<string>>;
  public informationMessage: Observable<Array<string>>;

  constructor() {

    const errMessages = new Array<string>();
    this.errorMessageSubject = new BehaviorSubject<Array<string>>(errMessages);
    this.errorMessage = this.errorMessageSubject.asObservable();
;
    const warnMessages = new Array<string>();
    this.warningMessageSubject = new BehaviorSubject<Array<string>>(warnMessages);
    this.warningMessage = this.warningMessageSubject.asObservable();

    const infoMessages = new Array<string>();
    this.informationMessageSubject = new BehaviorSubject<Array<string>>(infoMessages);
    this.informationMessage = this.informationMessageSubject.asObservable();

    NotificationService.instance = this;

  }

}
