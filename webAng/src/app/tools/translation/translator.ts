import {TranslateService} from '@ngx-translate/core';
import {OnInit} from '@angular/core';

export class TranslatorXX {

  public static translate: TranslateService;

  constructor() {
  }

  public static getTranslation(key: string): string {
    if (!TranslatorXX.translate){
      console.log('Not initialized');
      return 'Not initialized';
    }

    let ret: string;
    ret = TranslatorXX.translate.instant(key);
    return ret;
  }

}
