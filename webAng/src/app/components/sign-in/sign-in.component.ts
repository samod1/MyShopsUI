import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {LoginData} from '../../_model/login-data';
import {AuthenticationService} from '../../_service/authentication.service';
import {NotificationService} from '../../_service/notification.service';
// import {Translator} from '../../tools/translation/translator';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ROUTER_PATH_DASHBOARD} from '../../tools/common/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginControl: FormControl;
  passwordControl: FormControl;
  loginName: string;
  loginInvalid: boolean;
  loading = true;
  eyeIconClass = 'eye';

  constructor(private authService: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router,
              private translate: TranslateService) {

    const validators = [Validators.required];
    this.loginControl = new FormControl('', validators );
    this.passwordControl = new FormControl('', validators );
    this.loginInvalid = false;

    this.authService.loggedObservable.subscribe( logged => {
      this.setControlEnabled(true);
      if(logged){
        const messages = new Array<string>();
        messages.push(translate.instant('app.sign-in.OK'));
        this.notificationService.informationMessageSubject.next(messages);
        this.router.navigateByUrl(ROUTER_PATH_DASHBOARD);
      }
    });

    this.authService.errorDataObservable.subscribe( (errorData) => {
        if(errorData.isShopsCodeError()){
         console.log('ShopsErrorCode');
        }
        this.setControlEnabled(true);
    });


  }

  ngOnInit(): void {
  }

  onLogin(): void{

    if(!this.loginControl.value || !this.passwordControl.value){
      const msgs = [this.translate.instant('app.sign-in.logindata_empty'),'sssssss','hdhdhdh'];
      this.notificationService.warningMessageSubject.next(msgs);
      return;
    }



    this.setControlEnabled(false);
    const ld: LoginData = new LoginData();
    ld.username = this.loginControl.value;
    ld.password = this.passwordControl.value;

    this.authService.login(ld);
  }

  private setControlEnabled(enabled:boolean): void{
    if(!enabled) {
      this.loading = true;
      this.eyeIconClass = 'eyeDisabled';
      this.loginControl.disable();
      this.passwordControl.disable();
    } else {
      this.loading = false;
      this.eyeIconClass = 'eye';
      this.loginControl.enable();
      this.passwordControl.enable();
    }
  }

}
