import {media,BaseComponent} from "../BaseComponent";
import {FormattedMessage, injectIntl} from "react-intl";
import React from "react";
import * as Tools  from "../../Tools/Tools";
import {getLocalizedString} from "../../Tools/Tools";
import "./Menu.css"
import "../../css/MyShops.css"
import {Icon} from "semantic-ui-react";




class MenuIntl extends BaseComponent{


    constructor(props) {
        super(props);
        this.titleID = this.props.titleID;
        this.sideBar = false;
        if(this.props.link.isSidebar())
            this.sideBar = true;
    }



    render(){
        const {intl} = this.props;

        let activeMenuClass = "";
        if(this.props.vertical){
            activeMenuClass = "verticalMenu";
        }
        if(this.props.horizontal){
            activeMenuClass = "horizontalMenu";
        }

        let title;
        if(this.sideBar){
            title=<h5>
                <FormattedMessage id={this.titleID}
                                  description={this.titleID}/>
            </h5>
            activeMenuClass = "verticalMenu sidebar"
        }else{
            title=<h3>
                <FormattedMessage id={this.titleID}
                                  description={this.titleID}/>
            </h3>
        }

        return (
            <div className={activeMenuClass}>
                {title}
                {this.props.children}
            </div>
        )
    }
}

class MenuItemIntl extends BaseComponent{

    constructor(props) {
        super(props);
        this.name = props.name;
        this.active = props.active;
        this.createItemInner = this.createItemInner.bind(this);
        this.onclick = this.onclick.bind(this);
        this.sideBar = false;
    }

    createItemInner(intl){

        let inner;
        let text = getLocalizedString(this.props.textID,intl);
        let icon;


        if(this.props.link.isSidebar())
            this.sideBar = true;
        console.log("*** SIDEBAR this.sideBar" + this.sideBar);

        if(this.sideBar){
            let fs="1.6em";
            let flow = "column";

            if(this.props.icon){
                icon=<span style={{textAlign: "center"}}>
                    <Icon className={this.props.icon} style={{fontSize: fs}} />
                </span>
            }
            if(icon){
                inner=<span className={"innerMenuItem"}  style={{flexFlow:flow, textAlign: "center" }}>
                            {icon}
                        <span>{text}</span>
                      </span>
            }else{
                inner=<span>{text}</span>
            }
        }else{
            if(this.props.icon){
                icon=<div className="menuItemIconWide">
                    <Icon className={this.props.icon} style={{fontSize: "1.2em" }} />
                </div>
            }
            if(icon){
                inner=<span className={"innerMenuItem"} >
                <span >{text}</span>
                    {icon}
            </span>
            }else{
                inner=<span>{text}</span>
            }
        }
        return inner;
    }

    onclick(ev,data){
        data=this.name;
        this.props.onClick(ev,data);
    }

    render() {
        const {intl} = this.props;
        let cls = "menuItem";
        if(this.props.active)
            cls += " activeMenuItem";
        if(this.props.link.isSidebar())
            cls += " menuItemIcon";


        console.log(this.name + " active=" + this.props.active)

        return (
            <div id={this.name} className={cls} onClick={this.onclick}>
                {this.createItemInner(intl)}
            </div>
        )
    }
}


export const Menu =  injectIntl(MenuIntl);
export const MenuItem = injectIntl(MenuItemIntl);
