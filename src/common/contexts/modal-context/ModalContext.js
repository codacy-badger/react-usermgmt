import React from 'react';

const ModalContext = React.createContext({
	isModalOpen: false,
	openModal: () => {},
	closeModal: () => {},
	content: {
		title: '',
		message: '',
		action: null
	}
});

export default ModalContext;
