import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Validators as ShopsValidators} from '../../tools/validators/validators';
import {FormControl, Validators} from '@angular/forms';
import {RegistrationService, RegistrationData} from '../../_service/registration.service'
import {SHOPS_CODE_REG_EMAILPREVATTEMPT} from '../../tools/common/shops-error-codes';
import {NotificationService} from '../../_service/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
// import {Translator} from '../../tools/translation/translator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  emailControl: FormControl;
  emailInvalid: boolean;
  loading = true;
  disabledComponents = false;
  registerAgain = false;
  registrationSent=false;
  private subscriptions: Array<Subscription> = [];

  constructor(private registrationService: RegistrationService,
              private notifService: NotificationService,
              private translate: TranslateService) {
    this.emailInvalid = true;
    const validators = [Validators.required, ShopsValidators.validateEmailControl];
    this.emailControl = new FormControl('', validators );

    let subscription = this.registrationService.registrationSentObservable.subscribe( registrationSent => {
      if(registrationSent){
        const message: string = this.translate.instant('app.register.registrationSent');
        notifService.informationMessageSubject.next([message]);
        this.registrationSent=true;
        this.disabledComponents=true;
      }
    });
    this.subscriptions.push(subscription);
    subscription = this.registrationService.errorDataObservable.subscribe( (errorData) => {
      if(errorData.isShopsCodeError()){
          if( Number(errorData.shopsErrorCode) === SHOPS_CODE_REG_EMAILPREVATTEMPT) {
            this.registerAgain=true;
        }
      }
      this.setControlEnabled(true);
    });
    this.subscriptions.push(subscription);

  }

  ngOnInit(): void {
    this.emailInvalid = false;
    this.loading = false;
    this.disabledComponents = false;
    this.registerAgain = false;
    this.registrationSent=false;
  }
  ngOnDestroy() {
    for (const subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }

  OnCreate(): void {
    this.create(false);
  }

  OnCreateAgain(): void {
    this.create(true);
  }

  private create(again: boolean){
    /* check if is registered */

    /* register email */
    const regData = new RegistrationData();
    regData.email = this.emailControl.value;
    regData.override = again;
    this.registrationService.register(regData);

  }


  OnEmailChange(): void{

    this.emailInvalid = false;

    const eml = this.emailControl.value;
    let ret: boolean;
    ret = ShopsValidators.validateEmail(eml);
    if (!ret) {
      console.log('email ' + eml + ' is not valid');
      this.emailInvalid = true;
    }
    else{
      console.log('email ' + eml + ' is valid');
    }

    return;
  }

  private setControlEnabled(enabled:boolean): void{
    if(!enabled) {
      this.loading = true;
      this.disabledComponents=true;
    } else {
      this.loading = false;
      this.disabledComponents=false;
    }
  }

  public showCrtButton(): boolean {
    if (this.registrationSent) {
      return false;
    }
    if (this.registerAgain) {
      return false;
    }
    return true;
  }

  public showAgainBut(): boolean{
    if (this.registrationSent) {
      return false;
    }
    if (this.registerAgain) {
      return true;
    }
    return false;
  }

  public showCancelBut(): boolean{
    if(!this.registrationSent){
      return true;
    } else {
      return false;
    }
  }

  public showExitBut(): boolean{
    if(this.registrationSent)
      return true;
    else
      return false;
  }



}
