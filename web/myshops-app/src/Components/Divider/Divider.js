import React from "react";
import {BaseComponent} from "../BaseComponent";



export class Divider extends BaseComponent {


    constructor(props) {
        super(props);
    }



    render(){

        let bgcolor = this.props.color;
        let height = "1px";
        let width = "100%";
        if(this.props.height)
            height = this.props.height;
        let sidegap=null;

        if(this.props.vertical){
            width = "1px";
            height = "100%";
        }
        let style = {
            backgroundColor: bgcolor,
            height: height,
            width: width
        }

        if(this.props.sidegap) {
            sidegap=this.props.sidegap;
            delete style.width;
            style.marginLeft = sidegap;
            style.marginRight = sidegap;
        }

        return(
            <div style={style}></div>
        )
    }

}
