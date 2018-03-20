/**
 *
 * HelperPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { debounce } from 'lodash';

import LOADER_ACTIONS_SHAPE from 'proptypes/loaderActions';
import breakpoints from 'utils/getBreakpoints';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHelperPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.css';

const withHelperPage = (WrappedComponent) => {
    class HelperPage extends React.PureComponent {

        constructor(props) {
            super(props);
            this.sizes = breakpoints;
            this.mounted = false;
            this.state = { breakpoint: this.detectbreakpoint(false) };
            this.detectbreakpoint = debounce(
                this.detectbreakpoint.bind(this),
                300
            );
        }

        componentDidMount() {
            window.addEventListener('resize', this.detectbreakpoint);
            this.detectbreakpoint();
            this.mounted = true;
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.detectbreakpoint);
            this.mounted = false;
        }

        detectbreakpoint(update = true) {
            const width = window.innerWidth;
            const { sizes, mounted } = this;
            const nextbreakpoint = sizes.findIndex((size) => size.width > width);
            const breakpoint =
                nextbreakpoint > -1
                    ? sizes[nextbreakpoint - 1]
                    : sizes[sizes.length - 1];
            if (update && mounted) this.setState({ breakpoint });
            return breakpoint;
        }

        render() {
            const {
                loaderActions,
                loaderProps: { initialLoad },
            } = this.props;
            const { breakpoint } = this.state;
            return (
                <div>
                    <div className={`${styles.Page}`}>
                        {!initialLoad && (
                            <div>
                                <WrappedComponent {...this.props} loaderActions={loaderActions} breakpoint={breakpoint} />
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }

    HelperPage.propTypes = {
        loaderActions: LOADER_ACTIONS_SHAPE.isRequired,
        loaderProps: PropTypes.shape({
            initialLoad: PropTypes.bool.isRequired,
        }).isRequired,
    };

    const mapStateToProps = createStructuredSelector({
        helperPageProps: makeSelectHelperPage(),
    });

    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }

    const withConnect = connect(mapStateToProps, mapDispatchToProps);

    const withReducer = injectReducer({ key: 'HelperPage', reducer });
    const withSaga = injectSaga({ key: 'HelperPage', saga });

    return compose(withReducer, withSaga, withConnect)(HelperPage);
};

export default withHelperPage;
