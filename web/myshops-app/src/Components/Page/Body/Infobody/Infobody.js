import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Segment } from 'semantic-ui-react'
import {
    Button,
    Grid,
    Header,
    Image,
} from 'semantic-ui-react'
import {FormattedMessage} from "react-intl";

export default class  Infobody extends Component {

    constructor(props) {
        super(props);
    }

    render(){

        const mobile = this.props.mobile;
        return (

            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                <FormattedMessage
                                    id="infobody.title1"
                                    description=""
                                    defaultMessage="We help you to organize your e-shops"/>
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                <FormattedMessage
                                    id="infobody.text1"
                                    description=""
                                    defaultMessage=""/>
                            </p>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                <FormattedMessage
                                    id="infobody.title2"
                                    description=""
                                    defaultMessage=""/>
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                <FormattedMessage
                                    id="infobody.text2"
                                    description=""
                                    defaultMessage=""/>
                            </p>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                <FormattedMessage
                                    id="infobody.title3"
                                    description=""
                                    defaultMessage=""/>
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                <FormattedMessage
                                    id="infobody.text3"
                                    description=""
                                    defaultMessage=""/>
                            </p>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6}>
                            <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        )
    }
}

Infobody.propTypes = {
    mobile: PropTypes.bool,
}
