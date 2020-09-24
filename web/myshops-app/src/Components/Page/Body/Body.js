import React, { Component } from 'react'
import PropTypes from "prop-types";
import Infobody from "./Infobody/Infobody";

export default class  Body extends Component {

    constructor(props) {
        super(props);
    }

    render(){

        const mobile = this.props.mobile;
        return (
            <Infobody></Infobody>

        )
    }
}

Body.propTypes = {
    mobile: PropTypes.bool,
}
