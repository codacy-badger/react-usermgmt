const AppDispatcher = require('../dispatcher/AppDispatcher.js');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const AppStore = assign({}, EventEmitter.prototype, {
	emitChange: function() { this.emit('change'); },
	error: null,
	numUsers: 0,
	userList: []
});

AppDispatcher.register(function(payload) {
	switch (payload.actionName) {
		case 'grab-users':
			const { error:e, userList:l } = payload;
			AppStore.userList = l;
			AppStore.numUsers = l.length;
			AppStore.error = e;
			AppStore.emitChange();
			break;
	}
});

module.exports = AppStore;