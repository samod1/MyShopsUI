import {Injectable, InjectionToken} from '@angular/core';
import {BehaviorSubject, Observable,of} from 'rxjs';
import {ErrorData} from '../_model/error-data';
import {postData,  getData} from './servercall.service';
import {MyShopsException, MyShopsUnauthorized, ServerError} from '../myshopsexceptions';
import {NotificationService} from './notification.service';
import {TranslateService} from '@ngx-translate/core';
import {GlobService} from './glob-service';
import {Router, UrlSerializer, UrlTree} from '@angular/router';
import {AuthenticationService, loggedUserLocalStorageUID} from './authentication.service';
import {removeLocalStorageItem} from '../tools/common/common';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {


  protected errorDataSubject: BehaviorSubject<ErrorData>;
  public errorData$: Observable<ErrorData>;
  private translate: TranslateService;
  private routerA: Router;
  private serializerA: UrlSerializer;

  constructor() {

    const errorData = new ErrorData();
    this.errorDataSubject = new BehaviorSubject<ErrorData>(errorData);
    this.errorData$ = this.errorDataSubject.asObservable();
    this.translate = GlobService.injector.get(TranslateService);
    this.routerA = GlobService.injector.get(Router);
    this.serializerA = GlobService.injector.get(UrlSerializer);
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
        this.processCatch(error,onSuccess,onError,serviceObject);
      });
  }


  getData(url: string,data: any,onSuccess: any,onError: any,serviceObject: any): void {

    let tree: UrlTree;
    let qs: string;
    if(data) {
      tree = this.routerA.createUrlTree([url], {queryParams: data});
      qs = this.serializerA.serialize(tree);
    } else {
      qs = url;
    }

    getData(qs)
      .then(retData => {
        console.log(retData);
        if(onSuccess){
          onSuccess(retData,serviceObject);
        }
      })
      .catch( error => {
          this.processCatch(error,onSuccess,onError,serviceObject);
      });
  }

  processCatch(error: any,onSuccess: any,onError: any,serviceObject: any){

    if(error instanceof MyShopsUnauthorized){
      const authSrv: AuthenticationService = GlobService.injector.get(AuthenticationService);
      removeLocalStorageItem(environment.authorizationHeaderName);
      removeLocalStorageItem(loggedUserLocalStorageUID);
      authSrv.logout();
    } else {
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
    }

  }


  showShopsError(rd: ErrorData): void{
    const messages = new Array<string>();
    const message: string = this.translate.instant('app.srv.' + rd.shopsErrorCode);
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
