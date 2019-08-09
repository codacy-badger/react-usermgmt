import React from 'react';

const ModalContext = React.createContext({
	openModal: () => {},
	closeModal: () => {},
	isModalOpen: false,
	content: {
		title: '',
		message: '',
		action: null
	}
});

export default ModalContext;
