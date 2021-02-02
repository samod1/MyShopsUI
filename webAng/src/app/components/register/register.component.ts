import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../_service/notification.service';
// import {Translator} from '../../tools/translation/translator';
import {Router} from '@angular/router';
import {RegistrationService, RegistrationRequestDataOut, RegistrationRequestDataIn, RegistrationConfimDataIn} from '../../_service/registration.service';
import {TranslateService} from '@ngx-translate/core';
import {ROUTER_PATH_HOME} from '../../tools/common/common';
import {Subscription} from 'rxjs';


export class FormModel {
  email?: string;
  password?: string;
  passwordVerify?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {

  private regKey: string;
  eyeIconClass = 'eye';
  loading = false;
  registrationConfirmed = false;
  formModel: FormModel;
  passwordError = false;
  passwordErrorMsg = '';
  regRequestData: RegistrationRequestDataOut;
  private subscriptions: Array<Subscription> = [];


  constructor(private route: ActivatedRoute,
              private notificationService: NotificationService,
              private router: Router,
              private registrationService: RegistrationService,
              private translate: TranslateService) {
    this.regKey='Unknown';

    const subscription = this.registrationService.registrationConfirmedObservable.subscribe( (confirmed: boolean) => {
      if(confirmed){
        this.registrationConfirmed = true;
        const message: string = this.translate.instant('app.register.regOK');
        this.notificationService.informationMessageSubject.next([message]);
      }
    });
    this.subscriptions.push(subscription);

  }

  ngOnInit(): void {
    this.regKey = this.route.snapshot.queryParamMap.get('reg_key');
    console.log(this.route);
    console.log(this.regKey);
    if(!this.regKey){
      const message: string = this.translate.instant('app.register.regkeyNotfound');
      this.notificationService.errorMessageSubject.next([message]);
      this.router.navigateByUrl(ROUTER_PATH_HOME);
    } else {
      this.loadRegistrationReqData();
    }
    this.formModel = {};
    const subscription = this.registrationService.registrationReqObservable.subscribe( (retData: RegistrationRequestDataOut) => {
      if(retData){
        this.regRequestData = retData;
      }
    });
    this.subscriptions.push(subscription);

  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }

  loadRegistrationReqData(){
    const rqdin = new  RegistrationRequestDataIn();
    rqdin.registration_key = this.regKey;
    this.registrationService.loadRegistrationDataRequest(rqdin);
  }

  showSaveBut(): boolean{
    if(this.registrationConfirmed)
      return false;
    else
      return true;
  }
  showCancelBut(): boolean{
    if(this.registrationConfirmed)
      return false;
    else
      return true;
  }
  showExitBut(): boolean{
    if(this.registrationConfirmed)
      return true;
    else
      return false;
  }

  onSave(): void{
    console.log('onSave');
    this.passwordError=false;
    this.passwordErrorMsg='';
    if(!this.checkForm()){
      this.passwordError=true;
      return;
    }

    const rcd = new RegistrationConfimDataIn();
    rcd.password = this.formModel.password;
    rcd.registration_key = this.regKey;
    this.registrationService.confirm(rcd);

  }

  checkForm(): boolean {

    if(!this.formModel.password || this.formModel.password.length===0){
      this.passwordErrorMsg = 'app.register.password_empty';
      return false;
    }

    if(!this.formModel.passwordVerify || this.formModel.passwordVerify.length===0){
      this.passwordErrorMsg = 'app.register.password_empty';
      return false;
    }
    if(this.formModel.password.length < 8){
      this.passwordErrorMsg = 'app.register.password_invalid_length';
      return false;
    }
    if(this.formModel.password !== this.formModel.passwordVerify){
      this.passwordErrorMsg = 'app.register.password_invalid_noteq';
      return false;
    }
    return true;
  }

}
