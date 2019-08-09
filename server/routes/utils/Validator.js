const HttpStatus = require('./HttpStatus');
const UserModel = require('../models/UserModel');

const _compareModels = Symbol('compareModels');

class Validator {
	constructor() {
		this.errorStatus = null;
		this.violations = [];
	}

	validate(body) {
		this.errorStatus = null;
		this.violations = [];

		if (!body || (!Array.isArray(body) && !(body instanceof Object))) {
			this.errorStatus = HttpStatus.BAD_REQUEST;
			this.violations.push('Validate method expects an object or an array of objects.');
		}

		if (body instanceof Object && !Array.isArray(body)) {
			this[_compareModels](body);
		}

		if (Array.isArray(body)) {
			if (body.length === 0) {
				this.errorStatus = HttpStatus.UNPROCESSABLE_ENTITY;
				this.violations.push('User list is empty.');
			} else {
				body.forEach(obj => {
					this[_compareModels](obj);
				});
			}
		}

		return {
			errorStatus: this.errorStatus,
			violations: this.violations
		};
	}

	[_compareModels](model) {
		const { gender } = model;
		const genders = ['male', 'female', 'other'];

		const keys = Object.keys(UserModel);

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];

			if (!model[key] || typeof model[key] !== typeof UserModel[key]) {
				this.errorStatus = HttpStatus.UNPROCESSABLE_ENTITY;
				this.violations.push('One or more user objects are invalid.');

				return false;
			}

			if (!genders.includes(gender)) {
				this.errorStatus = HttpStatus.UNPROCESSABLE_ENTITY;
				this.violations.push("Gender: please specify 'male', 'female' or 'other'.");

				return false;
			}
		}
	}
}

module.exports = Validator;
