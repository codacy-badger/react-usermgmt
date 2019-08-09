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
			content: {
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
			content: { title, message, action }
		});
	};

	closeModal = () => {
		this.setState({ isModalOpen: false });
	};

	render() {
		const { isModalOpen, content } = this.state;
		const { children } = this.props;

		return (
			<ModalContext.Provider
				value={{
					openModal: this.openModal,
					closeModal: this.closeModal,
					isModalOpen,
					content
				}}
			>
				{children}
			</ModalContext.Provider>
		);
	}
}

export default ModalProvider;
