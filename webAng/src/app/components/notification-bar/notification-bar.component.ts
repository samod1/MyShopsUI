import { Component, OnInit } from '@angular/core';
import { NotificationService} from '../../_service/notification.service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent implements OnInit {

  errorMessages: Array<string>;
  infoMessages: Array<string>;
  warnMessages: Array<string>;
  newMessage = false;
  actualTimer: any = null;

  constructor(private notificationService: NotificationService) {
    this.newMessage = false;
    this.notificationService.errorMessage.subscribe( (messages:Array<string>) => {
      this.errorMessages = messages;
      this.showMessage();
    });
    this.notificationService.warningMessage.subscribe( (messages:Array<string>) => {
      this.warnMessages = messages;
      this.showMessage();
    });
    this.notificationService.informationMessage.subscribe( (messages:Array<string>) => {
      this.infoMessages = messages;
      this.showMessage();
    });

  }

  ngOnInit(): void {
  }

  showMessage(): void {
    this.newMessage = true;
    if(this.actualTimer){
      clearInterval(this.actualTimer);
    }
    this.actualTimer = setInterval(() => {
      this.newMessage = false;
    },environment.messageTimeout);

  }

  errorClose(): void{
    this.errorMessages=[];
    this.canShowMessage();
  }

  infoClose(): void{
    this.infoMessages=[];
    this.canShowMessage();
  }

  warnClose(): void{
    this.warnMessages=[];
    this.canShowMessage();
  }

  canShowMessage(): void {
    if (!this.errorMessages.length && !this.warnMessages.length && !this.infoMessages.length) {
      this.newMessage = false;
    }
  }
}
