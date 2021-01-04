import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  menuCollapsed$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }
}
