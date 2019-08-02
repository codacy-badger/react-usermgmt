import PropTypes from 'prop-types';

export default PropTypes.shape({
	address: PropTypes.string.isRequired,
	firstName: PropTypes.string.isRequired,
	gender: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
});
