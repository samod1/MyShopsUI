import React,{Component} from "react";
import {isLogged} from "../Tools/Tools";
import {JWTTokenInvalid} from "../Tools/MyShopsExceptions";
import {EVNAME_INVALIDJWT, EVNAME_SHOW_INFO} from "./Page/Page/Page";

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
        if(logged != globalState_logged) {
            globalState_logged = logged;
            this.invokeLoggedListeners(logged);
       }
    }

    getLogged(){
        return globalState_logged;
    }


}


