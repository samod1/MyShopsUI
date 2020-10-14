
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React,{Component}   from 'react';
import Footer from "../Footer/Footer";
import Body from "../Body/Body";
import ShopsMenu,{MENU_EVENT} from '../Menu/Menu'
import {Container, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import Registerform from "../Registerform/Registerform";
import CompleteRegistration from "../Registerform/CompleteRegistration";
import ShopsMainInfoBar from "../Header/ShopsMainInfoBar";
import {getJsonFromLocation} from "../../../Tools/Tools";
import Login from "../Login/Login";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})


const MAIN_PANEL_MODE_INFO          = 0x01
const MAIN_PANEL_MODE_REGISTER      = 0x02
const MAIN_PANEL_MODE_LOGIN         = 0x03
const MAIN_PANEL_MODE_REGCOMPLETE   = 0x04

export const MAIN_PANEL_PATH_MAIN          = "/"
export const MAIN_PANEL_PATH_REGISTER      = "/register"




export default class ResponsiveContainer extends Component {

    constructor(props) {
        super(props);
        this.handleCloseRegister = this.handleCloseRegister.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);
        this.handleOpenRegister = this.handleOpenRegister.bind(this);
        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleShowInfo = this.handleShowInfo.bind(this);
        this.state = {
            mainPanel_mode: MAIN_PANEL_MODE_INFO,
            fixed: true,
        };
        this.regkey=null;
        this.handlers = {
            handleCloseRegister: this.handleCloseRegister,
            handleCloseLogin: this.handleCloseLogin,
            handleOpenLogin: this.handleOpenLogin,
            handleOpenRegister: this.handleOpenRegister,
            handleShowInfo: this.handleShowInfo,
        }
        if(this.props.path && this.props.path==MAIN_PANEL_PATH_REGISTER){
            this.state.mainPanel_mode = MAIN_PANEL_MODE_REGCOMPLETE;
        }
        if(this.props.location && this.props.location.search && this.props.location.search!==""){
            let parameters = getJsonFromLocation(this.props.location);
            this.regkey = parameters["reg_key"];
            console.log(this.regkey);
        }
    }

    handleOpenRegister(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_REGISTER })
    }
    handleCloseRegister(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_INFO })
    }
    handleOpenLogin(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_LOGIN })
    }
    handleCloseLogin(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_INFO })
    }

    handleShowInfo(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_INFO })
    }

    render() {

        let body = null;
        if( this.state.mainPanel_mode == MAIN_PANEL_MODE_REGISTER) {
            body=<div></div>
        }
        if( this.state.mainPanel_mode == MAIN_PANEL_MODE_INFO) {
            body=<Body mobile={this.props.mobile}></Body>
        }
        if( this.state.mainPanel_mode == MAIN_PANEL_MODE_REGCOMPLETE) {
            body=<div></div>
        }
        if(this.props.path && this.props.path==MAIN_PANEL_PATH_REGISTER){
            body=<div></div>
        }
        if( this.state.mainPanel_mode == MAIN_PANEL_MODE_LOGIN) {
            body=<div></div>
        }

        return (
        <MediaContextProvider>
                <Media at="mobile">
                    <MobileContainer  mobile={this.props.mobile}>{this.props.children}</MobileContainer>
                    {body}
                    <Footer mobile={this.props.mobile}></Footer>
                </Media>
                <Media greaterThan="mobile">
                    <DesktopContainer mobile={this.props.mobile}
                                      handlers={this.handlers}
                                      state = {this.state}
                                      regkey = {this.regkey}
                    >
                        {this.props.children}
                    </DesktopContainer>
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

export class DesktopContainer extends Component {

    constructor(props) {
        super(props);

        this.onMenuEvent = this.onMenuEvent.bind(this);
        this.onCloseMainPanel = this.onCloseMainPanel.bind(this);
        this.createMainPanel = this.createMainPanel.bind(this);
        this.onLogged = this.props.handlers
        this.mobile = this.props.mobile;

    }

    onMenuEvent(data){
        if(data == MENU_EVENT.REGISTER){
            this.props.handlers.handleOpenRegister();
        }
        if(data == MENU_EVENT.LOGIN){
            this.props.handlers.handleOpenLogin();
        }
    }

    onCloseMainPanel(){
        this.props.handlers.handleShowInfo();
    }

    onLogged(userContext){

    }


    createMainPanel(state,mobile){
        let panel="";
        let style = { minHeight: 550, padding: '1em 0em' };
        let styleMenu = {paddingTop: '1em' };

        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_REGISTER){
            style = { minHeight: 80, padding: '0em 0em' };
            styleMenu = { paddingTop: '1em' };
            panel=<div style={{paddingBottom: '2em', minHeight: '300px',backgroundColor: "white"}}>
                <Registerform mobile={mobile} onClose={this.onCloseMainPanel}></Registerform>
            </div>
        };

        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_LOGIN){
            style = { minHeight: 80, padding: '0em 0em' };
            styleMenu = { paddingTop: '1em' };
            panel=<div style={{paddingBottom: '2em', minHeight: '300px',backgroundColor: "white"}}>
                <Login mobile={mobile} onClose={this.onCloseMainPanel} onLogged={this.onLogged}></Login>
            </div>
        };


        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_INFO)
        {
            style = { minHeight: 550, padding: '0em 0em' };
            styleMenu = { paddingTop: '1em' };
            panel=<>
                <ShopsMainInfoBar mobile={mobile}></ShopsMainInfoBar>
            </>

        }
        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_REGCOMPLETE){
            style = { minHeight: 80, padding: '0em 0em' };
            styleMenu = { paddingTop: '1em' };
            panel=<div style={{paddingBottom: '2em', minHeight: '300px',backgroundColor: "white"}}>
                <CompleteRegistration mobile={mobile} onClose={this.onCloseMainPanel} regkey={this.props.regkey}>
                </CompleteRegistration>
            </div>
        };


        return {panel: panel,style: style,styleMenu: styleMenu};
    }

    render() {
        const { children } = this.props
        const { fixed } = false

        let mainPanel = this.createMainPanel(this.props.state,this.props.mobile);

        let titleStyle = null;
        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_INFO)
            titleStyle={minHeight: '500px',backgroundColor: 'black'};

        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_REGISTER)
            titleStyle={minHeight: '80px',backgroundColor: 'black'};

        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_LOGIN)
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
                        <ShopsMenu menuHandler={this.onMenuEvent}></ShopsMenu>
                    </Menu>
                    <Segment id="PageHeaderSegment" style={{backgroundColor: "black",padding:'0em'}}>
                        {mainPanel.panel}
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
                            <ShopsMainInfoBar mobile={true}></ShopsMainInfoBar>
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
