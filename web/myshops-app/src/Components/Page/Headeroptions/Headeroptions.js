import React, { Component } from 'react'
import { Input, Label, Container, Button, Grid, GridColumn, GridRow, Header,List, ListItem  } from 'semantic-ui-react'
import Iconbutton from '../../Button/Iconbutton'


export default class Headeroptions extends Component {

  render() {

    return (

        <List horizontal>
          <ListItem>
            <Iconbutton iconname="info" button_size="large"></Iconbutton>
          </ListItem>
          <ListItem>
            <Iconbutton iconname="options" button_size="large"></Iconbutton>
          </ListItem>
          <ListItem>
          <Iconbutton iconname="user" button_size="large"></Iconbutton>
          </ListItem>
        </List>

    )
  }
}
