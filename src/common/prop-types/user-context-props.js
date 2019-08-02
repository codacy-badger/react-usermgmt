import PropTypes from 'prop-types';
import userProps from './user-props';

export default PropTypes.shape({
	users: PropTypes.arrayOf(userProps).isRequired,
	getUsers: PropTypes.func.isRequired
});
