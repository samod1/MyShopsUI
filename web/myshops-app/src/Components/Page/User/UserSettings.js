import React from "react";
import {BaseComponent} from "../../BaseComponent";
import {
    Container, Grid, SidebarPusher, SidebarPushable, GridColumn, Header, Segment,
    Icon, Sidebar, GridRow, Form, Label, Button, Message
} from "semantic-ui-react";
import {FormattedMessage,FormattedDate, injectIntl } from "react-intl";
import "./User.css"
import "../../../css/MyShops.css"
import {getLocalizedDate, getLocalizedString, MessageLocalization} from "../../../Tools/Tools";
import {LinkButton} from "../../Button/LinkButton"
import {Menu,MenuItem,MenuIconItem} from "../../Menu/Menu";
import {Divider} from "../../Divider/Divider";
import {getJson, postData,getData, ServerError} from "../../../Tools/servercall";
import {Language} from "../../../Tools/Languages";

export class UserSettingsIntl extends BaseComponent {

    constructor(props) {
        super(props);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.isSidebar = this.isSidebar.bind(this);

        this.state = {activeItem: 'user'}
    }

    isSidebar(){
        if(this.isTablet())
            return true;
        else
            return false;
    }

    onMenuClick(ev, data){
        if(data === 'user'){
            this.setState({activeItem: 'user'});
        }
        if(data === 'security'){
            this.setState({activeItem: 'security'});
        }
        if(data === 'others'){
            this.setState({activeItem: 'others'});
        }
        if(data === 'actlog'){
            this.setState({activeItem: 'actlog'});
        }
    }


    getMenu(){
        let menu = null;
        const { activeItem } = this.state;
        menu=<Menu link={this} {...this.getHandlersCopy()}
                   vertical="true"
                   titleID="usersettings.tittle"
        >
            <MenuItem link={this} {...this.getHandlersCopy()}
                      textID="usersettings.tittle.user"
                      name="user"
                      active={activeItem === "user"}
                      onClick={this.onMenuClick}
                      icon="user outline"
            />
            <MenuItem link={this} {...this.getHandlersCopy()}
                      textID="usersettings.tittle.security"
                      name="security"
                      active={activeItem === "security"}
                      onClick={this.onMenuClick}
                      icon="key"
            />
            <MenuItem link={this} {...this.getHandlersCopy()}
                      textID="usersettings.tittle.others"
                      name="others"
                      active={activeItem === "others"}
                      onClick={this.onMenuClick}
                      icon="language"
            />
            <MenuItem link={this} {...this.getHandlersCopy()}
                      textID="usersettings.tittle.actlog"
                      name="actlog"
                      active={activeItem === "actlog"}
                      onClick={this.onMenuClick}
                      icon="file text outline"

            />
        </Menu>
        return menu;
    }



    render() {

        const {intl} = this.props;
        const { activeItem } = this.state;

        let us_container_class;
        if(this.isDesktop()){
            us_container_class="grid-container us_grid-two_column grid-one_row height"
        }
        if(this.isTablet()){
            us_container_class="grid-container us_grid-two_column grid-one_row height noSidePadding"
        }

        let editPane;
        if(activeItem === 'user'){
           editPane =<User link={this} {...this.getHandlersCopy()}></User>
        } else if(activeItem === 'security'){
            editPane = <Security link={this} {...this.getHandlersCopy()}></Security>
        } else if(activeItem === 'others'){
            editPane =<Others link={this} {...this.getHandlersCopy()}></Others>
        } else if(activeItem === 'actlog'){
            editPane =<Actlog link={this} {...this.getHandlersCopy()}></Actlog>
        }

        return (
            <div id="us_container" className={us_container_class}>
                <div id='us_menucolumn'>
                    {this.getMenu()}
                </div>
                <div id='us_contentcolumn' className='grid-item'>
                    {editPane}
                </div>
            </div>
        )

    }
}


class UserIntl extends BaseComponent{

    constructor(props) {
        super(props);
        this.onClickAlias = this.onClickAlias.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.hideErrMessage = this.hideErrMessage.bind(this);
        this.message_detail = this.message_detail.bind(this);
        this.aliasCancel = this.aliasCancel.bind(this);
        this.aliasSave = this.aliasSave.bind(this);
        this.userdata={};
        this.retData = {};
        this.state = {
            srvErr: false
        };
        this.changeAlias=false;

    }

