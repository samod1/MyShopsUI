
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
import {getJsonFromLocation, isLogged} from "../../../Tools/Tools";
import Login from "../Login/Login";
import {BaseComponent} from "../../BaseComponent";
import {JWTTokenInvalid,JWTTokenDoesNotExists} from "../../../Tools/MyShopsExceptions";

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
const MAIN_PANEL_MODE_LOGGED        = 0x05

export const MAIN_PANEL_PATH_MAIN          = "/"
export const MAIN_PANEL_PATH_REGISTER      = "/register"

export const EVNAME_CLOSE_REGISTER = "CloseRegister";
export const EVNAME_CLOSE_LOGIN = "CloseLogin";
export const EVNAME_OPEN_REGISTER = "OpenRegister";
export const EVNAME_OPEN_LOGIN = "OpenLogin";
export const EVNAME_SHOW_INFO = "ShowInfo";
export const EVNAME_INVALIDJWT = "InvalidJwt"
export const EVNAME_LOGINSUCCESS = "LoginSuccess"


export default class ResponsiveContainer extends BaseComponent {

    constructor(props) {
        super(props);
        this.handleCloseRegister = this.handleCloseRegister.bind(this);
        this.handleCloseLogin = this.handleCloseLogin.bind(this);
        this.handleOpenRegister = this.handleOpenRegister.bind(this);
        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleShowInfo = this.handleShowInfo.bind(this);
        this.handleInvalidJwt = this.handleInvalidJwt.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);

        this.state = {
            mainPanel_mode: MAIN_PANEL_MODE_INFO,
            fixed: true,
        };
        this.regkey=null;

        this.updateHandlersCopy(EVNAME_CLOSE_REGISTER,this.handleCloseRegister);
        this.updateHandlersCopy(EVNAME_CLOSE_LOGIN, this.handleCloseLogin);
        this.updateHandlersCopy(EVNAME_OPEN_LOGIN,this.handleOpenLogin);
        this.updateHandlersCopy(EVNAME_OPEN_REGISTER,this.handleOpenRegister);
        this.updateHandlersCopy(EVNAME_SHOW_INFO,this.handleShowInfo);
        this.updateHandlersCopy(EVNAME_INVALIDJWT,this.handleInvalidJwt);
        this.updateHandlersCopy(EVNAME_LOGINSUCCESS,this.handleLoginSuccess);

        if(this.props.path && this.props.path==MAIN_PANEL_PATH_REGISTER){
            this.state.mainPanel_mode = MAIN_PANEL_MODE_REGCOMPLETE;
        }
        if(this.props.location && this.props.location.search && this.props.location.search!==""){
            let parameters = getJsonFromLocation(this.props.location);
            this.regkey = parameters["reg_key"];
            console.log(this.regkey);
        }
        this.setName("ResponsiveContainer");
    }

    handleOpenRegister(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_REGISTER })
        return true;
    }
    handleCloseRegister(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_INFO })
        return true;
    }
    handleOpenLogin(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_LOGIN })
        return true;
    }
    handleCloseLogin(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_INFO })
        return true;
    }

    handleShowInfo(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_INFO })
        return true;
    }

    handleInvalidJwt(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_LOGIN })
        return true;
    }

    handleLoginSuccess(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_LOGGED })
        return true;
    }


    componentDidMount() {
        super.componentDidMount();
        this.isLogged();
    }

    async isLogged(){
        try {
            let ret = await  isLogged();
            if(ret){
                this.setLogged(true);
                this.handleLoginSuccess();
            }
        }
        catch(ex){
            if(ex instanceof JWTTokenInvalid){
                this.handleInvalidJwt();
            }
            if(ex instanceof JWTTokenDoesNotExists){
                this.handleShowInfo();
            }
        }
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
                                      state = {this.state}
                                      regkey = {this.regkey}
                                      {...this.getHandlersCopy()}
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

export class DesktopContainer extends BaseComponent {

    constructor(props) {
        super(props);

        this.createMainPanel = this.createMainPanel.bind(this);
        this.onLogged = this.props.handlers
        this.mobile = this.props.mobile;
        this.setName("DesktopContainer");
    }

    /*
    onMenuEvent(data){
        if(data == MENU_EVENT.REGISTER){
            this.dispatchEvent(EVNAME_CLOSE_REGISTER,null,data);
        }
        if(data == MENU_EVENT.LOGIN){
            this.dispatchEvent(EVNAME_OPEN_LOGIN,null,data);
        }
        return false;
    }

    onCloseMainPanel(){
        this.dispatchEvent(EVNAME_SHOW_INFO,null,null);
        return false;
    } */

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
                <Login mobile={mobile} link={this}  {...this.getHandlersCopy()} ></Login>
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

        if(this.getLogged()){
            style = { minHeight: 80, padding: '0em 0em' };
            styleMenu = { paddingTop: '1em' };
            panel= <div id="logged_panel" style={{paddingBottom: '2em', minHeight: '300px',backgroundColor: "white"}}>
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

        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_LOGGED)
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
                        <ShopsMenu link={this} {...this.getHandlersCopy()} ></ShopsMenu>
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
