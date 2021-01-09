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
  items: [SideNavMenuItem];
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

  @Input() menu: SideNavMenu;
  @Input() components: sideNavComponents;


  constructor() { }

  ngOnInit(): void {
  }

}
