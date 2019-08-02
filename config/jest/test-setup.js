'use strict';

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

global.requestAnimationFrame = cb => {
	setTimeout(cb, 0);
};

global.localStorage = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn()
};

global.sessionStorage = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn()
};
