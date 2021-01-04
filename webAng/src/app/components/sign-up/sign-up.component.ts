import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Validators as ShopsValidators} from '../../tools/validators/validators';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  emailControl: FormControl;
  emailInvalid: boolean;


  constructor() {
    this.emailInvalid = true;
    const validators = [Validators.required, ShopsValidators.validateEmailControl];
    this.emailControl = new FormControl('', validators );
  }

  ngOnInit(): void {
  }

  OnCreate(): void {
     /* check if is registered */
     /* register email */
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


}
