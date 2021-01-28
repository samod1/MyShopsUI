import {Component, Input, OnInit, Type} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';


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

@Component({
  selector: 'side-nav-panel',
  templateUrl: './side-nav-panel.component.html',
  styleUrls: ['./side-nav-panel.component.scss']
})

export class SideNavPanelComponent implements OnInit {

  sdmenu: SideNavMenu = null;

  private _menu: SideNavMenu;

  @Input() set menu(value: SideNavMenu){
    this._menu = value;
  }
  get menu():SideNavMenu{
    return this._menu;
  }

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.sdmenu = this.menu;
  }


  OnMenu(action: string): void{
    console.log(action);
    this.router.navigateByUrl(action);

  }


}
