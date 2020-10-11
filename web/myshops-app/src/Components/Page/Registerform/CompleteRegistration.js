import React,{Component} from "react";
import {Form,Input,Label,Button, Header,Container,Message} from "semantic-ui-react";
import {FormattedMessage,injectIntl} from "react-intl";
import "./Registerform.css"
import {validateEmail, getLocalizedString, MessageLocalization} from "../../../Tools/Tools";
import '../../../css/MyShops.css'
import {postData,getJson, getData, apiurl, ServerError, apiurl_registration} from "../../../Tools/servercall";
import Passwordfield from "../../Passwordfield/Passwordfield";


const SHOPS_CODE_REG_EMAILEXISTS = 100001;
const SHOPS_CODE_REG_EMAILINVALID = 100002;
const SHOPS_CODE_REG_EMAILPREVATTEMPT = 100003;

export class CompleteRegistration extends Component{

    constructor(props) {
        super(props);
        this.state = {
            passwordError : false,
            srvErr: false,
        };

        this.setPassword = this.setPassword.bind(this);
        this.setPassword1 = this.setPassword1.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.message_detail = this.message_detail.bind(this);
        this.hideErrMessage = this.hideErrMessage.bind(this);
        this.hideOKMessage = this.hideOKMessage.bind(this);
        this.sendRegistrationCompleti1on = this.sendRegistrationCompletion.bind(this);
        this.gotoMainPage = this.gotoMainPage.bind(this);

        this.password = "";
        this.password1 = "";
        this.errdescid = "";
        this.srvDescId = "";
        this.srvMsg = "";
        this.retData = null;
        this.email = "";
        this.registrationdata = null;

    }


    sendRegistrationCompletion (password){

        postData(apiurl + '/users/registration/confirm',{password: password,registration_key: this.props.regkey} )
            .then(retData => {
                console.log(retData);
                this.srvDescId = "registerform.OK";
                this.retData = retData;
                this.setState({srvErr: false});
            })
            .catch(error => {
                if(error instanceof ServerError){
                    console.log(error.data);
                    this.srvDescId = error.data.shops_code;
                    this.retData = error.data;
                    this.setState({srvErr: true});
                }else {
                    console.log(error);
                    this.srvDescId = null;
                    this.srvMsg = error.message
                    this.setState({srvErr: true});
                }
            });
    }

    submitForm(ev,data) {
        ev.preventDefault();
        ev.stopPropagation();

        this.state.srvErr = false;
        this.state.passwordError = false;

        let error = false;
        this.errdescid = "";
        if(this.password.length < 6){
            error = true;
            this.setState({passwordError: true})
            this.errdescid = "registerform.password.invalid.length";
        } else if(this.password !== this.password1){
            error = true;
            this.setState({passwordError: true})
            this.errdescid = "registerform.password.invalid.noteq";
        }
        if(error){
            this.setState({passwordError: true})
            return;
        }
        if(!error){
            this.setState({passwordError: false})
        }
        this.errdescid = "";
        this.sendRegistrationCompletion(this.password);
    }

    gotoMainPage(ev,data){
        this.props.onClose();
    }

    setPassword(data){
        this.password = data;
    }
    setPassword1(data){
        this.password1 = data;
    }


    message_detail(intl){

        let msg = new MessageLocalization();
        msg.msgPrefix = "registerform.srv_";
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
        if(this.state.passwordError || this.state.srvErr)
            return false;
        return true;
    }

    hideOKMessage(){
        if(this.retData && this.retData.status === 200 && !this.state.srvErr)
            return false;
        return true;
    }


    getRegistrationData(){

        postData(apiurl_registration + '/getbykey',{registration_key: this.props.regkey} )
            .then(retData => {
                console.log("getRegistrationData=")
                console.log(retData);

                getJson(retData.rspObject)
                    .then(jsdata => {
                        console.log(jsdata);
                        this.registrationdata = jsdata;
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
        // Load username by key
        this.getRegistrationData();

    }


    render(){
        const { intl } = this.props;
        return(
            <Form>
                <div className="page-login" style={{minHeight: '700px'}}>
                    <div className="ui centered grid container">
                        <div className="nine wide column">
                            <Header className="centered padded" style={{padding: '1.5em ', borderBottom: '1px'}} as="h3">
                                <FormattedMessage id="registerform.completeregtitle"
                                                  defaultMessage= "ENTER ME TO MESSAGES"/>
                            </Header>

                            <Message negative hidden={this.hideErrMessage()}>
                                <Message.Header>
                                    <FormattedMessage id="registerform.srvErrorTitle"
                                                      defaultMessage= "ENTER ME TO MESSAGES"/>
                                </Message.Header>
                                <p>
                                    {this.message_detail(intl) }
                                </p>
                            </Message>

                            <Message positive hidden={this.hideOKMessage()}>
                                <Message.Header>
                                    <FormattedMessage id="registerform.srvOKTitle"
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
                                                <FormattedMessage id="registerform.email"
                                                                  defaultMessage="Username/e-mail"
                                                                  description="Username/e-mail"/>
                                            </label>
                                            <Form.Field>
                                                <Form.Input type="email"
                                                            name="user"
                                                            placeholder={intl.formatMessage(
                                                                {id: "registerform.email.placeholder",
                                                                    defaultMessage: "ENTER ME TO MESSAGES"})}
                                                            readOnly={true}
                                                            value={this.registrationdata ? this.registrationdata.email: ""}
                                                />
                                                {this.state.useremailError && <Label pointing prompt>
                                                    {getLocalizedString(this.state.errdescid,intl)}
                                                </Label>}
                                            </Form.Field>
                                        </div>
                                        <div className="field">
                                            <label>
                                                <FormattedMessage id="registerform.password"
                                                                  defaultMessage="password"
                                                                  description="Username/e-mail"/>
                                            </label>
                                            <Passwordfield name="password"
                                                           checkpassword="true"
                                                           onChange={this.setPassword}
                                            />
                                        </div>
                                        <div className="field">
                                            <label>
                                                <FormattedMessage id="registerform.password1"
                                                                  defaultMessage="Username/e-mail"
                                                                  description="Username/e-mail"/>
                                            </label>
                                            <Passwordfield name="password_retry"
                                                           checkpassword="false"
                                                           onChange={this.setPassword1}
                                            />
                                        </div>
                                        <div  style={{padding: '1em 0em 0em 0em'}} >
                                            <Button className="ui primary labeled icon button" type="submit"
                                                    onClick={this.submitForm}>
                                                <i className="checkmark alternate icon"></i>
                                                <FormattedMessage id="registerform.save"
                                                                  defaultMessage="ENTER ME TO MESSAGES"
                                                                  description="Create new account"/>
                                            </Button>
                                            <span style={{paddingLeft: '0.5em'}}>
                                               <Button className="ui labeled icon button" type="submit"
                                                       onClick={this.gotoMainPage}>
                                                   <i className="cancel alternate icon"></i>
                                                   <FormattedMessage id="registerform.cancelbut"
                                                                     defaultMessage="ENTER ME TO MESSAGES"
                                                                     description="Create new account - cancel"/>
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

export default injectIntl(CompleteRegistration);