    onClickAlias(){
        console.log("onClickAlias");
        this.setState({chgAlias: true})
    }

    getUserData(){
        getData(this.config.api_url + '/users/' + this.getUserName().username )
            .then(retData => {
                console.log("get /users/"  + this.getUserName().username)
                console.log(retData);

                getJson(retData.rspObject)
                    .then(jsdata => {
                        console.log(jsdata);
                        this.userdata = jsdata;
                        this.setState({srvErr: false});
                    })
            })
            .catch(error => {
                if(error instanceof ServerError){
                    console.log(error.data);
                    this.srvDescId = error.data.shops_code;
                    this.retData = error.data;
                    this.setState({srvErr: true});
                } else {
                    console.log(error);
                    this.srvDescId = null;
                    this.srvMsg = error.message
                    this.setState({srvErr: true});
                }
            });
    }


    componentDidMount() {
        super.componentDidMount();

        if(this.getLogged())
            this.getUserData();
    }

    hideErrMessage(){
        if(this.state.srvErr)
            return false;
        return true;
    }

    message_detail(intl){
        let msg = new MessageLocalization();
        msg.msgPrefix = "usersettings.srv_";
        msg.localError.errdescid = this.errdescid;
        if(this.state.srvErr)
            msg.server.srvErr = this.state.srvErr;
        if(this.retData) {
            if (this.retData.status)
                msg.server.status = this.retData.status;
            if (this.retData.statusText)
                msg.server.statusText = this.retData.statusText;
        }
        if(this.srvDescId)
            msg.server.srvDescId = this.srvDescId;
        if(this.srvMsg)
            msg.server.srvMsg = this.srvMsg;

        let localizedMessage = msg.message_detail(intl)
        return localizedMessage;
    }


    aliasSave(ev,data){
        console.log("onClickAliasSave");
        this.setState({chgAlias: false})
    }

    aliasCancel(ev,data){
        console.log("onClickAliasCancel");
        this.setState({chgAlias: false})
    }


