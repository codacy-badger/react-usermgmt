import React from 'react';
import PropTypes from 'prop-types';
import ModalContext from './ModalContext';

class ModalProvider extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired
	};

	constructor() {
		super();

		this.state = {
			isModalOpen: false,
			modalContent: {
				title: '',
				message: '',
				action: null
			}
		};
	}

	openModal = (title, message, action) => {
		if (!title || !message) {
			throw new Error('Modal arguments "title" and "message" are both required.');
		}
		this.setState({
			isModalOpen: true,
			modalContent: { title, message, action }
		});
	};

	closeModal = () => {
		this.setState({ isModalOpen: false });
	};

	render() {
		return (
			<ModalContext.Provider
				value={{
					isModalOpen: this.state.isModalOpen,
					openModal: this.openModal,
					closeModal: this.closeModal,
					content: this.state.modalContent
				}}
			>
				{this.props.children}
			</ModalContext.Provider>
		);
	}
}

export default ModalProvider;
