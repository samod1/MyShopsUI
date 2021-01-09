import { Injectable } from '@angular/core';
import {
  MyShopsException,
  JWTTokenDoesNotExists,
  JWTTokenInvalid,
  InternalServerError,
  ServerError,
  MyShopsUnauthorized
} from '../myshopsexceptions';
import { environment} from '../../environments/environment';


export class ReturnData {

  public shopsCode: number;
  public shopsMsg: string;
  public rspObject: any;
  public status: number;
  public statusText: string;
  public contentLength: number;
  public contentType: string;
  public authorization: any;


  constructor() {
    this.shopsCode = 0;
    this.shopsMsg= '';
    this.rspObject= null;
    this.status= 0;
    this.statusText= '';
    this.contentLength= 0;
    this.contentType='';
    this.authorization = null;
  }
}

function constructRetData(response: any): ReturnData{

  const shopsMsg = '';
  const ret = new ReturnData();

  console.log(response.headers);
  response.headers.forEach((val, key) => {
    console.log(key, val)
    if (key.toUpperCase() === 'SHOPS_CODE')
      ret.shopsCode = val;
    if (key.toUpperCase() === 'SHOPS_MSG')
      ret.shopsMsg = val;
    if (key.toUpperCase() === 'content-length'.toUpperCase())
      ret.contentLength = parseInt(val,10);
    if (key.toUpperCase() === 'content-type'.toUpperCase())
      ret.contentType = val;
    if (key.toUpperCase() === 'Authorization'.toUpperCase()) {
      ret.authorization = val;
      console.log(btoa(val))
    }

  });

  ret.rspObject = response;
  console.log('constructRetData(response)');
  console.log(ret.rspObject);

  ret.status = response.status;
  ret.statusText = response.statusText;

  if (ret.status !== 200) {

    /* Unathorized */
    if(ret.status === 400){
      console.log()
      throw new MyShopsException(response.statusText,ret);
    }

    /* Forbidden */
    if(ret.status === 403){
      console.log('Server call forbidden, JWT token invalid.')
      throw new JWTTokenInvalid('Server call forbidden, JWT token invalid.',response);
    }
    /* Unathorized */
    if(ret.status === 401){
      console.log()
      throw new MyShopsUnauthorized(response.statusText,response);
    }
    /* Internal server error */
    if(ret.status === 500){
      console.log()
      throw new InternalServerError(ret.statusText,response)
    }

    throw new ServerError(shopsMsg ? shopsMsg : ret.statusText, ret);
  }

  return ret;

}

export async function getJson(response: any){

  let retObject: any = null;

  try {
    retObject = await response.json();
    console.log('getJson()');
    console.log(retObject);
    return retObject;
  }
  catch(error){
    console.log(error);
    return null;
  }
}

export async function getText(response: any){
  let retObject: any = null;
  try {
    retObject = await response.text();
    return retObject;
  }
  catch(error){
    console.log(error);
    return null;
  }
}

export async function getBinary(response){
  let retObject: any = null;
  try {
    retObject = await response.arrayBuffer();
    return retObject;
  }
  catch(error){
    console.log(error);
    return null;
  }
}

function getJwtToken(){
  let jwttoken: string;
  jwttoken = localStorage.getItem(environment.authorizationHeaderName);
  return jwttoken;
}

export async function postData(url: string = '', data: any): Promise<ReturnData> {

  url = environment.serverBaseUrl +  url;
  // Default options are marked with *
  const jwttok = getJwtToken();
  let ret: ReturnData;
  const jsonData: string = JSON.stringify(data);
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      SHOPS_CODE: String(0),
      Authorization: jwttok
    },
    redirect: 'follow', // manual, *follow, error
    // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin,
    // strict-origin-when-cross-origin, unsafe-url
    referrerPolicy: 'no-referrer',
    body: jsonData // body data type must match "Content-Type" header
  });
  console.log('postData()');
  ret = constructRetData(response);
  return ret;
}

export async function getData(url = '') {
  let ret: ReturnData;

  if(url.substr(1,1) === '/'){
    url = url.substr(1);
  }
  url = environment.serverBaseUrl +  url;

  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      SHOPS_CODE: String(0),
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: getJwtToken()
    },
    redirect: 'follow', // manual, *follow, error
    // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin,
    // strict-origin, strict-origin-when-cross-origin, unsafe-url
    referrerPolicy: 'no-referrer'

  });

  ret = constructRetData(response);
  return ret;

}


@Injectable({
  providedIn: 'root'
})
export class ServerCallService {

  constructor() { }
}
