import React,{Component} from "react";
import {Segment,Form,Checkbox,Button} from "semantic-ui-react";


export default class Registerform extends Component{

       constructor(props) {
           super(props);
       }

       state = {
           useremail: "",
       };

       render(){
           return(
               <Segment style={{minHeight: '500px'}}>

                   <Form>
                       <Form.Field>
                           <label>Login Name/E-mail</label>
                           <input placeholder='e-mail' />
                       </Form.Field>
                       <Form.Field>
                           <Checkbox label='I agree to the Terms and Conditions' />
                       </Form.Field>
                       <Button type='submit'>Submit</Button>
                   </Form>
               </Segment>
           )
       }
}