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
