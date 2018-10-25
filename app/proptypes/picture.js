import PropTypes from 'prop-types';
const sizeTypes = [
    PropTypes.string,
    PropTypes.shape({
        '1x': PropTypes.string,
        '2x': PropTypes.string,
    }),
];
export default PropTypes.shape({
    default: PropTypes.oneOfType(sizeTypes).isRequired,
    alt: PropTypes.string.isRequired,
    sm: PropTypes.oneOfType(sizeTypes),
    md: PropTypes.oneOfType(sizeTypes),
    lg: PropTypes.oneOfType(sizeTypes),
    xl: PropTypes.oneOfType(sizeTypes),
});
