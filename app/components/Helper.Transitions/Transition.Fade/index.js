import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styles from './styles.scss';
const transitionSpeed = parseInt(styles['transition-fast'], 10);

const TransitionFade = ({ children, ...props }) => (
    <CSSTransition
        {...props}
        timeout={transitionSpeed * 4}
        classNames={{
            appear: styles.Appear,
            appearActive: styles.AppearActive,
            enter: styles.Enter,
            enterActive: styles.EnterActive,
            exit: styles.Leave,
            exitActive: styles.LeaveActive,
        }}
    >
        {children}
    </CSSTransition>
);

TransitionFade.propTypes = {
    children: PropTypes.element.isRequired,
};

export default TransitionFade;
