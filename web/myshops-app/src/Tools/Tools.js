import log from 'loglevel';


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
            if(this.server.srvDescId != null && this.server.srvDescId != 0){
                let msg_prefix= this.msgPrefix;
                if(this.server.srvDescId === "500")
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
