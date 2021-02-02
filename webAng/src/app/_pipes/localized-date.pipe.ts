import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: any, pattern: string = 'mediumDate'): any {
    if(value === '-' || value === '')
      return '';
    const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
    let ret: string;
    try {
      ret = datePipe.transform(value, pattern);
      console.log(ret);
      return ret;
    } catch (e) {
      console.log(e);
    }
  }
}
