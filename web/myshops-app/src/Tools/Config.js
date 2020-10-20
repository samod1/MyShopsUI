import {config} from "../config/liveconfig"

export var AuthorizationHeaderName = 'Authorization';

export default class Config {

    constructor() {

        this.myStorage = window.localStorage;
        this.loadConfiguration = this.loadConfiguration.bind(this);
        this.api_server = null;
        this.api_url = null;
        this.environmentName = null;
        this.developmentMode = true;
        this.api_url_registration = null;
        this.authorizationHeader=null;

        this.loadConfiguration();
    }

    loadConfiguration(){

        if(config.dev) {
            if (this.myStorage.getItem("api_server"))
                this.api_server = this.myStorage.getItem("api_server");
            else
                this.api_server = config.api_server;
            if (this.myStorage.getItem("api_url"))
                this.api_url = this.myStorage.getItem("api_url");
            else
                this.api_url = config.api_url;
            if (this.myStorage.getItem("api_url_registration"))
                this.api_url_registration = this.myStorage.getItem("api_url_registration");
            else
                this.api_url_registration = config.api_url_registration;
            if (this.myStorage.getItem(AuthorizationHeaderName))
                this.authorizationHeader = this.myStorage.getItem(AuthorizationHeaderName);
            else
                this.authorizationHeader = config.authorizationHeader;

        } else {
            this.api_server = config.api_server;
            this.api_url = config.api_url;
        }

        this.environmentName = config.env;
        this.developmentMode = config.dev;

    }

    saveConfiguration() {
        if (this.api_server)
            if (this.api_server !== config.api_server ||
                (this.myStorage.getItem("api_server") && this.myStorage.getItem("api_server") !== this.api_server))
                this.myStorage.setItem("api_server", this.api_server);

        if (this.api_url)
            if (this.api_url !== config.api_url ||
                (this.myStorage.getItem("api_url") && this.myStorage.getItem("api_url") !== this.api_url))
                this.myStorage.setItem("api_url", this.api_url);


        if (this.api_url_registration)
            if (this.api_url_registration !== config.api_url_registration ||
                (this.myStorage.getItem("api_url_registration") && this.myStorage.getItem("api_url_registration") !== this.api_url_registration))
                this.myStorage.setItem("api_url_registration", this.api_url_registration);

        if (this.authorizationHeader)
            if (this.authorizationHeader !== config.authorizationHeader ||
                (this.myStorage.getItem(AuthorizationHeaderName) && this.myStorage.getItem(AuthorizationHeaderName) !== this.authorizationHeader))
                this.myStorage.setItem(AuthorizationHeaderName, this.authorizationHeader);
    }
}