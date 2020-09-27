import React, {Component, useState} from "react";
import {Button, Container, Dropdown, Icon, Menu, Segment, Sidebar, Visibility} from "semantic-ui-react";
import {FormattedMessage} from "react-intl";
import Pageheader from "../Header/Pageheader";
import PropTypes from "prop-types";
import {createMedia} from "@artsy/fresnel";
import Languages from "../../../Tools/Languages";
import Registerform from "../Registerform/Registerform";
import Body from "../Body/Body";

const {  Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
})



export default class ShopsMenu extends  Component{
    render() {
        const fixed = this.props.fixed;
        const mobile = this.props.mobile;

        if(!mobile) {
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


                    <Menu.Item position='right'>
                        <Button as='a' inverted={!fixed}>
                            <FormattedMessage id="page.menu.login"
                                              defaultMessage="Log in"
                                              description="Login user"/>
                        </Button>
                        <Button as='a' inverted={!fixed} primary={fixed} style={{marginLeft: '0.5em'}}>
                            <FormattedMessage id="page.menu.signup"
                                              defaultMessage="Signup"
                                              description="Signup new user"/>
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





