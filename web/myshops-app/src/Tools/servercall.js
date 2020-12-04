import {config} from "../config/liveconfig"
import messages from "../locale/messages";
import {Config,AuthorizationHeaderName} from "./Config"
import {JWTTokenInvalid, MyShopsException} from "./MyShopsExceptions"
import {getLocalStorageItem} from "./Tools";

export class ServerError extends Error {
    constructor(message = '',errData=null) {
        super(message)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError)
        }

        this.name = 'ServerError';
        this.data = errData;
        // Custom debugging information
        this.date = new Date()
    }
}


export class InternalServerError extends Error {
    constructor(message = '',errData=null) {
        super(message)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InternalServerError)
        }

        this.name = 'InternalServerError';
        this.data = errData;
        // Custom debugging information
        this.date = new Date()
    }
}


class retData {
    constructor() {
        this.shops_code= 0;
        this.shops_msg= "";
        this.rspObject= null;
        this.status= 0;
        this.statusText= "";
        this.content_length= 0;
        this.content_type="";
    }
}

function constructRetData(response){

    let shops_code = 0;
    let shops_msg = '';
    let content_length = 0;
    let ret = new retData();

    console.log(response.headers);
    response.headers.forEach((val, key) => {
        console.log(key, val)
        if (key.toUpperCase() === 'SHOPS_CODE')
            ret.shops_code = val;
        if (key.toUpperCase() === 'SHOPS_MSG')
            ret.shops_msg = val;
        if (key.toUpperCase() === 'content-length'.toUpperCase())
            ret.content_length = parseInt(val);
        if (key.toUpperCase() === 'content-type'.toUpperCase())
            ret.content_type = val;
        if (key.toUpperCase() === 'Authorization'.toUpperCase()) {
            ret.Authorization = val;
            console.log(btoa(val))
        }

    });

    ret.rspObject = response;
    console.log("constructRetData(response)");
    console.log(ret.rspObject);

    ret.status = response.status;
    ret.statusText = response.statusText;

    if (ret.status != 200) {

        /* Forbidden */
        if(ret.status == 403){
            console.log("Server call forbidden, JWT token invalid.")
            throw new JWTTokenInvalid("Server call forbidden, JWT token invalid.",response);
        }

        /* Unathorized */
        if(ret.status == 401){
            console.log()
            throw new MyShopsException(response.statusText,response);
        }
        /* Internal server error */
        if(ret.status == 500){
            console.log()
            throw new InternalServerError(ret.statusText,response)
        }

        throw new ServerError(shops_msg ? shops_msg : ret.statusText, ret);
    }

    return ret;

}

export async function getJson(response){
    try {
        let retObject = await response.json();
        console.log("getJson()");
        console.log(retObject);
        return retObject;
    }
    catch(error){
        console.log(error);
        return null;
    }
}
export async function getText(response){
    try {
        let retObject = await response.text();
        return retObject;
    }
    catch(error){
        console.log(error);
        return null;
    }
}
export async function getBinary(response){
    try {
        let retObject = await response.arrayBuffer();
        return retObject;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

function getJwtToken(){
    let jwttoken = getLocalStorageItem(AuthorizationHeaderName);
    return jwttoken;
}

export async function postData(url = '', data = {}) {
    // Default options are marked with *
    let jwttok = getJwtToken();
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'SHOPS_CODE':0,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: jwttok
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log("postData()");
    let ret = constructRetData(response);
    return ret;
}

export async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'SHOPS_CODE':0,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': getJwtToken()
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    });

    let ret = constructRetData(response);
    return ret;

}


