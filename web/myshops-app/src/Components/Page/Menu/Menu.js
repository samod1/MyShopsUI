import React, {Component, useState} from "react";
import {Button, Container, Dropdown, Icon, Menu, Segment, Sidebar, Visibility} from "semantic-ui-react";
import {FormattedMessage} from "react-intl";
import Pageheader from "../Header/ShopsMainInfoBar";
import PropTypes from "prop-types";
import {createMedia} from "@artsy/fresnel";
import Languages from "../../../Tools/Languages";
import {isLogged} from "../../../Tools/Tools";
import Registerform from "../Registerform/Registerform";
import Body from "../Body/Body";
import {JWTTokenInvalid} from "../../../Tools/MyShopsExceptions";
import {BaseComponent} from "../../BaseComponent";
import {EVNAME_SHOW_INFO,EVNAME_OPEN_LOGIN,EVNAME_CLOSE_REGISTER,EVNAME_OPEN_REGISTER,EVNAME_CLOSE_LOGIN} from "../Page/Page";

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


export default class ShopsMenu extends  BaseComponent{

    constructor(props) {
        super(props);
        this.onSignup = this.onSignup.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.setHref = this.setHref.bind(this);
        this.showUserMenu = this.showUserMenu.bind(this);
        this.onLogged = this.onLogged.bind(this);
        this.setName("ShopsMenu");
        this.addLoggedListener(this.onLogged);
        this.state = {logged: false};
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
    showUserMenu(ev, data)
    {
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
        this.setState({logged: true});
    }


    render() {
        const fixed = this.props.fixed;
        const mobile = this.props.mobile;

        if(!mobile) {

            let hideLoginMenu= {};
            let hideUserButton= {};
            if(this.state.logged)
                hideLoginMenu={
                display: 'none'
                }
            else
                hideUserButton={
                    display: 'none'
                }

            return (
                <Container>
                    <Menu.Item as='a'>
                        <FormattedMessage id="page.menu.eshops"
                                          defaultMessage="E-Shops"
                                          description="Work with eshops"/>
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <FormattedMessage id="page.menu.userdata"
                                          defaultMessage="User settings"
                                          description="Work with user settings"/>
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <Languages></Languages>
                    </Menu.Item>

                    <Menu.Item position='right' style={hideLoginMenu}>
                        <Button as='a' inverted={!fixed} onClick={this.onLogin}>
                            <FormattedMessage id="page.menu.login"
                                              defaultMessage="Log in"
                                              description="Login user"/>
                        </Button>
                        <Button as='a' inverted={!fixed} primary={fixed} style={{marginLeft: '0.5em'}} onClick={this.onSignup}>
                            <FormattedMessage id="page.menu.signup"
                                              defaultMessage="Signup"
                                              description="Signup new user"/>
                        </Button>
                    </Menu.Item>
                    <Menu.Item position='right' style={hideUserButton}>
                        <Button icon  style={{color:'white',backgroundColor: 'black', borderRadius: 0}} onClick={this.showUserMenu}>
                            <Icon disabled={true} name='user outline' size='large'/>
                        </Button>
                    </Menu.Item>
                </Container>
            );
        }
        else{
            return (
                <Container>
                    <Menu.Item as='a'>
                        <FormattedMessage id="page.menu.eshops"
                                          defaultMessage="E-Shops"
                                          description="Work with eshops"/>
                    </Menu.Item>
                    <Menu.Item as='a'>
                        <FormattedMessage id="page.menu.userdata"
                                          defaultMessage="User settings"
                                          description="Work with user settings"/>
                    </Menu.Item>

                    <Menu.Item position='right'>
                        <FormattedMessage id="page.menu.login"
                                          defaultMessage="Log in"
                                          description="Login user"/>
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <FormattedMessage id="page.menu.signup"
                                          defaultMessage="Signup"
                                          description="Signup new user"/>
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Languages></Languages>
                    </Menu.Item>
                </Container>
            );
        }
    }
}





