import React from 'react';
import PropTypes from 'prop-types';
import createProps from '../createProps';
import getClass from '../classNames';

const propTypes = {
    fluid: PropTypes.bool,
    className: PropTypes.string,
    tagName: PropTypes.string,
    children: PropTypes.node, // eslint-disable-line react/no-unused-prop-types
    nested: PropTypes.bool,
};

export default function Grid(props) {
    const {
        fluid, nested, className, tagName,
    } = props;
    const containerClass = getClass(fluid ? 'container-fluid' : 'container');
    const nestedClass = getClass(nested ? 'container-nested' : '');
    const classNames = [className, containerClass, nestedClass];

    return React.createElement(
        tagName || 'div',
        createProps(propTypes, props, classNames)
    );
}

Grid.propTypes = propTypes;
