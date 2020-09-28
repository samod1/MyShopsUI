import React,{Component} from "react";
import {Form,Input,Label,Button, Header,Container} from "semantic-ui-react";
import {FormattedMessage,injectIntl} from "react-intl";
import "./Registerform.css"
import {validateEmail} from "../../../Tools/Tools";
import '../../../css/MyShops.css'




export class Registerform extends Component{

       constructor(props) {
           super(props);
           this.state = {
               useremail: "",
               useremailError : false,
               errdescid: ""
           };
        this.setUsername = this.setUsername.bind(this);
        this.submitRegForm = this.submitRegForm.bind(this);
        this.getLocalizedString = this.getLocalizedString.bind(this);


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
        }

        setUsername(ev,data){
            this.setState({useremail: ev.target.value});
        }

        getLocalizedString(msgid,intl){
           let str = null;
           if(msgid !== "")
            str =intl.formatMessage({id: msgid,
                defaultMessage: "ENTER ME TO MESSAGES"});
           return str;
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
                                                       {this.getLocalizedString(this.state.errdescid,intl)}
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