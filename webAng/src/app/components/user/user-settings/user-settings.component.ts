import { Component, OnInit } from '@angular/core';
import {menuItemType, SideNavMenu, SideNavMenuItem} from '../../widgets/side-nav-panel/side-nav-panel.component';
import {
  ROUTER_URLPATH_USERSETTINGS_LOG,
  ROUTER_URLPATH_USERSETTINGS_OTH,
  ROUTER_URLPATH_USERSETTINGS_SEC,
  ROUTER_URLPATH_USERSETTINGS_USER
} from '../../../tools/common/common';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  sdmenu: SideNavMenu;

  constructor() {
    this.sdmenu = new SideNavMenu();
  }

  ngOnInit(): void {

    this.sdmenu.items = new Array<SideNavMenuItem>();

    const mi = new SideNavMenuItem();
    mi.id = 'app.user-settings.title.user';
    mi.iconName = 'file';
    mi.textKey = 'app.user-settings.title.user';
    mi.type = menuItemType.item;
    mi.action = ROUTER_URLPATH_USERSETTINGS_USER;
    this.sdmenu.items.push(mi);

    const mi1 = new SideNavMenuItem();
    mi1.id = '';
    mi1.type = menuItemType.divider;
    this.sdmenu.items.push(mi1);

    const mi2 = new SideNavMenuItem();
    mi2.id = 'app.user-settings.title.security';
    mi2.iconName = 'lock';
    mi2.textKey = 'app.user-settings.title.security';
    mi2.type = menuItemType.item;
    mi2.action = ROUTER_URLPATH_USERSETTINGS_SEC;
    this.sdmenu.items.push(mi2);

    const mi3 = new SideNavMenuItem();
    mi3.id = '';
    mi3.type = menuItemType.divider;
    this.sdmenu.items.push(mi3);

    const mi4 = new SideNavMenuItem();
    mi4.id = 'app.user-settings.title.others';
    mi4.iconName = 'lock';
    mi4.textKey = 'app.user-settings.title.others';
    mi4.type = menuItemType.item;
    mi4.action = ROUTER_URLPATH_USERSETTINGS_OTH;
    this.sdmenu.items.push(mi4);

    const mi5 = new SideNavMenuItem();
    mi5.id = '';
    mi5.type = menuItemType.divider;
    this.sdmenu.items.push(mi5);

    const mi6 = new SideNavMenuItem();
    mi6.id = 'app.user-settings.title.actlog';
    mi6.iconName = 'lock';
    mi6.textKey = 'app.user-settings.title.actlog';
    mi6.type = menuItemType.item;
    mi6.action = ROUTER_URLPATH_USERSETTINGS_LOG;
    this.sdmenu.items.push(mi6);

    const mi7 = new SideNavMenuItem();
    mi7.id = '';
    mi7.type = menuItemType.divider;
    this.sdmenu.items.push(mi7);


  }

}
