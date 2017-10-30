const Dispatcher = require('../dispatcher/AppDispatcher.js');
 
// @TODO: UPDATE THIS STUFF TO STORE USER LIST (update nomenclature too)
const UserMgmtAction = {
	showMessage: function(message) {
		Dispatcher.handleViewAction({
			actionType: 'user-list-update',
			message: message
		});
	}
};
 
module.exports = UserMgmtAction;