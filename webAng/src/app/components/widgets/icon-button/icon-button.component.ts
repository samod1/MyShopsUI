import {Component, Input, OnDestroy, OnInit} from '@angular/core';
// import {Translator} from '../../../tools/translation/translator';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})

export class IconButtonComponent implements OnInit,OnDestroy {

  @Input() color = 'primary';
  @Input() buttonTextKey = 'IconButton - Invalid key name';
  @Input() iconName = 'home';
  @Input() disabled = false;
  @Input() buttonText = '';
  @Input() iconRight = false;
  @Input() stroked = false;
  @Input() IconButton = 'button login';

  buttonClass = 'iconButtonClassButton';
  private subsription: Subscription;

  constructor(private translate: TranslateService) {
    this.subsription = null;
  }

  ngOnInit(): void {
    if(this.buttonText === '' && this.buttonTextKey !== ''){
      console.log(this.buttonTextKey);
      this.subsription = this.translate.get(this.buttonTextKey).subscribe( (value) =>{
        this.buttonText = value;
      });
    }
    if(this.iconRight){
      this.buttonClass = 'iconButtonClassButtonRight';
    } else {
      this.buttonClass = 'iconButtonClassButton';
    }
  }

  ngOnDestroy(): void {
    if(this.subsription)
      this.subsription.unsubscribe();
  }

}
