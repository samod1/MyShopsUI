import React, {Component} from 'react'
import { Button, Icon } from 'semantic-ui-react'



export default class Iconbutton extends Component {
    
  
    render() {
      const iconname = this.props.iconname;
      const button_size = this.props.button_size;
      return (
        <Button color="black" icon size={button_size}>
          <Icon name={iconname}/>
        </Button>
    ) }
  }
  


