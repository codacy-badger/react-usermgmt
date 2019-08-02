import PropTypes from 'prop-types';

export default PropTypes.shape({
	name: PropTypes.string.isRequired,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
});
