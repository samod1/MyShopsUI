import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export class Validators {

  constructor() {
  }

  public static validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  public static validateEmailControl(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const ret = re.test(value);
    if (!ret){
      return { emailError: 'Email not valid' };
    }
    else{
      return null;
    }

  }


}
