import Api from '@api/Api';

const BASE_URL = '/api/users';

export default class UserService {
	static getUsers(source) {
		return Api.get(BASE_URL, { source });
	}

	static createUser(user, source) {
		return Api.post(BASE_URL, user, { source });
	}

	static updateUser(id, user, source) {
		return Api.put(`${BASE_URL}/${id}`, user, { source });
	}

	static deleteUser(id, source) {
		return Api.delete(`${BASE_URL}/${id}`, { source });
	}
}
