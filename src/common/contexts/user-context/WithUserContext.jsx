import React from 'react';
import UserContext from './UserContext';

const withUserContext = Component => {
	const WithUserContext = props => (
		<UserContext.Consumer>
			{ctx => <Component userContext={ctx} {...props} />}
		</UserContext.Consumer>
	);

	const displayName = Component.displayName || Component.name || 'Component';
	WithUserContext.displayName = `withUserContext(${displayName})`;

	return WithUserContext;
};

export default withUserContext;
