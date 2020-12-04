import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Segment } from 'semantic-ui-react'
import {
    Container,
    Grid,
    Header,
    List,
} from 'semantic-ui-react'
import {FormattedMessage} from "react-intl";

export default class  Footer extends Component {

    constructor(props) {
        super(props);
    }

    render(){

        const mobile = this.props.mobile;
        return (
            <Segment inverted vertical style={{ padding: '5em 0em 2em 0em' }}>
                <Container>
                    <Grid divided inverted >
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About' />
                                <List link inverted>
                                    <List.Item as='a'>Sitemap</List.Item>
                                    <List.Item as='a'>Contact Us</List.Item>
                                    <List.Item as='a'>Religious Ceremonies</List.Item>
                                    <List.Item as='a'>Gazebo Plans</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Services' />
                                <List link inverted>
                                    <List.Item as='a'>Banana Pre-Order</List.Item>
                                    <List.Item as='a'>DNA FAQ</List.Item>
                                    <List.Item as='a'>How To Access</List.Item>
                                    <List.Item as='a'>Favorite X-Men</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    Footer Header
                                </Header>
                                <p>
                                    Extra space for a call to action inside the footer that could help re-engage users.
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <span>
                                    <FormattedMessage id="footer.copy"
                                                      defaultMessage="Copyright "
                                                      description="MyShops application"/>
                                </span>
                                <a href="http://www.dominanz.sk">
                                    <FormattedMessage id="footer.link"
                                                      defaultMessage=" Dominanz.sk"
                                                      description="MyShops application"/>
                                </a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>);


    }
}

Footer.propTypes = {
    mobile: PropTypes.bool,
}
