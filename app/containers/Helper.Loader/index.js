/**
 *
 * HelperLightbox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TransitionGroup } from 'react-transition-group';
import LOADER_ACTIONS_SHAPE from 'proptypes/loaderActions';
import TransitionFade from 'components/Helper.Transitions/Transition.Fade';
import { compose } from 'redux';
import classNames from 'classnames';

import Spacer from 'components/Atom.Spacer';
import injectReducer from 'utils/injectReducer';
import makeSelectHelperLoader from './selectors';
import reducer from './reducer';
import { showLoader, hideLoader, initialLoadComplete } from './actions';
import styles from './styles.css';


const withLoader = (WrappedComponent) => {
    class HelperLoader extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = { showMessage: false };
            this.showMessageTimeout = null;
        }

        componentDidMount() {
            const { loaded, loaderProps: { initialLoad } } = this.props;
            if (initialLoad) loaded();
            this.entered();
        }

        componentWillUnmount() {
            clearTimeout(this.showMessageTimeout);
        }

        entered() {
            clearTimeout(this.showMessageTimeout);
            this.showMessageTimeout = setTimeout(() => this.showMessage(), 500);
        }

        exited() {
            clearTimeout(this.showMessageTimeout);
        }

        showMessage() {
            this.setState({ showMessage: true });
        }

        render() {
            const { showMessage } = this.state;
            const {
                loaderProps: { message, loading },
                loaderActions,
            } = this.props;

            return (
                <div
                    className={classNames({
                        [styles.Open]: loading,
                    })}
                >
                    <TransitionGroup className="loader">
                        {loading && (
                            <TransitionFade
                                onEntered={() => this.entered()}
                                onExited={() => this.exited()}
                            >
                                <div className={styles.Loader}>
                                    <div
                                        className={classNames(
                                            styles.LoaderWrapper,
                                            {
                                                [styles.LoaderWrapperVisible]: showMessage,
                                            }
                                        )}
                                    >
                                        <Spacer>
                                            <div className={styles.Text}>
                                                {message}
                                            </div>
                                        </Spacer>
                                    </div>
                                </div>
                            </TransitionFade>
                        )}
                    </TransitionGroup>
                    <WrappedComponent
                        {...this.props}
                        loaderActions={loaderActions}
                    />
                </div>
            );
        }
    }

    HelperLoader.propTypes = {
        loaded: PropTypes.func.isRequired,
        loaderProps: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            message: PropTypes.string.isRequired,
            initialLoad: PropTypes.bool.isRequired,
        }).isRequired,
        loaderActions: LOADER_ACTIONS_SHAPE.isRequired,
    };

    const mapStateToProps = createStructuredSelector({
        loaderProps: makeSelectHelperLoader(),
    });

    function mapDispatchToProps(dispatch) {
        return {
            loaded: () => dispatch(initialLoadComplete()),
            loaderActions: {
                show: (message) => dispatch(showLoader(message)),
                hide: () => dispatch(hideLoader()),
            },
        };
    }

    const withConnect = connect(mapStateToProps, mapDispatchToProps);

    const withReducer = injectReducer({ key: 'HelperLoader', reducer });

    return compose(withReducer, withConnect)(HelperLoader);
};

export default withLoader;
