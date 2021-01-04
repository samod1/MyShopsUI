
export class ErrorData{

  shopsErrorCode: string;
  shopsMessage: string;
  httpErrorCode: string;
  serverMessage: string;
  returnData: any;

  constructor() {
    this.httpErrorCode = null;
    this.shopsErrorCode = null;
    this.shopsMessage=null;
    this.returnData = null;
    this.serverMessage = null;

  }

  public isError(): boolean {
    if( (this.httpErrorCode && this.httpErrorCode !== '200') ||
        (this.shopsErrorCode && this.shopsErrorCode !== '0') ) {
      return true;
    }
    return false;
  }

  public isShopsCodeError(): boolean {
    if( this.shopsErrorCode && this.shopsErrorCode !== '0' ) {
      return true;
    }
    return false;
  }

  public initialize(errorData: any): void {

    if(errorData.data) {
      if (errorData.data.shopsCode) {
        this.shopsErrorCode = errorData.data.shopsCode;
      }
      if (errorData.data.status) {
        this.httpErrorCode = errorData.data.status;
      }
      this.returnData = errorData.data;

      if (errorData.data.shopsMsg) {
        this.shopsMessage = errorData.data.shopsMsg;
      }
      if (errorData.data.statusText) {
        this.serverMessage = errorData.data.statusText;
      }
    }
  }
}
