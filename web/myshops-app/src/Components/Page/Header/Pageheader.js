import React, { Component } from 'react'
import { Input, Label, Container, Button, Grid, GridColumn, GridRow, Header  } from 'semantic-ui-react'
import Iconbutton from '../../Button/Iconbutton'
import Headeroptions from '../../Page/Headeroptions/Headeroptions'
import './Pageheader.css';

export default class Pageheader extends Component {

  render() {
    return (
        <Grid verticalAlign="middle" className="pageheader">
          <GridRow >
            <GridColumn className="one wide" textAlign="left">
              <Iconbutton iconname="bars" button_size="large"></Iconbutton>
            </GridColumn>
            <GridColumn className="thirteen wide" textAlign="center">
              <div className="pageheader_title">MyShops</div>
            </GridColumn>
            <GridColumn className="two wide" textAlign="right">
              <Headeroptions></Headeroptions>
            </GridColumn>
          </GridRow>
        </Grid>
    )
  }
}
