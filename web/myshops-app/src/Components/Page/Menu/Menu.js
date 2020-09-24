import React, {Component} from "react";
import {Button, Container, Icon, Menu, Segment, Sidebar, Visibility} from "semantic-ui-react";
import {FormattedMessage} from "react-intl";
import Pageheader from "../Header/Pageheader";
import PropTypes from "prop-types";
import {createMedia} from "@artsy/fresnel";

const {  Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
})


class ShopsMenu extends  Component{


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
                </Container>
            );
        }
    }
}



export class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props
        const { fixed } = this.state

        return (
            <Media greaterThan='mobile'>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 700, padding: '1em 0em' }}
                        vertical
                    ><Menu
                        fixed={fixed ? 'top' : null}
                        inverted={!fixed}
                        pointing={!fixed}
                        secondary={!fixed}
                        size='large'
                    >
                        <ShopsMenu></ShopsMenu>
                    </Menu>
                        <Pageheader></Pageheader>
                    </Segment>
                </Visibility>

                {children}
            </Media>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}




export class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })
    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <Media as={Sidebar.Pushable} at='mobile'>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        inverted
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={sidebarOpened}
                    >
                        <ShopsMenu mobile="false"></ShopsMenu>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={sidebarOpened}>
                        <Segment
                            inverted
                            textAlign='center'
                            style={{ minHeight: 350, padding: '1em 0em' }}
                            vertical
                        >
                            <Container>
                                <Menu inverted pointing secondary size='large'>
                                    <Menu.Item onClick={this.handleToggle}>
                                        <Icon name='sidebar' />
                                    </Menu.Item>
                                </Menu>
                            </Container>
                            <Pageheader/>
                        </Segment>

                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Media>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}
