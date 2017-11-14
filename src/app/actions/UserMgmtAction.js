const AppDispatcher = require('../dispatcher/AppDispatcher.js');
const axios = require('axios');
const path = require('../common/path.js')();

const getUserData = () => {
	return axios.get(`${path}data/userData.json`);
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
		return getUserData().then(resp => { dispatchEvent(resp.data.users); success(); }).catch(err => { dispatchEvent([], err); failure(); });
	}
};

module.exports = UserMgmtAction;