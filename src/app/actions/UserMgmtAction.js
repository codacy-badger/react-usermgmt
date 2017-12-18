const AppDispatcher = require('../dispatcher/AppDispatcher.js');
const axios = require('axios');

const getUserData = () => {
	return axios.get('/api/users');
};

const dispatchEvent = (list, err) => {
	AppDispatcher.dispatch({
		actionName: 'GET_USERS',
		error: err,
		numUsers: list.length,
		userList: list
	});
};

const UserMgmtAction = {
	getUsers: failure => {
		return getUserData()
			.then(resp => dispatchEvent(resp.data.users))
			.catch(err => { dispatchEvent([], err); failure(); });
	}
};

module.exports = UserMgmtAction;