import React from 'react';
import ModalContext from './ModalContext';

const withModalContext = Component => {
	const WithModalContext = props => (
		<ModalContext.Consumer>
			{ctx => <Component modalContext={ctx} {...props} />}
		</ModalContext.Consumer>
	);

	const displayName = Component.displayName || Component.name || 'Component';
	WithModalContext.displayName = `withModalContext(${displayName})`;

	return WithModalContext;
};

export default withModalContext;
