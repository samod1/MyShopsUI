import React, { Component } from 'react'
import {Container, Button, Header, Icon} from 'semantic-ui-react'
import './Pageheader.css';
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";

export default class  Pageheader extends Component {

  constructor(props) {
    super(props);
  }

  render(){

    const mobile = this.props.mobile;
    return (
        <Container text>
          <Header
              as='h1'
              inverted
              style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
              }}
          >
            <FormattedMessage id="pageheader.title"
                              defaultMessage="MyShops"
                              description="MyShops application"/>
          </Header>
          <Header
              as='h2'
              inverted
              style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
              }}>
            {mobile?
                <FormattedMessage id="pageheader.shortdescription_mobile"
                                  defaultMessage="Organize e-shops, passwords and registration data"
                                  description="MyShops application description"/>
                :
                <FormattedMessage id="pageheader.shortdescription"
                                  defaultMessage="Your central point to organize e-shops, e-shops passwords and registration data."
                                  description="MyShops application"/>
            }

          </Header>
          <Button primary size='huge'>
              <FormattedMessage id="pageheader.start"
                                defaultMessage="Get Started"
                                description="MyShops application description"/>
            <Icon name='right arrow' />
          </Button>
        </Container>);
  }
}

Pageheader.propTypes = {
  mobile: PropTypes.bool,
}
