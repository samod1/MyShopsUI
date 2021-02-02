import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NotificationService} from './notification.service';



@Injectable({
  providedIn: 'root'
})
export class GlobService {

  public static injector: Injector;
  private _actualLanguage: string;

  private langBSub = new BehaviorSubject<string>('');
  currentLanguage = this.langBSub.asObservable();


  constructor(private inject: Injector) {
    GlobService.injector = this.inject;
  }

  changeCurrentLang(lang: string): void {
    this.langBSub.next(lang);
    this._actualLanguage = lang;
  }

  public get actualLanguage(){
    return this._actualLanguage;
  }

}
