import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Validators as ShopsValidators} from '../../tools/validators/validators';
import {FormControl, Validators} from '@angular/forms';
import {RegistrationService, RegistrationData} from '../../_service/registration.service'
import {SHOPS_CODE_REG_EMAILPREVATTEMPT} from "../../tools/common/shops-error-codes";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  emailControl: FormControl;
  emailInvalid: boolean;
  loading = true;
  disabledComponents = false;
  registerAgain = false;

  constructor(private registrationService: RegistrationService) {
    this.emailInvalid = true;
    const validators = [Validators.required, ShopsValidators.validateEmailControl];
    this.emailControl = new FormControl('', validators );

    this.registrationService.registeredObservable.subscribe( registered => {
      if(registered){

      }
    });

    this.registrationService.errorDataObservable.subscribe( (errorData) => {
      if(errorData.isShopsCodeError()){
          if( Number(errorData.shopsErrorCode) === SHOPS_CODE_REG_EMAILPREVATTEMPT) {
            this.registerAgain=true;
        }
      }
      this.setControlEnabled(true);
    });

  }

  ngOnInit(): void {
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

}
