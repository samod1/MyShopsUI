import React, {Component} from 'react'
import { Icon } from 'semantic-ui-react'
import "./LinkButton.css"

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

        return (
            <span className="lb_linkButton" onClick={this.onClick} >
                <Icon  name={iconname}  className={iconClass} style={{fontSize: "0.7em"}} />
                <label className="lb_linkButtonLabel">{text}</label>
            </span>

        )};

}



