'use strict';

const path = require('path');
const { readFile, writeFile } = require('jsonfile');
const HttpStatus = require('../utils/HttpStatus');
const Validator = require('../utils/Validator');

const validator = new Validator();

const _saveData = Symbol('saveData');
const _internalServerErrorResponse = Symbol('internalServerErrorResponse');
const _userNotFoundErrorResponse = Symbol('userNotFoundErrorResponse');
const _userExistsErrorResponse = Symbol('userExistsErrorResponse');

class UserService {
	constructor() {
		this.dataSource = path.resolve(__dirname, '..', '..', 'datastore', 'user-data.json');
	}

	getUsers(req, res) {
		try {
			readFile(this.dataSource, (err, obj) => {
				if (!err) {
					res.status(HttpStatus.OK);
					res.send(obj);
				} else if (err) {
					this[_internalServerErrorResponse](res, err);
				}
			});
		} catch (err) {
			this[_internalServerErrorResponse](res, err);
		}
	}

	getUser(req, res) {
		try {
			const { id } = req.params;
			readFile(this.dataSource, (err, obj) => {
				if (!err) {
					const { users: userList } = obj;
					const userIdExists = userList.some(user => user.id === id);
					if (userIdExists) {
						const match = userList.filter(user => user.id === id);
						res.status(HttpStatus.OK);
						res.send({ user: match });
					} else {
						this[_userNotFoundErrorResponse](res, id);
					}
				} else if (err) {
					this[_internalServerErrorResponse](res, err);
				}
			});
		} catch (err) {
			this[_internalServerErrorResponse](res, err);
		}
	}

	setUsers(req, res) {
		try {
			const { users } = req.body;
			const isArray = Array.isArray(users);
			const { errorStatus, violations } = validator.validate(
				isArray ? req.body.users : req.body
			);

			if (errorStatus) {
				res.status(errorStatus);
				res.send({ error: violations.join(' ') });
			} else {
				const { users } = req.body;
				const isArray = Array.isArray(users);

				readFile(this.dataSource, (err, obj) => {
					if (!err) {
						let payload = obj;

						if (isArray) {
							let userIdExists = false;

							for (let i = 0; i < users.length; i++) {
								for (let j = 0; j < obj.users.length; j++) {
									if (users[i].id === obj.users[j].id) {
										userIdExists = true;
										this[_userExistsErrorResponse](res, users[i].id);
										return false;
									}
								}
							}

							if (!userIdExists) {
								const userList = obj.users.concat(users);
								payload = { users: userList };
								this[_saveData](req, res, payload);
							}
						} else {
							const { users: userList } = obj;
							const userIdExists = userList.some(user => user.id === req.body.id);

							if (userIdExists) {
								this[_userExistsErrorResponse](res, req.body.id);
							} else {
								userList.push(req.body);
								payload = { users: userList };
								this[_saveData](req, res, payload);
							}
						}
					} else if (err) {
						this[_internalServerErrorResponse](res, err);
					}
				});
			}
		} catch (err) {
			this[_internalServerErrorResponse](res, err);
		}
	}

	updateUser(req, res) {
		try {
			const { id } = req.params;
			readFile(this.dataSource, (err, obj) => {
				if (!err) {
					const { body: updatedUser } = req;
					const { users: userList } = obj;
					const userIdExists = userList.some(user => user.id === id);

					if (userIdExists) {
						const { errorStatus, violations } = validator.validate(updatedUser);

						if (errorStatus) {
							res.status(errorStatus);
							res.send({ error: violations.join(' ') });
						} else {
							let index = null;

							userList.filter(user => {
								user.id === id && (index = userList.indexOf(user));
								return user.id === id;
							});

							updatedUser.id = id;
							userList[index] = updatedUser;
							const payload = { users: userList };

							this[_saveData](req, res, payload, HttpStatus.OK);
						}
					} else {
						this[_userNotFoundErrorResponse](res, id);
					}
				} else if (err) {
					this[_internalServerErrorResponse](res, err);
				}
			});
		} catch (err) {
			this[_internalServerErrorResponse](res, err);
		}
	}

	deleteUser(req, res) {
		try {
			const { id } = req.params;
			readFile(this.dataSource, (err, obj) => {
				if (!err) {
					const { users: userList } = obj;
					const userIdExists = userList.some(user => user.id === id);

					if (userIdExists) {
						let index = null;

						userList.filter(user => {
							user.id === id && (index = userList.indexOf(user));
							return user.id === id;
						});

						userList.splice(index, 1);
						const payload = { users: userList };

						this[_saveData](req, res, payload, HttpStatus.OK);
					} else {
						this[_userNotFoundErrorResponse](res, id);
					}
				} else if (err) {
					this[_internalServerErrorResponse](res, err);
				}
			});
		} catch (err) {
			this[_internalServerErrorResponse](res, err);
		}
	}

	[_saveData](req, res, data, status = HttpStatus.CREATED) {
		writeFile(this.dataSource, data, err => {
			if (!err) {
				res.status(status);
				const { users } = req.body;
				if (Array.isArray(users)) {
					res.status(HttpStatus.CREATED);
					const { users } = req.body;
					res.send({ users });
				} else {
					res.send({ user: req.body });
				}
			} else {
				this[_internalServerErrorResponse](res, err);
			}
		});
	}

	[_internalServerErrorResponse](res, err) {
		res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		res.send({ error: err });
	}

	[_userNotFoundErrorResponse](res, id) {
		res.status(HttpStatus.NOT_FOUND);
		res.send({ error: `User with ID ${id} does not exist.` });
	}

	[_userExistsErrorResponse](res, id) {
		res.status(HttpStatus.CONFLICT);
		res.send({ error: `User with ID ${id} already exists.` });
	}
}

module.exports = UserService;
