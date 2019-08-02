import React from 'react';
import ToastContext from './ToastContext';

const withToastContext = Component => {
	const WithToastContext = props => (
		<ToastContext.Consumer>
			{ctx => <Component toastContext={ctx} {...props} />}
		</ToastContext.Consumer>
	);

	const displayName = Component.displayName || Component.name || 'Component';
	WithToastContext.displayName = `withToastContext(${displayName})`;

	return WithToastContext;
};

export default withToastContext;
