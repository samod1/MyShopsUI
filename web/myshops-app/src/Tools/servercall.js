import {config} from "../config/liveconfig"
import messages from "../locale/messages";

export const apiurl = config.api_url;


export class ServerError extends Error {
    constructor(message = '',errData=null) {
        super(message)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError)
        }

        this.name = 'ServerError';
        this.data = retData;
        // Custom debugging information
        this.date = new Date()
    }
}

const retData = {
    shops_code: 0,
    shops_msg: "",
    rspJSON: null,
    status: 0,
    statusText: ""
}

function constructRetData(response){
    let shops_code = response.headers.SHOPS_CODE;
    let shops_msg = response.headers.SHOPS_MSG;
    let status = response.status;
    let statusText = response.statusText;

    let rspJSON = response.json(); // parses JSON response into native JavaScript objects

    let ret = retData;
    ret.shops_code= shops_code;
    ret.shops_msg= shops_msg;
    ret.rspJSON= rspJSON;
    ret.status= status;
    ret.statusText= statusText

    if(status!=500){
        throw new ServerError(shops_msg?shops_msg:statusText,ret);
    }

    return ret;
}

export async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return constructRetData(response);
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

    return constructRetData(response);
}


