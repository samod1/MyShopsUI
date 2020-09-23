import React, { Component } from 'react'
import { Input, Label, Container, Button, Grid, GridColumn, GridRow, Header  } from 'semantic-ui-react'
import Iconbutton from '../../Button/Iconbutton'


export default class Headeroptions extends Component {

  render() {

    return (
        <Grid verticalAlign="middle">
          <GridRow columns="3">
            <GridColumn textAlign="center">
            <Iconbutton iconname="info" button_size="large"></Iconbutton>
            </GridColumn>
            <GridColumn textAlign="right">
            <Iconbutton iconname="options" button_size="large"></Iconbutton>
            </GridColumn>
            <GridColumn textAlign="middle">
              <Iconbutton iconname="user" button_size="large"></Iconbutton>
            </GridColumn>
          </GridRow>
        </Grid>
    )
  }
}
