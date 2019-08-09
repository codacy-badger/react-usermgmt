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
			variant: 'info',
			message: ''
		};
	}

	openToast = (variant, message) => {
		if (!variant || !message) {
			throw new Error('Toast arguments "variant" and "message" are both required.');
		}
		this.setState({ isToastOpen: true, variant, message });
	};

	closeToast = () => {
		this.setState({ isToastOpen: false });
	};

	render() {
		const { isToastOpen, message, variant } = this.state;
		const { children } = this.props;

		return (
			<ToastContext.Provider
				value={{
					openToast: this.openToast,
					closeToast: this.closeToast,
					isToastOpen,
					message,
					variant
				}}
			>
				{children}
			</ToastContext.Provider>
		);
	}
}

export default ToastProvider;
