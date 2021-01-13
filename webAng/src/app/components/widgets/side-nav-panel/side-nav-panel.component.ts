import {Component, Input, OnInit, Type} from '@angular/core';
import {FormControl} from '@angular/forms';


export enum menuItemType{
  item,
  menu,
  divider
}

export class SideNavMenuItem {
  type: menuItemType;
  id?: string; /* null only when type is divider or menu */
  textKey?: string; /* null only when type is divider or menu */
  iconName?: string;
  menu?: SideNavMenu; /* must be null when type is divider or item, otherwise not null */
  action?: string; /* when type is item content of action variable is used to activate component in content part */
}

export class SideNavMenu{
  items: Array<SideNavMenuItem>;
}

export class SideNavComponent{
  id: string;
  component: Type<any>;
}

export type sideNavComponents = Array<SideNavComponent>;


@Component({
  selector: 'side-nav-panel',
  templateUrl: './side-nav-panel.component.html',
  styleUrls: ['./side-nav-panel.component.scss']
})

export class SideNavPanelComponent implements OnInit {

  sdmenu: SideNavMenu = null;

  private _menu: SideNavMenu;
  private _components: sideNavComponents;

  @Input() set menu(value: SideNavMenu){
    this._menu = value;
  }
  get menu():SideNavMenu{
    return this._menu;
  }

  @Input() set components(value: sideNavComponents){
    this._components = value;
  }
  get components(): sideNavComponents{
    return this._components;
  }

  constructor() {
  }

  ngOnInit(): void {


    /* Test menu */
    this.sdmenu = new SideNavMenu();
    this.sdmenu.items = new Array<SideNavMenuItem>();

    const mi = new SideNavMenuItem();
    mi.id = 'app.user-settings.title.user';
    mi.iconName = 'file';
    mi.textKey = 'app.user-settings.title.user';
    mi.type = menuItemType.item;
    mi.action = 'user-settings.user';
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
    mi2.action = 'user-settings.security';
    this.sdmenu.items.push(mi2);

    const mi3 = new SideNavMenuItem();
    mi3.id = '';
    mi3.type = menuItemType.divider;
    this.sdmenu.items.push(mi3);
    /* Test menu */
    console.log(this.sdmenu);


  }


  OnMenu(action: string): void{

  }


}
