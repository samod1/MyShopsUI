import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  constructor() { }

  @Input()
  loading: boolean;

  ngOnInit() {
  }

}
