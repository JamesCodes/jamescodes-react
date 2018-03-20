/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import LOADER_ACTIONS_SHAPE from 'proptypes/loaderActions';
import { Grid, Row, Col } from 'components/Helper.FlexboxGrid';
import Spacer from 'components/Atom.Spacer';
import messages from './messages';

export default class HomePage extends React.PureComponent {
    static propTypes = {
        loaderActions: LOADER_ACTIONS_SHAPE.isRequired,
    };

    componentDidMount() {
        const { loaderActions } = this.props;
        loaderActions.hide();
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs>
                        <Spacer py={1}>
                            <h1><FormattedMessage {...messages.header} /></h1>
                        </Spacer>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
