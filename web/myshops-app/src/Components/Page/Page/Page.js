
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React,{Component}   from 'react';
import Footer from "../Footer/Footer";
import Body from "../Body/Body";
import {ShopsMenu,MENU_EVENT} from '../PageMenu/PageMenu'
import {Container, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import Registerform from "../Registerform/Registerform";
import CompleteRegistration from "../Registerform/CompleteRegistration";
import ShopsMainInfoBar from "../Header/ShopsMainInfoBar";
import * as Tools  from "../../../Tools/Tools";
import Login from "../Login/Login";
import {BaseComponent} from "../../BaseComponent";
import {JWTTokenInvalid,JWTTokenDoesNotExists} from "../../../Tools/MyShopsExceptions";
import {UserSettings} from "../User/UserSettings";
import "../../../css/MyShops.css"
import "./Page.css"

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  },
})


const MAIN_PANEL_MODE_INFO          = 0x01
const MAIN_PANEL_MODE_REGISTER      = 0x02
const MAIN_PANEL_MODE_LOGIN         = 0x03
const MAIN_PANEL_MODE_REGCOMPLETE   = 0x04
const MAIN_PANEL_MODE_LOGGED        = 0x05
const MAIN_PANEL_MODE_USER_SETTINGS = 0x06

export const MAIN_PANEL_PATH_MAIN          = "/"
export const MAIN_PANEL_PATH_REGISTER      = "/register"

