import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../../../_service/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {
  AliasIn,
  DeleteUserStartOut,
  DeleteUserStopOut,
  SessionSettings,
  UserData,
  UserSettingsService
} from '../../../_service/user-settings.service';
import {ILanguage} from '../../../_model/lang';
import {environment} from '../../../../environments/environment';
import {GlobService} from '../../../_service/glob-service';
import {FormControl, Validators} from '@angular/forms';
import {Validators as ShopsValidators} from '../../../tools/validators/validators';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-user-settings-user',
  templateUrl: './user-settings-user.component.html',
  styleUrls: ['./user-settings-user.component.scss']
})

export class UserSettingsUserComponent implements OnInit, OnDestroy {

  email = '-';
  alias = '-';
  regDate = '-';
  lang = '-';
  deleteButtonLabel = 'app.delete';
  deleteInProgressText = '';
  showDeleteUser: boolean;
  showAliasEdit: boolean;
  showLangChange: boolean;
  userData: UserData;
  public languages: Array<ILanguage> = [];
  actualLang: string;
  selectedLangId: string;
  aliasControl: FormControl;
  deleteUserStartData: DeleteUserStartOut;
  deleteUserStopData: DeleteUserStopOut;
  private subscriptions: Array<Subscription> = [];

  constructor(private notificationService: NotificationService,
              private translate: TranslateService,
              private userService: UserSettingsService,
              private globSrv: GlobService) {
    this.showAliasEdit=false;
    this.showDeleteUser=false;
    this.showLangChange=false;
    this.languages =  environment.languages;
    this.actualLang= this.getLanguageText(translate.currentLang);
    this.lang= this.getLanguageText(translate.currentLang);
    this.selectedLangId='';
    const validators = [Validators.required, ShopsValidators.validateAlias];
    this.aliasControl = new FormControl('', validators );

    let subscription = userService.loaduserdata$.subscribe( (retData: UserData) => {
      console.log('## userdataSubscribe');
      if(!retData)
        return;
      this.userData = retData;
      if(!this.userData.alias){
        this.alias = this.translate.instant('app.user-settings.notAlias');
      } else {
        this.alias = this.userData.alias;
      }
      this.email = this.userData.username;
      this.regDate =   this.userData.regdate;
      if(this.userData.locale){
        this.selectedLangId = this.userData.locale;
        this.lang = this.getLanguageText(this.userData.locale);
        this.actualLang = this.lang;
      }

      const de = new Date(this.userData.deleting.unregtime_enter);
      const ds = new Date(this.userData.deleting.unregtime_start);
      this.userData.deleting.unregtime_enter = de;
      this.userData.deleting.unregtime_start = ds;
      this.userData.deleting.unregtime_done = new Date(this.userData.deleting.unregtime_done);

      if(this.userData.deleting.unreg_inprogress){
        this.deleteButtonLabel='app.deactivate';
        this.deleteInProgressText = this.translate.instant('app.user-settings.deleteUserQest2',
          {datestart: de.toLocaleString(),dateend: ds.toLocaleString()});
      } else {
        this.deleteButtonLabel='app.delete';
        this.deleteInProgressText='';
      }

    });
    this.subscriptions.push(subscription);

    subscription = globSrv.currentLanguage.subscribe( (lang) => {
      // this.actualLang= this.getLanguageText(translate.currentLang);
      // this.lang= this.getLanguageText(translate.currentLang);
    });
    this.subscriptions.push(subscription);

    subscription = userService.setAlias$.subscribe( (isSet) => {
      if(isSet){
        this.alias = this.aliasControl.value;
        const msg: string = this.translate.instant('app.user-settings.saveAliasOK');
        this.notificationService.informationMessageSubject.next([msg]);
        this.showAliasEdit=false;
      }
    });
    this.subscriptions.push(subscription);

    subscription = userService.deleteUserStart$.subscribe( (data) => {
      if(data){
        this.deleteUserStartData = data;
        const msg = this.translate.instant('app.user-settings.deleteUserStarted');
        this.notificationService.informationMessageSubject.next([msg]);
        this.userService.loadUserData();
        this.showDeleteUser = false;
      }
    });
    this.subscriptions.push(subscription);

    subscription = userService.deleteUserStop$.subscribe( (data) => {
      if(data){
        this.deleteUserStopData = data;
        const msg = this.translate.instant('app.user-settings.deleteUserStopping');
        this.notificationService.informationMessageSubject.next([msg]);
        this.userService.loadUserData();
        this.showDeleteUser = false;
      }
    });
    this.subscriptions.push(subscription);

    subscription = userService.setSessionSettings$.subscribe( (isSet) => {
      if(isSet){
        this.lang = this.getLanguageText(this.selectedLangId);
        const msg: string = this.translate.instant('app.user-settings.saveLangOK');
        this.notificationService.informationMessageSubject.next([msg]);
        this.showLangChange=false;
        globSrv.changeCurrentLang(this.selectedLangId);
      }
      });
    this.subscriptions.push(subscription);

  }

  ngOnInit(): void {
     this.userService.loadUserData();
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }


  onEditAlias(){
    this.showAliasEdit=true;
  }

  onDeleteUser(){
    this.showDeleteUser=true;
  }

  onStartDeleteUser(){
    this.userService.startDeleteUser();
  }
  onStopDeleteUser(){
    this.userService.stopDeleteUser();
  }

  onShowLangChange(){
    this.showLangChange=true;
  }

  onSaveLang(){
    const settings = new SessionSettings();
    settings.locale = this.selectedLangId;
    this.userService.setSessionSettings(settings);
  }

  onSaveAlias(){
    const alias = new AliasIn();
    alias.alias = this.aliasControl.value;
    this.userService.setAlias(alias);
  }

  OnLang(langId: string): void{
      this.selectedLangId = langId;
      this.actualLang = this.getLanguageText(langId);
  }

  getLanguageText(langid: string): string{
    for ( const l of this.languages){
      console.log(l);
      if(l.langid === langid)
        return l.langtext;
    }
    return '';
  }


}
