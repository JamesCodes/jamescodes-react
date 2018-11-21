/**
 *
 * Helper Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import breakpoints from 'utils/getBreakpoints';

import SiteHeader from 'components/Molecule.Site.Header';
import SiteFooter from 'components/Molecule.Site.Footer';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import content from 'content/generic.json';
import makeSelectHelperPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.scss';

const withHelperPage = (WrappedComponent) => {
    class HelperPage extends React.PureComponent {
        static propTypes = {
            loaderProps: PropTypes.shape({
                initialLoad: PropTypes.bool.isRequired,
            }).isRequired,
        };

        constructor(props) {
            super(props);
            this.sizes = breakpoints;
            this.mounted = false;
            this.state = { breakpoint: this.detectbreakpoint(true) };
            this.detectbreakpoint = this.detectbreakpoint.bind(this);
        }

        componentDidMount() {
            window.addEventListener('resize', this.detectbreakpoint);
            this.detectbreakpoint();
            this.mounted = true;
            window.scrollTo(0, 0);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.detectbreakpoint);
            this.mounted = false;
        }

        detectbreakpoint(returnProps) {
            const width = window.innerWidth;
            const { sizes, mounted } = this;
            const nextbreakpoint = sizes.findIndex(
                (size) => size.width > width
            );
            const breakpoint = nextbreakpoint > -1
                ? sizes[nextbreakpoint - 1]
                : sizes[sizes.length - 1];
            if (returnProps === true) return breakpoint;
            if (mounted) this.setState({ breakpoint });
            return null;
        }

        render() {
            const {
                loaderProps: { initialLoad },
            } = this.props;
            const { breakpoint } = this.state;
            return (
                <div className={`${styles.Page}`}>
                    {!initialLoad && (
                        <React.Fragment>
                            <SiteHeader />
                            <WrappedComponent
                                {...this.props}
                                breakpoint={breakpoint}
                            />
                            <SiteFooter {...content.footer} />
                        </React.Fragment>
                    )}
                </div>
            );
        }
    }

    const mapStateToProps = createStructuredSelector({
        helperPageProps: makeSelectHelperPage(),
    });

    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }

    const withConnect = connect(
        mapStateToProps,
        mapDispatchToProps
    );

    const withReducer = injectReducer({ key: 'HelperPage', reducer });
    const withSaga = injectSaga({ key: 'HelperPage', saga });

    return compose(
        withReducer,
        withSaga,
        withConnect
    )(HelperPage);
};

export default withHelperPage;
