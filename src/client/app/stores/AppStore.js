const AppDispatcher = require('../dispatcher/AppDispatcher.js');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
 
const AppStore = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit('change');
	}
});
 
AppDispatcher.register(function(payload) {
    // @TODO: DO THE ACTUAL STATE UPDATE THINGS HERE
	console.log(payload);
});
 
module.exports = AppStore;