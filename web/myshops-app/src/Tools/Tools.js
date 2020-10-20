import log from 'loglevel';
import {AuthorizationHeaderName} from "./Config";
import {postData, getData, ServerError} from "./servercall";
import {MyShopsException,JWTTokenInvalid} from "./MyShopsExceptions";
import Config from "./Config"


export class Logger {

    constructor() {
    }

    static getLogger(){
        return new Logger();
    }

    info(message){
        log.info(message);
    }

    warn(message){
        log.warn(message);
    }
    error(message){
        log.error(message);
    }

}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export function getLocalizedString(msgid,intl){
    let str = null;
    if(msgid !== "")
        str =intl.formatMessage({id: msgid,
            defaultMessage: "ENTER MSGID '" + msgid +"' TO MESSAGES"});
    return str;
}

export function getJsonFromLocation(location) {
    if(location && location.search && location.search !== "") {
        let url = location.search;
        var query = url.substr(1);
        var result = {};
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }
    return null;
}

export class MessageLocalization {

    constructor() {
        this.server= {
                srvErr: false,
                srvDescId: "",
                retData: null,
                srvMsg: "",
                status: 0,
                statusText: ""};
        this.localError = {errdescid: null};
        this.msgPrefix = "";

        this.message_detail = this.message_detail.bind(this);
    }

    message_detail(intl){

        let msgid;
        if(this.server.srvErr)
        {

            if(this.server.status == 500 ||
               this.server.status == 401
            ){
                let msg_prefix= "srv_";
                msgid = msg_prefix + this.server.status.toString();
                return getLocalizedString(msgid,intl)
            } else if(this.server.srvDescId != null && this.server.srvDescId != 0){
                let msg_prefix= this.msgPrefix;
                if(this.server.srvDescId === "500" || this.server.srvDescId === "400" )
                    msg_prefix= "srv_"
                msgid = msg_prefix + this.server.srvDescId.toString();
                return getLocalizedString(msgid,intl)
            } else if(this.server.statusText){
                msgid = "srv_unknown";
                let msg = getLocalizedString(msgid,intl);
                return (msg + ": " + this.server.statusText);
            }  else if(this.server.srvMsg) {
                let msg = this.server.srvMsg;
                return (msg);
            }
        } else if(this.server.status === 200){
            if(this.server.srvDescId != null && this.server.srvDescId != 0){
                msgid = this.server.srvDescId;
                return getLocalizedString(msgid,intl)
            } else if(this.server.statusText){
                msgid = "srv_unknown";
                let msg = getLocalizedString(msgid,intl);
                return (msg + ": " + this.server.statusText);
            }
        }
        if(this.localError.errdescid){
            if(this.localError.errdescid != 0){
                return getLocalizedString(this.localError.errdescid,intl)
            }
        }
        return null;
    }
}

export function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
export function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
export function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


export function setLocalStorageItem(key,val){
    window.localStorage.setItem(key,val);
}

export function getLocalStorageItem(key){
    let ret = window.localStorage.getItem(key);
    return ret;
}

export function decodeJWT(jwtData){

    let toks = jwtData.split(" ")
    let jwtText = btoa(toks[1]);
    console.log(jwtText);


}

export async function isLogged(){

    let ct = new Config();

    getData(ct.api_url + '/auth/isLogged' )
        .then(retData => {
            console.log("JWT token is valid");
            return true;
        })
        .catch(error => {
            if( error instanceof  JWTTokenInvalid) {
                console.log("JWT token is valid");
                throw error;
            } else {
                throw error;
            }
        });

}