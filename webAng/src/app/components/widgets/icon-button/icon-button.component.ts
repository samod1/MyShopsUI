import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input() color = 'primary';
  @Input() buttonTextKey = 'Invalid key name';
  @Input() iconName = 'home';
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
