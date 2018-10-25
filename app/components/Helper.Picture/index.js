/**
 *
 * Picture
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import PICTURE_PROPTYPE from 'proptypes/picture';
import { Picture } from 'react-responsive-picture';
import getBreakpoints from 'utils/getBreakpoints';
const breakpoints = getBreakpoints;

class HelperPicture extends React.PureComponent {
    static propTypes = {
        src: PICTURE_PROPTYPE.isRequired,
        onLoad: PropTypes.func,
        className: PropTypes.string,
    };

    getSources() {
        const { src } = this.props;
        const imageBreakpoints = breakpoints.filter(
            (breakpoint) => typeof src[breakpoint.id] !== 'undefined'
        );
        const sources = imageBreakpoints.map((breakpoint) => ({
            srcSet: this.requireImage(src[breakpoint.id]), // eslint-disable-line global-require
            media: `(max-width: ${breakpoint.width}px)`,
        }));
        sources.push({
            srcSet: this.requireImage(src.default),
        });
        return sources;
    }

    requireImage(imagePath) {
        if (typeof imagePath === 'object') {
            const sources = [];
            Object.keys(imagePath).forEach((id) => {
                const image = require(`images/${imagePath[id]}`); // eslint-disable-line global-require
                sources.push(`${image} ${id}`);
            });
            return sources.join(', ');
        } if (typeof imagePath === 'string') {
            return `${require(`images/${imagePath}`)} 1x`; // eslint-disable-line global-require
        }
        return null;
    }

    render() {
        const { src, onLoad, className } = this.props;
        const sources = this.getSources();
        return (
            <Picture
                alt={src.alt}
                sources={sources}
                className={className}
                onLoad={onLoad}
            />
        );
    }
}

export default HelperPicture;
