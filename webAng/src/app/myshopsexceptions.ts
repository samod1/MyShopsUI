
export class MyShopsException extends Error {

  public data: any;
  public date: Date;

  constructor(message = '',errData=null) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)

    this.name = 'MyShopsException';
    this.data = errData;
    this.date = new Date();
  }
}

export class MyShopsUnauthorized extends Error {

  public data: any;
  public date: Date;

  constructor(message = '',errData=null) {
    super(message);
    this.name = 'MyShopsException';
    this.data = errData;
    this.date = new Date();
  }
}


export class ServerError extends MyShopsException {
  constructor(message: string='',errData: any = null) {
    super(message,errData);

    this.name = 'ServerError';
  }
}

export class InternalServerError extends MyShopsException {
  constructor(message: string = '',errData: any = null) {
    super(message,errData);
    this.name = 'InternalServerError';
  }
}

export class JWTTokenInvalid extends MyShopsException {
  constructor(message: string,errData: any = null) {
    super(message,errData);
  }
}

export class JWTTokenDoesNotExists extends MyShopsException {
  constructor(message: string,errData: any = null) {
    super(message,errData);
  }
}
