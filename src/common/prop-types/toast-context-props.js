import PropTypes from 'prop-types';

export default PropTypes.shape({
	isToastOpen: PropTypes.bool.isRequired,
	message: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
	openToast: PropTypes.func.isRequired,
	closeToast: PropTypes.func.isRequired
});
