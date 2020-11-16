import React, {Component} from 'react'
import { Icon } from 'semantic-ui-react'
import "./LinkButton.css"
import "../../css/MyShops.css"

export class LinkButton extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }


    onClick(ev,data){
        this.props.onClick();
    }

    render() {
        const iconname = this.props.iconname;
        const button_size = this.props.button_size;
        const text = this.props.text;

        const iconClass = iconname + " lb_linkButtonIcon"
        let buttonClass = "lb_linkButton";
        let buttonStyle = {}
        if(this.props.hidden){
            buttonStyle.display = "none";
        }

        return (
            <span className={buttonClass} onClick={this.onClick} style={buttonStyle} >
                <Icon  name={iconname}  className={iconClass} style={{fontSize: "0.7em"}} />
                <label className="lb_linkButtonLabel">{text}</label>
            </span>

        )};

}



