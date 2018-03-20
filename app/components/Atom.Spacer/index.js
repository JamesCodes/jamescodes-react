/**
 *
 * Spacer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Robox from 'components/Helper.Robox';
import styles from './styles.css';

class Spacer extends React.PureComponent {
    render() {
        const { children, ...rest } = this.props;
        return (
            <div {...rest} className={styles.Spacer}>
                {children}
            </div>
        );
    }
}

Spacer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Robox(Spacer);
