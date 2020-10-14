import React,{Component} from "react";
import {Form,Input,Label,Button, Header,Container,Message} from "semantic-ui-react";
import {FormattedMessage,injectIntl} from "react-intl";
import "./Registerform.css"
import {validateEmail, getLocalizedString, MessageLocalization} from "../../../Tools/Tools";
import '../../../css/MyShops.css'
import {postData, getData, ServerError} from "../../../Tools/servercall";
import Config from "../../../Tools/Config"

const SHOPS_CODE_REG_EMAILEXISTS = 100001;
const SHOPS_CODE_REG_EMAILINVALID = 100002;
const SHOPS_CODE_REG_EMAILPREVATTEMPT = 100003;

export class Registerform extends Component{

       constructor(props) {
           super(props);
           this.state = {
               useremailError : false,
               srvErr: false,
           };

           this.useremail = "";
           this.errdescid = "";
           this.srvDescId = "";
           this.srvMsg = "";
           this.retData = null;

           this.setUsername = this.setUsername.bind(this);
           this.submitRegForm = this.submitRegForm.bind(this);
           this.message_detail = this.message_detail.bind(this);
           this.hideErrMessage = this.hideErrMessage.bind(this);
           this.hideOKMessage = this.hideOKMessage.bind(this);
           this.sendRegistration = this.sendRegistration.bind(this);
           this.submitRegFormAgain = this.submitRegFormAgain.bind(this);
           this.hideAgainButton = this.hideAgainButton.bind(this);
           this.gotoMainPage = this.gotoMainPage.bind(this);

           this.ct = new Config();

       }


    sendRegistration (usermail,override){

        postData(this.ct.api_url_registration + '/create',{email: usermail,override: override} )
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
                } else {
                    console.log(error);
                    this.srvDescId = null;
                    this.srvMsg = error.message;
                    this.retData = null;
                    this.setState({srvErr: true});
                }
            });
    }

    submitRegForm(ev,data) {
            let error = false;

            this.state.srvErr = false;
            this.state.useremailError = false;
            this.errdescid = "";

            if (this.useremail === '') {
                this.setState({useremailError: true})
                this.errdescid = 'registerform.email.empty';
                error = true
            } else if(!validateEmail(this.useremail)){
                this.setState({useremailError: true})
                this.errdescid = "registerform.email.invalid";
                error = true
            }else {
                this.setState({useremailError: false})
                error = false
            }

            if(error)
                return;

            let usermail = this.useremail;
            this.sendRegistration(usermail,false);
        }

    submitRegFormAgain(ev,data) {
        let usermail = this.useremail;
        this.sendRegistration(usermail,true);
    }


    gotoMainPage(ev,data){
        this.props.onClose();
    }

    setUsername(ev,data){
        this.useremail = ev.target.value;
    }

    componentDidMount() {
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
        if(this.state.srvErr)
            return false;
        return true;
    }
    hideOKMessage(){
        if(this.retData && this.retData.status === 200 && !this.state.srvErr)
            return false;
        return true;
    }

    hideAgainButton(){
        if(this.retData && this.retData.status === 400) {
            if( Number(this.retData.shops_code) === SHOPS_CODE_REG_EMAILPREVATTEMPT)
                return false;
        }
        return true;
    }


   render(){
       const { intl } = this.props;
       return(
           <Form>
               <div className="page-login" style={{minHeight: '700px'}}>
                   <div className="ui centered grid container">
                       <div className="nine wide column">
                           <Header className="centered padded" style={{padding: '1.5em ', borderBottom: '1px'}} as="h3">
                               <FormattedMessage id="registerform.title"
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
                                                           onChange={this.setUsername}
                                                           error={this.state.useremailError}
                                                           readOnly={!this.hideOKMessage() || !this.hideAgainButton()}
                                                           />
                                               {this.state.useremailError && <Label pointing prompt>
                                                   {getLocalizedString(this.errdescid,intl)}
                                               </Label>}
                                           </Form.Field>
                                       </div>
                                       <div  style={{padding: '1em 0em 0em 0em'}} hidden={!this.hideOKMessage() || !this.hideAgainButton()}>
                                           <Button className="ui primary labeled icon button" type="submit"
                                                   onClick={this.submitRegForm}
                                           >
                                               <i className="signup alternate icon"></i>
                                               <FormattedMessage id="registerform.crtbut"
                                                                 defaultMessage="ENTER ME TO MESSAGES"
                                                                 description="Create new account"/>
                                           </Button>
                                           <span style={{paddingLeft: '0.5em'}}>
                                               <Button className="ui labeled icon button" type="submit"
                                                       onClick={this.gotoMainPage}
                                               >
                                                   <i className="cancel alternate icon"></i>
                                                   <FormattedMessage id="registerform.cancelbut"
                                                                     defaultMessage="ENTER ME TO MESSAGES"
                                                                     description="Create new account - cancel"/>
                                               </Button>
                                           </span>
                                       </div>
                                       <div  style={{padding: '1em 0em 0em 0em'}} hidden={this.hideAgainButton()}>
                                           <Button className="ui primary labeled icon button" type="submit"
                                                   onClick={this.submitRegFormAgain}
                                           >
                                               <i className="circle notched alternate icon"></i>
                                               <FormattedMessage id="registerform.crtbutagain"
                                                                 defaultMessage="ENTER ME TO MESSAGES"
                                                                 description=""/>
                                           </Button>
                                           <span style={{paddingLeft: '0.5em'}}>
                                               <Button className="ui labeled icon button" type="submit"
                                                       onClick={this.gotoMainPage}
                                               >
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

export default injectIntl(Registerform);