import {Component, ViewChild, HostListener, OnInit, AfterContentInit, Directive, Input, ElementRef} from '@angular/core';
import { AngularMaterialModule} from './material.module';
import {MatDrawerMode, MatSidenav} from '@angular/material/sidenav';
import {TranslateService} from '@ngx-translate/core';
import { GlobService} from './_service/glob-service';
// import {Translator} from './tools/translation/translator';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {UiService} from './_service/ui.service';
import {AuthenticationService} from './_service/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterContentInit {

  opened = true;
  gridColumns = 3;
  gridByBreakpoint: {[key: string]: number} =  { xl: 8, lg: 6, md: 4, sm: 2, xs: 1 };


  set menuCollapsed(val: boolean) {
    this.uiService.menuCollapsed$.next(val);
  }

  get menuCollapsed(): boolean {
    return this.uiService.menuCollapsed$.getValue();
  }

  menuExpanded = false;
  smallViewport = false;
  menuOpened = true;
  showMargin = false;
  sidenavMode: MatDrawerMode = 'side';
  @ViewChild('sidenav', {static: false}) pRef: ElementRef;
  navigation: string;


  constructor(public translate: TranslateService,
              private globSrv: GlobService,
              private media: MediaObserver,
              private uiService: UiService,
              private authService: AuthenticationService) {
    translate.addLangs(['en', 'sk']);
    translate.setDefaultLang('sk');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|sk/) ? browserLang : 'en');
    this.gridColumns = 3;
  }

  ngOnInit(): void {
    this.globSrv.currentLanguage.subscribe((data ) => {
      this.translate.use(data); } );
    // Translator.translate = this.translate;

  }

  ngAfterContentInit(): void {
    this.media.asObservable().subscribe( (changes: MediaChange[]) => {
      // this.gridColumns = this.gridByBreakpoint[changes[0].mqAlias];
      console.log(changes);

      const breakpoint: string = changes[0].mqAlias;
      this.gridColumns = this.gridByBreakpoint[breakpoint];

    });

    this.authService.isLogged();

  }

  handleBreakpoint(matches: boolean): void {
    if (matches) {
      this.smallViewport = false;
      this.menuOpened = true;
      this.menuCollapsed = false;
      this.uiService.menuCollapsed$.next(false);
    } else {
      this.smallViewport = true;
      this.menuCollapsed = false;
      this.menuOpened = false;
    }
    setTimeout(() => this.handleSidenavMode());
  }

  handleSidenavMode(): void {
    this.sidenavMode = this.smallViewport || this.menuExpanded ? 'over' : 'side';
    this.showMargin = this.menuExpanded;
  }

  toggleMenu(evt: boolean): void {
    if (this.smallViewport) {
      this.menuOpened = !this.menuOpened;
    } else {
      this.menuCollapsed = evt;
    }
  }

  hideMenu(): void {
    if (this.smallViewport) {
      this.menuOpened = false;
    } else {
      this.menuExpanded = false;
      setTimeout(() => this.handleSidenavMode());
    }
  }

  onExpandMenu(evt: boolean): void {
    if (this.menuCollapsed) {
      this.menuExpanded = evt;
    }
    setTimeout(() => this.handleSidenavMode());
  }

}


