const AppDispatcher = require('../dispatcher/AppDispatcher.js');
const axios = require('axios');

const getUserData = () => {
	return axios.get('/data/userData.json'); // @TODO: CREATE AN API IN EXPRESS FOR THIS
};

const dispatchEvent = (list, err) => {
	AppDispatcher.dispatch({
		actionName: 'grab-users',
		error: err,
		numUsers: list.length,
		userList: list
	});
};

const UserMgmtAction = {
	grabUsers: (success, failure) => {
		return getUserData()
			.then(resp => { dispatchEvent(resp.data.users); success(); })
			.catch(err => { dispatchEvent([], err); failure(); });
	}
};

module.exports = UserMgmtAction;