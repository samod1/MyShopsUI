import React,{Component} from "react";
import {Form,Input,Label,Button, Header,Container,Message} from "semantic-ui-react";
import {FormattedMessage,injectIntl} from "react-intl";
import "./Registerform.css"
import {validateEmail,getLocalizedString} from "../../../Tools/Tools";
import '../../../css/MyShops.css'
import {postData,getData,apiurl,ServerError} from "../../../Tools/servercall";


export class Registerform extends Component{

       constructor(props) {
           super(props);
           this.state = {
               useremail: "",
               useremailError : false,
               errdescid: "",
               srvErr: false,
               srvDescId: "",
               srvMsg: "",
               retData: null
           };
        this.setUsername = this.setUsername.bind(this);
        this.submitRegForm = this.submitRegForm.bind(this);
        this.message_detail = this.message_detail.bind(this);
        this.hideErrMessage = this.hideErrMessage.bind(this)
       }


        submitRegForm(ev,data) {
            let error = false;

            if (this.state.useremail === '') {
                this.setState({useremailError: true})
                this.setState({errdescid: 'registerform.email.empty'})
                error = true
            } else if(!validateEmail(this.state.useremail)){
                this.setState({useremailError: true})
                this.setState({errdescid: "registerform.email.invalid"})
                error = true
            }else {
                this.setState({useremailError: false})
                error = false
            }

            if(error)
                return;

            let usermail = this.state.useremail;
            postData(apiurl + '/users/register',{email: usermail,override: false} )
                .then(retData => {
                    console.log(retData);
                    let st = {srvErr: false,srvDescId: retData.shops_code,retData: retData};
                    this.setState(st);
                })
                .catch(error => {
                    if(error instanceof ServerError){
                      let st = {srvErr: true,srvDescId: error.data.shops_code,retData: error.data};
                      this.setState(st);
                    }
                });
        }

        setUsername(ev,data){
            this.setState({useremail: ev.target.value});
        }


        componentDidMount() {
        }


        message_detail(intl){

           let msgid;
           if(this.state.srvErr)
           {
               if(this.state.srvDescId != null && this.state.srvDescId != 0){
                   msgid = "registerform.srv_" + this.state.srvDescId.toString();
                   return getLocalizedString(msgid,intl)
               } else if(this.state.retData && this.state.retData.statusText){
                   msgid = "srv_unknown";
                   let msg = getLocalizedString(msgid,intl);
                   return (msg + ": " + this.state.retData.statusText);
               }
           }
           return null;
        }

        hideErrMessage(){
            if(this.state.srvErr)
                return false;
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
                                                               />
                                                   {this.state.useremailError && <Label pointing prompt>
                                                       {getLocalizedString(this.state.errdescid,intl)}
                                                   </Label>}
                                               </Form.Field>
                                           </div>
                                           <div  style={{padding: '1em 0em 0em 0em'}}>
                                               <Button className="ui primary labeled icon button" type="submit"
                                                       onClick={this.submitRegForm}
                                               >
                                                   <i className="signup alternate icon"></i>
                                                   <FormattedMessage id="registerform.crtbut"
                                                                     defaultMessage="Create new account"
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