    render(){

        let msg = new MessageLocalization();
        const {intl} = this.props;

        let us_editPane = "us_editPane";
        if(this.isTablet())
            us_editPane = "us_editPane_tablet";

        let horline= <Divider color={"rgba(0,0,0,0.15"} sidegap={"5px"}/>

        let alias=null;
        if(!this.userdata.alias){
            alias = getLocalizedString("usersettings.user.notAlias",intl);
        }else{
            alias = this.userdata.alias;
        }

        let regDate=null;
        if(!this.userdata.regdate){
            regDate= getLocalizedDate(Date.now(),intl);
        }else{
            regDate= getLocalizedDate(this.userdata.regdate,intl);
        }

        let cancelMsg=null;
        let cancelButton="";
        if(this.userdata.active){
            cancelMsg = getLocalizedString("usersettings.user.deleteUser",intl);
            let butlabel = getLocalizedString("delete",intl);
            cancelButton=<LinkButton iconname='user delete' text={butlabel} onClick={this.onClickAlias}/>
        }else{
            cancelMsg = getLocalizedString("usersettings.user.cancelDeleteUser",intl);
            let butlabel = getLocalizedString("delete",intl);
            cancelButton=<LinkButton iconname='stop circle outline' text={butlabel} onClick={this.onClickAlias}/>
        }


        let chgAliasStyle= {};
        if(this.state.chgAlias){
            chgAliasStyle.display = "flex";

        }else{
            chgAliasStyle.display = "none";
        }



        return(
            <div id={"us_editPane"} className={us_editPane}>

                <Message negative hidden={this.hideErrMessage()}>
                    <Message.Header>
                        <FormattedMessage id="loginform.srvErrorTitle"
                                          defaultMessage= "ENTER ME TO MESSAGES"/>
                    </Message.Header>
                    <p>
                        {this.message_detail(intl) }
                    </p>
                </Message>

                <Header>
                    <FormattedMessage id="usersettings.tittle.user"/>
                </Header>
                <Divider color={"black"} height={"3px"}/>
                <div style={{height: "1em"}} />
                <div className="flexcolumn" style={{paddingLeft: "0.5em",paddingRight: "0.5em"}}>
                    {/*  email */}
                    <div className="grid-container us_grid-three_column  ">
                        <label className="us_fldName">
                            <FormattedMessage id="usersettings.user.email"/>
                        </label>
                        <label  className="us_fldVal">
                            {this.userdata.username}
                        </label>
                        <div></div>
                    </div>
                    {horline}
                    {/*  alias */}
                    <div className="grid-container us_grid-three_column  ">
                        <label className="us_fldName">
                            <FormattedMessage id="usersettings.user.alias"/>
                        </label>
                        <label  className="us_fldVal">
                            {alias}
                        </label>
                        <LinkButton iconname='edit' text='Upravit'  hidden={this.state.chgAlias} onClick={this.onClickAlias}>
                        </LinkButton>
                    </div>
                    <div className={"us_chgAlias"} style={chgAliasStyle}>
                        <label className="flexcolumn" style={{paddingTop: "0.5em"}}>
                            <FormattedMessage id="usersettings.user.alias1"/>
                        </label>
                        <Form.Field  style={{paddingTop: "0.5em"}}>
                            <Form.Input type=""
                                        name="alias"
                                        placeholder={intl.formatMessage(
                                            {id: "usersettings.user.alias",
                                                defaultMessage: "ENTER ME TO MESSAGES"})}
                                        onChange={this.setUsername}
                                        error={this.uname_err}

                            />
                            {this.uname_err && <Label pointing prompt>
                                {getLocalizedString(this.errdescid,intl)}
                            </Label>}
                        </Form.Field>
                        <div style={{display:"flex", flexDirection: "row", paddingTop: "1.5em" }}>
                            <div style={{paddingRight: "1em"}}>
                                <Button className="ui primary labeled icon button" type="submit"
                                        onClick={this.aliasSave}
                                        style={{paddingRight: "0.5em" }}
                                >
                                    <i className="save alternate icon"></i>
                                    <FormattedMessage id="save"
                                                      defaultMessage="ENTER ME TO MESSAGES"
                                                      description="Cancel"/>
                                </Button>
                            </div>
                            <div>
                                <Button className="ui labeled icon button" type="submit"
                                        onClick={this.aliasCancel}
                                >
                                    <i className="cancel alternate icon"></i>
                                    <FormattedMessage id="cancelbut"
                                                      defaultMessage="ENTER ME TO MESSAGES"
                                                      description="Cancel"/>
                                </Button>
                            </div>
                        </div>

                    </div>
                    {horline}
                    {/*  dat reg */}
                    <div className="grid-container us_grid-three_column  ">
                        <label className="us_fldName">
                            <FormattedMessage id="usersettings.user.regdate"/>
                        </label>
                        <label  className="us_fldVal">
                            {regDate}
                        </label>
                        <div></div>
                    </div>
                    {horline}
                    {/*  deaktivacia */}
                    <div className="grid-container us_grid-three_column  ">
                        <label className="us_fldName">
                            {cancelMsg}
                        </label>
                        <label  className="us_fldVal">
                        </label>
                        {cancelButton}
                    </div>
                    {horline}
                    {/*  lang */}
                    <div className="grid-container us_grid-three_column  ">
                        <label className="us_fldName">
                            <FormattedMessage id="usersettings.user.langlabel"/>
                        </label>
                        <Language></Language>
                        <LinkButton iconname='edit' text='Upravit' onClick={this.onClickAlias}>
                        </LinkButton>
                    </div>
                    {horline}
                </div>
            </div>
        );
    }

}

class SecurityIntl extends BaseComponent{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <Header>
                    <FormattedMessage id="usersettings.tittle.security"/>
                </Header>
            </div>
        );
    }

}

class OthersIntl extends BaseComponent{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <Header>
                    <FormattedMessage id="usersettings.tittle.others"/>
                </Header>
            </div>
        );
    }

}

class ActlogIntl extends BaseComponent{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <Header>
                    <FormattedMessage id="usersettings.tittle.actlog"/>
                </Header>
            </div>
        );
    }

}



export  const UserSettings =  injectIntl(UserSettingsIntl);
export  const User =  injectIntl(UserIntl);
export  const Security =  injectIntl(SecurityIntl);
export  const Others =  injectIntl(OthersIntl);
export  const Actlog =  injectIntl(ActlogIntl);

