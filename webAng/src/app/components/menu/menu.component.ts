import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_service/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: MenuItem[] = [
    {
      title: 'home', icon: 'home', link: ''
    },
    {
      title: 'communications', icon: 'bullhorn', items: [
        {
          title: 'communications', link: 'communications'
        }
      ]
    },
    {
      title: 'statistics', icon: 'chart-bar', link: 'statistics/overview'
    },
    {
      title: 'configuration', icon: 'cogs', items: [
        {
          title: 'scenarios', link: 'configuration/scenarios'
        },
        {
          title: 'templates', link: 'templates'
        },
        {
          title: 'scripts', link: 'configuration/scripts'
        }
      ]
    },
    {
      title: 'administration', icon: 'list-alt', items: [
        {
          title: 'users', link: 'administration/users'
        },
        {
          title: 'roles', link: 'administration/roles'
        },
        {
          title: 'monitoring', link: 'administration/monitoring'
        },
        {
          title: 'blacklist', link: 'administration/blacklist'
        }
      ]
    }
  ];

  route = 'home';
  @Input()
  menuCollapsed = false;
  @Input()
  menuExpanded = false;
  @Input()
  smallViewport = false;
  @Output()
  expandMenu = new EventEmitter();
  @Output()
  hideMenu = new EventEmitter();

  // tslint:disable-next-line:variable-name
  _navigation: string | undefined;
  @Input()
  set navigation(nav: string) {
    this._navigation = nav;
    this.updateSelectedMenu();
  }

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    // authenticationService.loggedUserObservable.subscribe(u => this.updateSelectedMenu());
  }

  updateSelectedMenu(): void {
    if (!this._navigation) {
      return;
    }
    this.menu.forEach(m => {
      m.selected = false;
      if (m.link !== undefined && m.link === this._navigation) {
        m.selected = true;
      }
      if (m.items) {
        m.items.forEach(sm => {
          // @ts-ignore
          if (sm.link && this._navigation.startsWith(sm.link)) {
            m.selected = true;
          }
        });
      }
    });
  }

  isMenuEnabled(item: MenuItem): boolean {
    switch (item.title) {
      case 'administration':
        return this.isAdministrationEnabled();
    }
    return true;
  }

  isAdministrationEnabled(): boolean {
    // return this.authenticationService.getLoggedUser().isAdmin() || this.authenticationService.getLoggedUser().isUserAdmin();
    return true;
  }


  ngOnInit(): void {
  }

  onMenuItemClicked(item: MenuItem, evt: Event): void {
    if (item.items) {
      return;
    }
    this.hideMenu.emit({});
    if (item.link || item.link === '') {
      if (this.router.navigate([item.link])) {
        this.menu.forEach(m => {
          m.selected = false;
          if (m === item) {
            m.selected = true;
          }
          if (m.items) {
            m.items.forEach(sm => {
              if (sm === item) {
                m.selected = true;
              }
            });
          }
        });
      }
    }
    this.menu.forEach(m => m.selected = m === item && !m.items || m.items && m.items.find(sm => sm === item) !== undefined);
  }

  onMouseOver(): void {
    if (this.menuCollapsed && !this.menuExpanded && !this.smallViewport) {
      this.expandMenu.emit(true);
    }
  }

  onMouseOut(): void {
    if (this.menuCollapsed && this.menuExpanded && !this.smallViewport) {
      this.expandMenu.emit(false);
    }
  }
}

export interface MenuItem {
  title: string;
  link?: string;
  icon?: string;
  items?: MenuItem[];
  selected?: boolean;
}

