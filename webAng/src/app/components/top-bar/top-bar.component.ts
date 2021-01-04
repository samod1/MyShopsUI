import { Component, OnInit } from '@angular/core';
import { environment} from '../../../environments/environment';
import { GlobService} from '../../_service/glob-service';

interface ILanguage{
  langid: string;
  langtext: string;
  langval: string;
}


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {

  public languages: Array<ILanguage> = [];
  private currentLang = '';

  constructor(private globSrv: GlobService) {
        this.languages =  environment.languages;
  }

  ngOnInit(): void {
    this.globSrv.currentLanguage.subscribe((data ) => {
                            this.currentLang = data; } );
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

}