export const EVNAME_CLOSE_REGISTER = "CloseRegister";
export const EVNAME_CLOSE_LOGIN = "CloseLogin";
export const EVNAME_OPEN_REGISTER = "OpenRegister";
export const EVNAME_OPEN_LOGIN = "OpenLogin";
export const EVNAME_SHOW_INFO = "ShowInfo";
export const EVNAME_INVALIDJWT = "InvalidJwt";
export const EVNAME_LOGINSUCCESS = "LoginSuccess";
export const EVNAME_LOGOUT = "Logout";
export const EVNAME_USER_SETTINGS = "UserSettings";

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
        this.handleLogout = this.handleLogout.bind(this);
        this.handleUserSettings = this.handleUserSettings.bind(this);

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
        this.updateHandlersCopy(EVNAME_LOGOUT,this.handleLogout);
        this.updateHandlersCopy(EVNAME_USER_SETTINGS,this.handleUserSettings);

        if(this.props.path && this.props.path==MAIN_PANEL_PATH_REGISTER){
            this.state.mainPanel_mode = MAIN_PANEL_MODE_REGCOMPLETE;
        }
        if(this.props.location && this.props.location.search && this.props.location.search!==""){
            let parameters = Tools.getJsonFromLocation(this.props.location);
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
    handleLogout(){
        Tools.deleteJwt();
        this.setLogged(false);
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_INFO })
        return true;
    }
    handleUserSettings(){
        this.setState({mainPanel_mode: MAIN_PANEL_MODE_USER_SETTINGS })
    }


    componentDidMount() {
        if (! this.regkey)
            this.isLogged();
    }

    async isLogged(){
        try {
            let ret = await  Tools.isLogged();
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
        if(this.props.path && this.props.path==MAIN_PANEL_PATH_REGISTER){
            body=<div></div>
        }
        switch(this.state.mainPanel_mode){

            case MAIN_PANEL_MODE_REGISTER:
            case MAIN_PANEL_MODE_REGCOMPLETE:
            case MAIN_PANEL_MODE_LOGIN:
            case MAIN_PANEL_MODE_USER_SETTINGS:
                body=<div></div>;
                break;
            case MAIN_PANEL_MODE_INFO:
                body=<Body mobile={this.props.mobile}></Body>;
                break;

            default:
                body=<div></div>;

        }

        return (

/*            <DesktopContainer  state = {this.state}
                               regkey = {this.regkey}
                               mode = "desktop"
                               {...this.getHandlersCopy()}
            >
                {this.props.children}
            </DesktopContainer>
*/

            <MediaContextProvider>
                <Media at="mobile">
                    <DesktopContainer  state = {this.state}
                                      regkey = {this.regkey}
                                      mode = "mobile"
                                      {...this.getHandlersCopy()}
                    >
                        {this.props.children}
                    </DesktopContainer>
                    {body}
                    <Footer mobile={this.props.mobile}></Footer>
                </Media>
                <Media  greaterThanOrEqual="desktop">
                    <DesktopContainer  state = {this.state}
                                      regkey = {this.regkey}
                                      mode = "desktop"
                                      {...this.getHandlersCopy()}
                    >
                        {this.props.children}
                    </DesktopContainer>
                    {body}
                    <Footer mobile={this.props.mobile}></Footer>
                </Media>
                <Media at="tablet">
                    <DesktopContainer  state = {this.state}
                                      regkey = {this.regkey}
                                      mode = "tablet"
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
        this.createMainPanelGrid = this.createMainPanelGrid.bind(this);
        this.setName("DesktopContainer");
        this.createMenu = this.createMenu.bind(this);
    }


    createMenu(){

        let menuPanel=<div id="topMenu" style={{backgroundColor: "rgba(0,0,0,0.5)",paddingTop: "5px"}}>
                <ShopsMenu link={this} {...this.getHandlersCopy()} ></ShopsMenu>
            </div>
        return menuPanel;
    }

    createMainPanel(state){
        let panel="";
        let style = { minHeight: 550, padding: '1em 0em' };
        let styleMenu = {paddingTop: '1em' };

        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_REGISTER){
            style = { minHeight: 80, padding: '0em 0em' };
            styleMenu = { paddingTop: '1em' };
            panel=<div style={{paddingBottom: '2em', minHeight: '300px',backgroundColor: "white"}}>
                <Registerform link={this}  {...this.getHandlersCopy()}></Registerform>
            </div>
        };

        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_LOGIN){
            style = { minHeight: 80, padding: '0em 0em' };
            styleMenu = { paddingTop: '1em' };
            panel=<div style={{paddingBottom: '2em', minHeight: '300px',backgroundColor: "white"}}>
                <Login link={this}  {...this.getHandlersCopy()} ></Login>
            </div>
        };

        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_INFO){
            style = { minHeight: 550, padding: '0em 0em' };
            styleMenu = { paddingTop: '1em' };
            panel=<>
                <ShopsMainInfoBar></ShopsMainInfoBar>
            </>

        }
        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_REGCOMPLETE){
            style = { minHeight: 80, padding: '0em 0em' };
            styleMenu = { paddingTop: '1em' };
            panel=<div style={{paddingBottom: '2em', minHeight: '300px',backgroundColor: "white"}}>
                <CompleteRegistration link={this}  {...this.getHandlersCopy()} regkey={this.props.regkey}>
                </CompleteRegistration>
            </div>
        };



        if(this.getLogged()){

            if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_USER_SETTINGS){
                style = { minHeight: 80, padding: '0em 0em' };
                styleMenu = { paddingTop: '1em' };
                panel=<div id="UserSettings" className="full" >
                    <UserSettings link={this}  {...this.getHandlersCopy()} ></UserSettings>
                </div>
            } else {
                style = { minHeight: 80, padding: '0em 0em' };
                styleMenu = { paddingTop: '1em' };
                panel= <div id="logged_panel" style={{paddingBottom: '2em', minHeight: '500px',backgroundColor: "white"}}>
                </div>
            }

        };

        return {panel: panel,style: style,styleMenu: styleMenu};
    }
    createMainPanelGrid(state){

        let panel = null;
        let mainPanel = this.createMainPanel(this.props.state);
        let fixed = false;

        if(this.props.state.mainPanel_mode == MAIN_PANEL_MODE_INFO){
            panel = <div className="grid-container dc_grid-one_column mainPanel" style={{padding: "0px"}}>
                <Segment id="PageHeaderSegment" style={{
                    backgroundColor: "black",
                    padding: '0em',
                    margin: "0em",
                    borderStyle: 'none',
                    boxShadow: 'none',
                    borderRadius: '0px'
                }}>
                    {mainPanel.panel}
                </Segment>
            </div>
        }else{
            if(this.isDesktop()) {
                panel = <div className="grid-container dc_grid-three_column mainPanel"  style={{padding: "14px"}}>
                    <div></div>
                    <Segment id="PageHeaderSegment" style={{
                        backgroundColor: "black",
                        padding: '0em 0em 0em 0em',
                        borderStyle: 'none',
                        boxShadow: 'none'
                    }}>
                        {mainPanel.panel}
                    </Segment>
                    <div></div>
                </div>
            }
            if(this.isTablet()){
                panel = <div className="grid-container dc_grid-three_column_tablet mainPanel"  style={{padding: "0px"}}>
                    <div></div>
                    <Segment id="PageHeaderSegment" style={{
                        backgroundColor: "black",
                        padding: '0em 0em 0em 0em',
                        borderStyle: 'none',
                        boxShadow: 'none'
                    }}>
                        {mainPanel.panel}
                    </Segment>
                    <div></div>
                </div>
            }
        }

        /* panel = <div className="grid-container dc_grid-three_column mainPanel"> */


        return panel;
    }

    render() {
        const { children } = this.props
        const { fixed } = false

        let mainPanelGrid = this.createMainPanelGrid(this.props.state);

        let titleStyle = null;

        switch(this.props.state.mainPanel_mode){

            case MAIN_PANEL_MODE_INFO:
                titleStyle={minHeight: '500px',backgroundColor: 'black'};
                break;
            case MAIN_PANEL_MODE_REGISTER:
            case MAIN_PANEL_MODE_LOGIN:
            case MAIN_PANEL_MODE_LOGGED:
                titleStyle={minHeight: '80px',backgroundColor: 'black',paddingBottom:"0px"};
                break;

        }
        titleStyle = null;
        return (
            <div id="desktopContainer">
                <Segment id="segment"
                    inverted
                    textAlign='center'
                    style={titleStyle}
                    vertical>
                    {this.createMenu()}
                </Segment>
                {mainPanelGrid}

                {children}
            </div>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

