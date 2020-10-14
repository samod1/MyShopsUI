import {Component} from "react";
import {Form, Checkbox, Button, FormField, FormButton, Segment,Header} from "semantic-ui-react";
import React from "react";
import Config from "../../Tools/Config";

export default class ConfigPanel extends Component {


    constructor(props) {
        super(props);
        this.ct = new Config();
        this.save = this.save.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    save(){
        this.ct.saveConfiguration();
    }

    onChange(ev,data){

            switch(ev.target.id){

                case "api_server":
                    this.ct.api_server = ev.target.value;
                    break;
                case "api_url_registration":
                    this.ct.api_url_registration =  ev.target.value;
                    break;

                case "api_url":
                    this.ct.api_url =  ev.target.value;
                    break;

                default:
                    break;
            }

    }


    render(){

        return(
                <Form style={{textAlign: "left", padding: "3em",width: "50em"}}>
                    <Header as={"h2"} style={{paddingBottom: "3em"}}>MyShop development environment settings</Header>

                    <Form.Field >
                        <label >Environment</label>
                        <input placeholder="Development" value={this.ct.environmentName}
                               readOnly={true}
                        />
                    </Form.Field>
                    <Form.Field >
                        <label >Development mode</label>
                        <input placeholder="true" value={this.ct.developmentMode}
                               readOnly={true}
                        />
                    </Form.Field>

                    <Form.Field >
                        <label >API Server</label>
                        <input placeholder={this.ct.api_server}
                               id="api_server"
                               onChange={this.onChange}
                               defaultValue={this.ct.api_server}
                               type="text"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>API Base URL</label>
                        <input placeholder={this.ct.api_url}
                               id="api_url"
                               onChange={this.onChange}
                               defaultValue={this.ct.api_url}
                               type="text"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>API Registration URL</label>
                        <input placeholder={this.ct.api_url_registration}
                               id="api_url_registration"
                               onChange={this.onChange}
                               defaultValue={this.ct.api_url_registration}
                               type="text"
                        />
                    </Form.Field>
                    <Button primary type='submit' onClick={this.save}>Save</Button>
                </Form>
        );
    }

}