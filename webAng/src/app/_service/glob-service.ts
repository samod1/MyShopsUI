import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NotificationService} from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class GlobService {

  private langBSub = new BehaviorSubject<string>('');
  currentLanguage = this.langBSub.asObservable();


  constructor() { }

  changeCurrentLang(lang: string): void {
    this.langBSub.next(lang);
  }


}
