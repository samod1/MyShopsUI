
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React,{Component}   from 'react';
import Footer from "../Footer/Footer";
import Body from "../Body/Body";
import ShopsMenu from '../Menu/Menu'
import {Container, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import Registerform from "../Registerform/Registerform";
import Pageheader from "../Header/Pageheader";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const menustate = {
    register_mode: true,
    login_mode: false,
    info_mode: false,
    fixed: true,
};

function getMenuState(){
    return menustate;
}



 export default class ResponsiveContainer extends Component {

    constructor(props) {
        super(props);
    }

    state = getMenuState();

    render() {

        let body = null;
        if( this.state.register_mode) {
            body=<div></div>
        }
        if( this.state.info_mode) {
            body=<Body mobile={this.props.mobile}></Body>
        }

        return (
            <MediaContextProvider>
                <Media at="mobile">
                    <MobileContainer  mobile={this.props.mobile}>{this.props.children}</MobileContainer>
                    {body}
                    <Footer mobile={this.props.mobile}></Footer>
                </Media>
                <Media greaterThan="mobile">
                    <DesktopContainer mobile={this.props.mobile} >{this.props.children}</DesktopContainer>
                    {body}
                    <Footer mobile={this.props.mobile}></Footer>
                </Media>
            </MediaContextProvider>
        )
    }
}


  ResponsiveContainer.propTypes = {
    children: PropTypes.node,
  }



function createTitle(state,mobile){

    let ph="";
    let style = { minHeight: 550, padding: '1em 0em' };
    let styleMenu = {paddingTop: '1em' };


    if(state.register_mode){
        style = { minHeight: 80, padding: '0em 0em' };
        styleMenu = { paddingTop: '1em' };
        ph=<div style={{paddingBottom: '2em', minHeight: '300px',backgroundColor: "white"}}>
            <Registerform mobile={mobile}></Registerform>
        </div>
    };
    if(state.info_mode)
    {
        style = { minHeight: 550, padding: '0em 0em' };
        styleMenu = { paddingTop: '1em' };
        ph=<>
            <Pageheader mobile={mobile}></Pageheader>
        </>

    }
    return {ph: ph,style: style,styleMenu: styleMenu};

}



export class DesktopContainer extends Component {

    constructor(props) {
        super(props);
    }

    state = getMenuState();

    mobile = this.props.mobile;

    render() {
        const { children } = this.props
        const { fixed } = false

        let phobj = createTitle(this.state,this.props.mobile);

        let titleStyle = null;
        if(this.state.info_mode)
            titleStyle={minHeight: '500px',backgroundColor: 'black'};

        if(this.state.register_mode)
            titleStyle={minHeight: '80px',backgroundColor: 'black'};


        return (
            <div id="desktopContainer">
                <Segment
                    inverted
                    textAlign='center'
                    style={titleStyle}
                    vertical>
                    <Menu
                        fixed={fixed ? 'top' : null}
                        inverted={!fixed}
                        pointing={!fixed}
                        secondary={!fixed}
                        size='large'>
                        <ShopsMenu></ShopsMenu>
                    </Menu>
                    <Segment id="PageHeaderSegment" style={{backgroundColor: "black",padding:'0em'}}>
                        {phobj.ph}
                    </Segment>
                </Segment>

                {children}
            </div>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}


export class MobileContainer extends Component {

    constructor(props) {
        super(props);
    }

    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })
    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <div>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        inverted
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={sidebarOpened}
                        style={{paddingTop: '1em'}}
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
                            {console.log(this.props)}
                            <Pageheader mobile={true}></Pageheader>
                        </Segment>

                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}
