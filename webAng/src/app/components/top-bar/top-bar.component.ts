import {Component, OnDestroy, OnInit} from '@angular/core';
import { environment} from '../../../environments/environment';
import { GlobService} from '../../_service/glob-service';
import {AuthenticationService,getLoggedUserName} from '../../_service/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {ROUTER_PATH_HOME, ROUTER_PATH_USERSETTINGS} from '../../tools/common/common';
import {ILanguage,IMenuItem} from '../../_model/lang';
import {Subscription} from 'rxjs';

// import {Translator} from '../../tools/translation/translator';



@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent implements OnInit, OnDestroy {

  public languages: Array<ILanguage> = [];
  public userMenu: Array<IMenuItem>;
  private currentLang = '';
  loggedMode = false;
  public uname: string;

  private MENU_USER_LOGOUT = 'menu_UserLogout';
  private MENU_USER_SETTINGS = 'menu_UserSettings';
  private subscriptions: Array<Subscription> = [];

  constructor(private globSrv: GlobService,
              private authService: AuthenticationService,
              private translate: TranslateService,
              private router: Router) {
    this.languages =  environment.languages;
    /* User menu */
    this.userMenu = this.CreateUserMenu();
    const subscription = authService.loggedObservable.subscribe( (logged: boolean) => {
      this.loggedMode = logged;
      if(logged){
        this.uname = getLoggedUserName();
      } else {
        this.uname = '';
      }
    });
    this.subscriptions.push(subscription);
    this.loggedMode=false;

  }
  ngOnInit(): void {
    const subscription = this.globSrv.currentLanguage.subscribe((data ) => {
                            this.currentLang = data; });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  OnLang(langid: string): void{
      // @ts-ignore
    const newLang = langid;
    console.log(newLang);
    this.globSrv.changeCurrentLang(newLang);
  }


  OnSignup(): void {
    console.log('OnSignup');
  }

  OnLogin(): void{
    console.log('OnLogin');
  }

  CreateUserMenu(): Array<IMenuItem> {
    const retMenu = new Array<IMenuItem>();

    const mi1: IMenuItem = {id:'menu_UserSettings',
                          menuText: this.translate.instant('app.top-bar.userMenu.settings'),
                          menuTextId: 'app.top-bar.userMenu.settings',
                          route: 'user/settings',
                          iconName: 'fa fa-cog'}
    retMenu.push(mi1);
    const mi2: IMenuItem = {id:'menu_UserLogout',
                            menuText: this.translate.instant('app.top-bar.userMenu.logout'),
                            menuTextId: 'app.top-bar.userMenu.logout',
                            route: 'user/logout',
                            iconName: 'fas fa-sign-in-alt'}
    retMenu.push(mi2);


    return retMenu;
  }

  OnUserMenu(itemId: string): void{
    console.log(itemId);
    if(itemId === this.MENU_USER_LOGOUT){
      this.authService.logout();
    }
    if(itemId === this.MENU_USER_SETTINGS){
      this.router.navigateByUrl(ROUTER_PATH_USERSETTINGS);
    }

  }

}
