import {TranslateService} from '@ngx-translate/core';
import {OnInit} from '@angular/core';

export class Translator {

  public static translate: TranslateService;

  constructor() {
  }

  public static getTranslation(key: string): string {
    if (!Translator.translate){
      return 'Not initialized';
    }

    let ret: string;
    ret = Translator.translate.instant(key);
    return ret;
  }

}
