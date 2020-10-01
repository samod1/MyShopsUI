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


    let shops_code = 0;
    let shops_msg = '';
    let ret = retData;

    console.log(response.headers);
    response.headers.forEach((val, key) => {
        console.log(key, val)
        if(key === 'SHOPS_CODE')
            shops_code = val;
        if(key === 'SHOPS_MSG')
            shops_msg = val;
    });

    let rspJSON = null;
    try {
        rspJSON = response.json(); // parses JSON response into native JavaScript objects
        rspJSON.then((data)=>{
            console.log(data);
        });
    }
    catch (e) {
        console.log(e);
    }
    ret.rspJSON= rspJSON;


    ret.shops_code = ret.rspJSON.error.SHOPS_CODE;
    ret.shops_msg = response.headers.SHOPS_MSG;
    ret.status = response.status;
    ret.statusText = response.statusText;



    if(ret.status!=500){
        throw new ServerError(shops_msg?shops_msg:ret.statusText,ret);
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


