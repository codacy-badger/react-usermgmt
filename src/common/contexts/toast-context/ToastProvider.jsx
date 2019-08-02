import React from 'react';
import PropTypes from 'prop-types';
import ToastContext from './ToastContext';

class ToastProvider extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired
	};

	constructor() {
		super();

		this.state = {
			isToastOpen: false,
			toastVariant: 'info',
			toastMessage: ''
		};
	}

	openToast = (toastVariant, toastMessage) => {
		if (!toastVariant || !toastMessage) {
			throw new Error('Toast arguments "variant" and "message" are both required.');
		}
		this.setState({ isToastOpen: true, toastVariant, toastMessage });
	};

	closeToast = () => {
		this.setState({ isToastOpen: false });
	};

	render() {
		return (
			<ToastContext.Provider
				value={{
					isToastOpen: this.state.isToastOpen,
					openToast: this.openToast,
					closeToast: this.closeToast,
					message: this.state.toastMessage,
					variant: this.state.toastVariant
				}}
			>
				{this.props.children}
			</ToastContext.Provider>
		);
	}
}

export default ToastProvider;
