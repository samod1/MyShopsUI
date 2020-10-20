import React, {Component, useContext, useState} from "react";
import {Form,Input,Label,Button, Header,Container,Message} from "semantic-ui-react";
import {FormattedMessage,injectIntl} from "react-intl";
import {decodeJWT, getLocalizedString, MessageLocalization, validateEmail} from "../../../Tools/Tools";
import '../../../css/MyShops.css'
import {postData, getData, ServerError, InternalServerError} from "../../../Tools/servercall";
import Config, {AuthorizationHeaderName} from "../../../Tools/Config"
import Passwordfield from "../../Passwordfield/Passwordfield";
import {setCookie,getCookie,getLocalStorageItem,setLocalStorageItem} from "../../../Tools/Tools";
import {MyShopsException} from "../../../Tools/MyShopsExceptions"
import {AppContext, useAppContext,SET_LOGGEDUSER} from "../../../Tools/AppContext";



export function LoginSwitch(props) {

    const [state, setState] = useState({processed:false});
    const [ctx, dispatch] = useContext(AppContext);

    const setLoggedUser = (username) => {
        dispatch({
            type: SET_LOGGEDUSER,
            payload: username
        });
    };

    if( props.username && props.username !== '' && !state.processed) {
        setLoggedUser(props.username);
        setState({processed: true});
    }
    return (<div id="LoginSwitch"/> );
}

