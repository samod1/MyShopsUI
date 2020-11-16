import React, {Component, forwardRef, useState} from "react";
import {Button,Popup, Container, Dropdown, Icon, Menu, Segment, Sidebar, Visibility} from "semantic-ui-react";
import {FormattedMessage, injectIntl } from "react-intl";
import {createMedia} from "@artsy/fresnel";
import Languages from "../../../Tools/Languages";
import {isLogged,getLocalizedString, MessageLocalization} from "../../../Tools/Tools";
import {BaseComponent} from "../../BaseComponent";
import {EVNAME_SHOW_INFO,
        EVNAME_OPEN_LOGIN,
        EVNAME_CLOSE_REGISTER,
        EVNAME_OPEN_REGISTER,
        EVNAME_CLOSE_LOGIN,
        EVNAME_LOGOUT,
        EVNAME_USER_SETTINGS} from "../Page/Page";


const {  Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
})

export const MENU_EVENT = {
    REGISTER: 0x01,
    LOGIN: 0x02,
}


export  class ShopsMenu extends  BaseComponent{

    constructor(props) {
        super(props);
        this.onSignup = this.onSignup.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.setHref = this.setHref.bind(this);
        this.onLogged = this.onLogged.bind(this);
        this.setName("ShopsMenu");
        this.addLoggedListener(this.onLogged);
        this.state = {logged: this.getLogged()};

    }

    onSignup(ev, data)
    {
        this.setHref("#signup");
        this.dispatchEvent(EVNAME_OPEN_REGISTER,ev,data);
    }
    onLogin(ev, data)
    {
        this.setHref("#login");
        this.dispatchEvent(EVNAME_OPEN_LOGIN,ev,data);
    }

    setHref(href)
    {
        let url = window.location.href;
        if (url.indexOf("/register") != -1)
            window.location.href = "/" + href;
        else
            window.location.href = href;
    }
    onLogged(logged){
        this.setState({logged: logged});
    }



    render() {
        const fixed = this.props.fixed;

        let hideLoginMenu = {};
        let hideEshopMenu = {fontSize: "1.2em"};
        let hideLangMenu = {fontSize: "1.1em"};
        let hideUserMenu = {};
        if (this.state.logged){
            hideLoginMenu = {
                display: 'none'
            }
            hideLangMenu = {
                display: 'none'
            }
        }
        else {
            hideUserMenu = {
                display: 'none'
            }
            hideEshopMenu = {
                display: 'none'
            }
        }

        let topMenuContainerClass = {
            display:"flex",
            flexFlow: "row",
            justifyContent:"space-between",
            padding: "0px 0px 14px 0px",
            alignItems: "center"
        }

        let menuSideGap= {width: "5.5em"};
        if(this.isTablet())
            menuSideGap.width = "1.5em";

        return (
            <div id="topMenuContainer" style={topMenuContainerClass}>
                <div className="flexline">
                    <div style={menuSideGap}/>
                    <Menu.Item as='span'  inverted style={hideEshopMenu}>
                        <FormattedMessage id="page.menu.eshops"
                                          defaultMessage="E-Shops"
                                          description="Work with eshops"/>
                    </Menu.Item>
                    <div style={{width: "1em"}}/>
                    <Menu.Item as='span'  inverted style={hideEshopMenu}>
                        <FormattedMessage id="page.menu.profiles"
                                          defaultMessage="Profiles"
                                          description="Work with profiles"/>
                    </Menu.Item>
                    <Menu.Item as='span' fitted="vertically"  inverted style={hideLangMenu}>
                        <Languages></Languages>
                    </Menu.Item>
                </div>
                <div className="flexline">
                    <Menu.Item position='right' style={hideLoginMenu}>
                        <Button as='a' inverted={!fixed} onClick={this.onLogin}>
                            <FormattedMessage id="page.menu.login"
                                              defaultMessage="Log in"
                                              description="Login user"/>
                        </Button>
                        <Button as='a' inverted={!fixed} primary={fixed} style={{marginLeft: '0.5em'}}
                                onClick={this.onSignup}>
                            <FormattedMessage id="page.menu.signup"
                                              defaultMessage="Signup"
                                              description="Signup new user"/>
                        </Button>
                    </Menu.Item>
                    <Menu.Item position='right' style={hideUserMenu}>
                        <UserMenu link={this} {...this.getHandlersCopy()}></UserMenu>
                    </Menu.Item>
                    <div style={menuSideGap}/>
                </div>
            </div>
        );
    }
}


class UserMenuIntl extends BaseComponent{

    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.onSettings = this.onSettings.bind(this);

    }

    onLogout(){
        this.dispatchEvent(EVNAME_LOGOUT,null,null);
    }

    onSettings(){
        this.dispatchEvent(EVNAME_USER_SETTINGS,null,null);
    }


    render(){

        let userIcon = <Icon name="user outline" size='big'></Icon>
        const intl = this.props.intl;

        return(
            <>
                <Dropdown className='icon black'
                          floating
                          labeled
                          button
                          icon='user outline'
                          text={this.getUserName().username}
                           >
                    <Dropdown.Menu>
                        <Dropdown.Item icon='setting'
                                       text={getLocalizedString("page.menu.settings",intl)}
                                       onClick={this.onSettings}
                        />
                        <Dropdown.Divider />
                        <Dropdown.Item icon='log out'
                                       text={getLocalizedString("page.menu.logout",intl)}
                                       onClick={this.onLogout}
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </>

        );

    }

}


const UserMenu =  injectIntl(UserMenuIntl);