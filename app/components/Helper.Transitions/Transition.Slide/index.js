import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styleSettings from 'styles/settings'; // eslint-disable-line import/extensions
import styles from './styles.css';
const transitionSpeed = parseInt(styleSettings['transition-speed'], 10);

const TransitionFade = ({ children, ...props }) => (
    <CSSTransition
        {...props}
        timeout={transitionSpeed * 4}
        classNames={{
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
