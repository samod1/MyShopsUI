import {Injectable, InjectionToken} from '@angular/core';
import {BehaviorSubject, Observable,of} from 'rxjs';
import {ErrorData} from '../_model/error-data';
import {postData, ReturnData} from './servercall.service';
import {MyShopsException, ServerError} from '../myshopsexceptions';
import {setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem} from '../tools/common/common';
import {NotificationService} from './notification.service';
import {Translator} from '../tools/translation/translator';


@Injectable({
  providedIn: 'root'
})
export class BaseService {


  protected errorDataSubject: BehaviorSubject<ErrorData>;
  public errorData$: Observable<ErrorData>;

  constructor() {

    const errorData = new ErrorData();
    this.errorDataSubject = new BehaviorSubject<ErrorData>(errorData);
    this.errorData$ = this.errorDataSubject.asObservable();

  }

  get errorDataObservable(): Observable<ErrorData>{
    return this.errorDataSubject.asObservable();
  }

  postData(url: string,data: any,onSuccess: any,onError: any,serviceObject: any): void {

    postData(url,data)
      .then(retData => {
        console.log(retData);
        if(onSuccess){
          onSuccess(retData,serviceObject);
        }
      })
      .catch(error => {
        if((error instanceof MyShopsException) || (error instanceof ServerError)){
          console.log(error.data);
          const rd = new ErrorData();
          rd.initialize(error);
          this.errorDataSubject.next(rd);
          /* zobrazenie chybovej spravy */
          if((error instanceof MyShopsException)){
            this.showShopsError(rd);
          }
          if((error instanceof ServerError)){
            this.showOtherError(rd);
          }
          if(onError){
            onError(rd,serviceObject);
          }

        }else {
          console.log(error);
          const rd = new ErrorData();
          if('data' in error){
            rd.initialize(error);
          } else {
            rd.serverMessage = error;
          }
          this.errorDataSubject.next(rd);
          this.showOtherError(rd);
          if(onError) {
            onError(rd, serviceObject);
          }
        }
      });
  }

  showShopsError(rd: ErrorData): void{
    const messages = new Array<string>();
    const message: string = Translator.getTranslation('app.srv.' + rd.shopsErrorCode);
    messages.push(message);
    const notificationService = NotificationService.instance;
    notificationService.errorMessageSubject.next(messages);
  }
  showOtherError(rd: ErrorData): void{
    const messages = new Array<string>();
    messages.push(rd.serverMessage);
    const notificationService = NotificationService.instance;
    notificationService.errorMessageSubject.next(messages);
  }
}
