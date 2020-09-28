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
