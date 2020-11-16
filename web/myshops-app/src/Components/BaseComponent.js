import React,{Component} from "react";
import {getLocalStorageItem, isLogged,decodeJWT} from "../Tools/Tools";
import Config from "../Tools/Config";

var loggedHandlers=[];
var globalState_logged = false;

export  class BaseComponent extends Component{


    constructor(props) {
        super(props);
        this._handlersCopy = null;
        let hc = {};
        if (props.handlers) {
            hc = Object.assign(hc,props.handlers);
        }
        this._handlersCopy = hc;
        this.name = "BaseComponent";
        this.dispatchEvent=this.dispatchEvent.bind(this);
        this.setName = this.setName.bind(this);
        this.getHandlersCopy = this.getHandlersCopy.bind(this);
        this.updateHandlersCopy = this.updateHandlersCopy.bind(this);
        this.globalState_logged = false;
        this.config = new Config();
    }

    setName(name){
        this.name = name;
    }

    dispatchEvent(type,ev,data){
        let handler = this.props.handlers[type];
        if(!handler){
            handler = this.props.handlers["default"];
        }
        if(handler){
            if(!handler(type,ev,data))
                return;
            else{
                if(this.props.link){
                    this.props.link.dispatchEvent(type,ev,data);
                }
            }
        }
    }

    componentDidMount() {
        console.log("BaseComponent.componentDidMount");
    }

    componentWillUnmount() {
        console.log("BaseComponent.componentWillMount");
    }
    updateHandlersCopy(type,handler){
        this._handlersCopy[type]=handler;
    }
    getHandlersCopy(){
        return {handlers: this._handlersCopy}
    }

    addLoggedListener(listener){
        if(!loggedHandlers.includes(listener)){
            loggedHandlers.push(listener);
        }
    }
    invokeLoggedListeners(logged){
        loggedHandlers.forEach( (hnd) => {
            hnd(logged);
        });
    }

    setLogged(logged){
        if(logged !== globalState_logged) {
            globalState_logged = logged;
            this.invokeLoggedListeners(logged);
       }
    }

    getUserName(){
        let jwtData = decodeJWT();
        let uname = null;
        if(jwtData) {
            uname = jwtData.jwtClaims.identity;
        }
        return {username: uname};
    }

    getLogged(){
        return globalState_logged;
    }

    render(){
        return(<></>);
    }

    isDesktop(){
        if(window.screenMedia)
            return window.screenMedia.desktop;
        else
            return false;
    }
    isMobile(){
        if(window.screenMedia)
            return window.screenMedia.mobile;
        else
            return false;
    }
    isTablet(){
        if(window.screenMedia)
            return window.screenMedia.tablet;
        else
            return false;
    }

}

export class screenMedia {

        constructor() {
            this.mobile = false;
            this.tablet = false;
            this.desktop = false;
            this.mqls = [ window.matchMedia('(max-width: 767px)'),
                          window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
                          window.matchMedia('(min-width: 1024px)')]
            this.mqls.forEach( (mql) => {
                this.changeML(mql);
                mql.addEventListener('change',this.changeML);
            });
        }

        changeML(ev){

            if(!window.screenMedia) {
                window.screenMedia = {
                    desktop: false,
                    tablet: false,
                    mobile: false
                }
            }
            this.mobile = false;
            this.tablet = false;
            this.desktop = false;

            console.log("*** CHANGEML");

            let txt = ev.toString();
            if(ev.matches === true){

                window.screenMedia.desktop= false;
                window.screenMedia.tablet= false;
                window.screenMedia.mobile= false;

                if(ev.media === '(max-width: 767px)'){
                    txt = ev.media;
                    this.mobile = true;
                    window.screenMedia.mobile = true;
                } else if (ev.media === '(min-width: 768px) and (max-width: 1023px)'){
                    txt = ev.media;
                    this.tablet = true;
                    window.screenMedia.tablet = true;
                } else if (ev.media === '(min-width: 1024px)'){
                    txt = ev.media;
                    this.desktop = true;
                    window.screenMedia.desktop = true;
                }
                console.log(window.screenMedia);
            }
        }
    }


