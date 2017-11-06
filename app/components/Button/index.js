/**
*
* Button
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

class Button extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
          <div>
            <button className={styles.Button}>
              <FormattedMessage {...messages.header} />
            </button>
          </div>
        );
    }
}

Button.propTypes = {

};

export default Button;
