import PropTypes from 'prop-types';

export default PropTypes.shape({
	isModalOpen: PropTypes.bool.isRequired,
	openModal: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	content: PropTypes.shape({
		title: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired
	}).isRequired,
	action: PropTypes.func
});
