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

import injectReducer from 'utils/injectReducer';
import LoaderContext from './context';
import makeSelectHelperLoader from './selectors';
import reducer from './reducer';
import { showLoader, hideLoader, initialLoadComplete } from './actions';
import styles from './styles.scss';

const withLoader = (WrappedComponent) => {
    class HelperLoader extends React.PureComponent {
        static propTypes = {
            loaded: PropTypes.func.isRequired,
            loaderProps: PropTypes.shape({
                loading: PropTypes.bool.isRequired,
                message: PropTypes.string.isRequired,
                initialLoad: PropTypes.bool.isRequired,
            }).isRequired,
            loaderActions: LOADER_ACTIONS_SHAPE.isRequired,
        };

        constructor(props) {
            super(props);
            this.state = {
                showMessage: false,
                loaderActions: props.loaderActions,
            };
            this.showMessageTimeout = null;
        }

        componentDidMount() {
            const {
                loaded,
                loaderProps: { initialLoad },
            } = this.props;
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
            } = this.props;

            const { loaderActions } = this.state;

            return (
                <LoaderContext.Provider
                    value={{
                        loaderActions,
                    }}
                >
                    <div
                        className={classNames({
                            [styles.Open]: loading,
                        })}
                    >
                        <TransitionGroup>
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
                                            <div className={styles.Text}>
                                                {message}
                                            </div>
                                        </div>
                                    </div>
                                </TransitionFade>
                            )}
                        </TransitionGroup>
                        <WrappedComponent {...this.props} />
                    </div>
                </LoaderContext.Provider>
            );
        }
    }

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

    const withConnect = connect(
        mapStateToProps,
        mapDispatchToProps
    );

    const withReducer = injectReducer({ key: 'HelperLoader', reducer });

    return compose(
        withReducer,
        withConnect
    )(HelperLoader);
};

export default withLoader;