export class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            logindataError : false,
            srvErr: false,
        };

        this.username = null;
        this.password = "";
        this.errdescid = "";
        this.srvDescId = "";
        this.srvMsg = "";
        this.retData = null;
        this.uname_err = false;
        this.pass_err = false;

        this.setUsername = this.setUsername.bind(this);
        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.message_detail = this.message_detail.bind(this);
        this.hideErrMessage = this.hideErrMessage.bind(this);
        this.hideOKMessage = this.hideOKMessage.bind(this);
        this.sendLogin = this.sendLogin.bind(this);
        this.gotoMainPage = this.gotoMainPage.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onSuccessLogin = this.onSuccessLogin.bind(this);

        this.ct = new Config();

    }


    sendLogin (username,password){

        postData(this.ct.api_url + '/auth/login',{username: username,password: password} )
            .then(retData => {
                console.log(retData);
                this.srvDescId = "loginform.OK";
                this.retData = retData;
                this.setState({srvErr: false});
                this.onSuccessLogin(username,retData);
            })
            .catch(error => {
                if((error instanceof MyShopsException) || (error instanceof ServerError)){
                    console.log(error.data);
                    this.srvDescId = error.data.shops_code;
                    this.retData = error.data;
                    this.setState({srvErr: true});
                }else {
                    console.log(error);
                    this.srvDescId = null;
                    this.srvMsg = error.message;
                    this.retData = error.data;
                    this.setState({srvErr: true});
                }
            });
    }

    submitLoginForm(ev,data) {
        let error = false;

        this.state.srvErr = false;
        this.state.logindataError = false;
        this.errdescid = "";
        this.uname_err = false;
        this.pass_err = false;

        if (this.username === '') {
            this.setState({logindataError: true})
            this.errdescid = 'loginform.logindata.empty';
            this.uname_err = true;
            error = true
        }else if( this.password === '' )  {
            this.setState({logindataError: true})
            this.errdescid = 'loginform.logindata.empty';
            error = true
            this.pass_err = true;
        } else if(!validateEmail(this.username)){
            this.setState({logindataError: true})
            this.errdescid = "loginform.logindata.unameinvalid";
            error = true
        }else {
            this.setState({logindataError: false})
            error = false
        }

        if(error)
            return;

        this.sendLogin(this.username,this.password);
    }


    onSuccessLogin(username,retData){

        // save cookies
        // session
        retData.rspObject.headers.forEach((val, key) => {
            console.log(key, val);
            if (key.toUpperCase() == AuthorizationHeaderName.toUpperCase()) {
                setLocalStorageItem(AuthorizationHeaderName, val);
                decodeJWT(val);
            }
        });
        //window.location.href = "/"
    }

    gotoMainPage(ev,data){
        this.props.onClose();
    }

    setUsername(ev,data){
        this.username = ev.target.value;
    }

    setPassword(pswd){
        this.password = pswd;
    }

    componentDidMount() {
    }

    message_detail(intl){
        let msg = new MessageLocalization();
        msg.msgPrefix = "loginform.srv_";
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

    hideErrMessage(){
        if(this.state.srvErr)
            return false;
        return true;
    }
    hideOKMessage(){
        if(this.retData && this.retData.status === 200 && !this.state.srvErr)
            return false;
        return true;
    }

    render(){
        const { intl } = this.props;
        console.trace();

        return(
            <Form>
                <div className="page-login" style={{minHeight: '700px'}}>
                    <div className="ui centered grid container">
                        <div className="nine wide column">
                            <Header className="centered padded" style={{padding: '1.5em ', borderBottom: '1px'}} as="h3">
                                <FormattedMessage id="loginform.title"
                                                  defaultMessage= "ENTER ME TO MESSAGES"/>
                            </Header>
                            <Message negative hidden={this.hideErrMessage()}>
                                <Message.Header>
                                    <FormattedMessage id="loginform.srvErrorTitle"
                                                      defaultMessage= "ENTER ME TO MESSAGES"/>
                                </Message.Header>
                                <p>
                                    {this.message_detail(intl) }
                                </p>
                            </Message>

                            <Message positive hidden={this.hideOKMessage()}>
                                <Message.Header>
                                    <FormattedMessage id="loginform.srvOKTitle"
                                                      defaultMessage= "ENTER ME TO MESSAGES"/>
                                </Message.Header>
                                <p>
                                    {this.message_detail(intl) }
                                </p>
                            </Message>


                            <div className="ui fluid card">
                                <div className="content">
                                    <form className="ui form" method="POST">
                                        <div className="field">
                                            <label>
                                                <FormattedMessage id="loginform.email"
                                                                  defaultMessage="Username/e-mail"
                                                                  description="Username/e-mail"/>
                                            </label>
                                            <Form.Field>
                                                <Form.Input type="email"
                                                            name="user"
                                                            placeholder={intl.formatMessage(
                                                                {id: "loginform.email.placeholder",
                                                                    defaultMessage: "ENTER ME TO MESSAGES"})}
                                                            onChange={this.setUsername}
                                                            error={this.uname_err}
                                                            readOnly={!this.hideOKMessage()}
                                                />
                                                {this.uname_err && <Label pointing prompt>
                                                    {getLocalizedString(this.errdescid,intl)}
                                                </Label>}
                                            </Form.Field>

                                            <div className="field" hidden={!this.hideOKMessage()}>
                                                <label>
                                                    <FormattedMessage id="loginform.password"
                                                                      defaultMessage="Password"
                                                                      description="Password"/>
                                                </label>
                                                <Passwordfield name="password"
                                                               checkpassword="false"
                                                               onChange={this.setPassword}
                                                />
                                            </div>


                                        </div>
                                        <div  style={{padding: '1em 0em 0em 0em'}} hidden={!this.hideOKMessage()}>
                                            <Button className="ui primary labeled icon button" type="submit" name="login"
                                                    onClick={this.submitLoginForm}
                                            >
                                                <i className="signup alternate icon"></i>
                                                <FormattedMessage id="loginform.loginbut"
                                                                  defaultMessage="ENTER ME TO MESSAGES"
                                                                  description="Login button"/>
                                            </Button>
                                            <span style={{paddingLeft: '0.5em'}}>
                                               <Button className="ui labeled icon button" type="submit"
                                                       onClick={this.gotoMainPage}
                                               >
                                                   <i className="cancel alternate icon"></i>
                                                   <FormattedMessage id="cancelbut"
                                                                     defaultMessage="ENTER ME TO MESSAGES"
                                                                     description="Cancel"/>
                                               </Button>
                                            </span>
                                        </div>
                                        <div  style={{padding: '1em 0em 0em 0em'}}  hidden={this.hideOKMessage()}>
                                            <Button className="ui secondary labeled icon button" type="submit"
                                                    onClick={this.gotoMainPage}
                                            >
                                                <i className="home alternate icon"></i>
                                                <FormattedMessage id="registerform.exitbut"
                                                                  defaultMessage="ENTER ME TO MESSAGES"
                                                                  description="Create new account"/>
                                            </Button>
                                            <LoginSwitch username={this.username}/>
                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        )
    }

}

export default injectIntl(Login);