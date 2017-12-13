const AppDispatcher = require('../dispatcher/AppDispatcher.js');
const EventEmitter = require('events').EventEmitter;

const AppStore = Object.assign({}, EventEmitter.prototype, {
	emitChange: function() { this.emit('change'); },
	error: null,
	numUsers: 0,
	userList: []
});

AppDispatcher.register(payload => {
	switch (payload.actionName) {
		case 'grab-users':
			const { error:e, userList:l } = payload;
			AppStore.userList = l;
			AppStore.numUsers = l.length;
			AppStore.error = e;
			AppStore.emitChange(); // @TODO: DON'T THINK WE'RE LISTENING FOR CHANGE CORRECTLY TO UPDATE ALL THE THINGS...
			break;
	}
});

module.exports = AppStore;