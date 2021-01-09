import {Component, Input, OnInit} from '@angular/core';
// import {Translator} from '../../../tools/translation/translator';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})

export class IconButtonComponent implements OnInit {

  @Input() color = 'primary';
  @Input() buttonTextKey = 'IconButton - Invalid key name';
  @Input() iconName = 'home';
  @Input() disabled = false;
  @Input() buttonText = '';

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    if(this.buttonText === ''){
      this.buttonText = this.translate.instant(this.buttonTextKey);
    }
  }

}
