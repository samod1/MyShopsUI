import {config} from "../config/liveconfig"
import messages from "../locale/messages";

export const apiurl = config.api_url;
export const apiurl_registration = config.api_url_registration;

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
    });



    /*
    if(ret.content_type.startsWith("application/json") &&
        ret.content_length != 0){
        ret.rspObject = getJson(response)
    } else if(ret.content_type.startsWith("text/") &&
        ret.content_length != 0){
        ret.rspObject = getText(response);
    } else if( ret.content_length != 0){
        ret.rspObject = getBinary(response);
    }*/

    ret.rspObject = response;
    console.log("constructRetData(response)");
    console.log(ret.rspObject);

    ret.status = response.status;
    ret.statusText = response.statusText;

    if (ret.status != 200) {
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

export async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'SHOPS_CODE':0
            // 'Content-Type': 'application/x-www-form-urlencoded',
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
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    let ret = constructRetData(response);
    return ret;

}


