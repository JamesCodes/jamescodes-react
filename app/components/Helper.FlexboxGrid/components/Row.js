import React from 'react';
import PropTypes from 'prop-types';
import getClass from '../classNames';
import createProps from '../createProps';
import { ViewportSizeType } from '../types';

const rowKeys = [
    'start',
    'center',
    'end',
    'top',
    'middle',
    'bottom',
    'around',
    'between',
];

const propTypes = {
    reverse: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    start: ViewportSizeType, // eslint-disable-line react/no-unused-prop-types
    center: ViewportSizeType, // eslint-disable-line react/no-unused-prop-types
    end: ViewportSizeType, // eslint-disable-line react/no-unused-prop-types
    top: ViewportSizeType, // eslint-disable-line react/no-unused-prop-types
    middle: ViewportSizeType, // eslint-disable-line react/no-unused-prop-types
    bottom: ViewportSizeType, // eslint-disable-line react/no-unused-prop-types
    around: ViewportSizeType, // eslint-disable-line react/no-unused-prop-types
    between: ViewportSizeType, // eslint-disable-line react/no-unused-prop-types
    className: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    tagName: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    children: PropTypes.node, // eslint-disable-line react/no-unused-prop-types
};

function getRowClassNames(props) {
    const modificators = [props.className, getClass('row')];

    for (let i = 0; i < rowKeys.length; i += 1) {
        const key = rowKeys[i];
        const value = props[key];
        if (value && value !== 'none') {
            if (value.includes(',')) {
                value
                    .split(',')
                    .forEach((splitValue) => modificators.push(getClass(`${key}-${splitValue}`)));
            } else {
                modificators.push(getClass(`${key}-${value}`));
            }
        }
    }

    if (props.reverse) {
        modificators.push(getClass('reverse'));
    }

    return modificators;
}

export function getRowProps(props) {
    return createProps(propTypes, props, getRowClassNames(props));
}

export default function Row(props) {
    const { tagName } = props;
    return React.createElement(tagName || 'div', getRowProps(props));
}

Row.propTypes = propTypes;
