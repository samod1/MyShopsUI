export class UserData {
  id: number;
  username: string;
  alias: string;
  uuid: string;
  active: boolean;
  regDate: string;
  locale: string;
  identity: Identity;

  constructor() {
    this.id=0;
    this.username='';
    this.alias='';
    this.uuid='';
    this.active=false;
    this.regDate='';
    this.locale='';
    this.identity = new Identity();
  }
}

export class Identity {
  superSecure: boolean;
  disabled: boolean;
  expired: boolean;
  deleted: boolean;
  expireTime: string;
  disableTime: string;
  constructor() {
    this.superSecure=false;
    this.disabled=false;
    this.expired=false;
    this.expireTime='';
    this.disableTime='';
  }
}
