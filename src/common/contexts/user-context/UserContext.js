import React from 'react';

const UserContext = React.createContext({
	users: [],
	getUsers: () => {}
});

export default UserContext;
