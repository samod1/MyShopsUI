import React, {Component} from "react";
import {Form,Input,Label,Button, Header,Container,Message} from "semantic-ui-react";
import {getLocalizedString} from "../../Tools/Tools";
import {FormattedMessage,injectIntl} from "react-intl";
import {CompleteRegistration} from "../Page/Registerform/CompleteRegistration";
import PasswordStrengthBar from "react-password-strength-bar";



export class Passwordfield extends Component{

    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            type: 'password',
            icon: "eye slash",
            password: ""
        };
        this.onClickEye=this.onClickEye.bind(this);
        this.onChange=this.onChange.bind(this);
    }

    onClickEye(ev, data){
        ev.preventDefault();
        ev.stopPropagation();
        if(this.state.hide){
            let st = {
                hide: false,
                type: 'input',
                icon: "eye",
            }
            this.setState(st)
        } else {
            let st = {
                hide: true,
                type: 'password',
                icon: "eye slash"
            }
            this.setState(st)
        }
    }

    onChange(ev,data){
        ev.preventDefault();
        ev.stopPropagation();
        this.props.onChange(data.value);
        this.setState({password: data.value})
    }


    render(){
        const { intl } = this.props;
        console.log("checkpassword:" + this.props.checkpassword);

        return(
            <Form.Field style={{position: "relative"}}>
                <Button icon={this.state.icon}
                        style={ { position: "absolute",zIndex: "100",top:"1px",right: "0px",backgroundColor:"white" } }
                        onClick={this.onClickEye}
                />
                <Form.Input type={this.state.type}
                            name={this.props.name}
                            placeholder={intl.formatMessage(
                                {id: "password.placeholder",
                                    defaultMessage: "ENTER ME TO MESSAGES"})}
                            onChange={this.onChange}
                            error={this.props.passwordError}
                >
                </Form.Input>
                {  (this.props.checkpassword.toLowerCase() === "true".toLowerCase()) &&
                    <PasswordStrengthBar password={this.state.password}></PasswordStrengthBar> }
                {this.props.useremailError && <Label pointing prompt>
                    {getLocalizedString(this.props.errdescid,intl)}
                    </Label>
                }
            </Form.Field>
        );
    }
}

export default injectIntl(Passwordfield);