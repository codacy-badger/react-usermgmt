import uuidv4 from 'uuid/v4';
import Api from '@src/api/Api';
import UserService from './UserService';

jest.mock('axios');

describe('UserService', () => {
	const id = uuidv4();
	const source = 'source';
	const url = '/api/users';

	const mockUser = {
		firstName: 'Foo',
		lastName: 'Bar',
		username: 'helloworld7',
		address: '123 Fake St, Nowhere, CO 80123',
		gender: 'other'
	};

	test('getUsers calls Api get method with the correct arguments', () => {
		const spy = jest.spyOn(Api, 'get');
		UserService.getUsers(source);
		expect(spy).toHaveBeenCalledWith(url, { source });
	});

	test('createUser calls Api post method with the correct arguments', () => {
		const spy = jest.spyOn(Api, 'post');
		UserService.createUser(mockUser, source);
		expect(spy).toHaveBeenCalledWith(url, mockUser, { source });
	});

	test('updateUser calls Api put method with the correct arguments', () => {
		const spy = jest.spyOn(Api, 'put');
		UserService.updateUser(id, mockUser, source);
		expect(spy).toHaveBeenCalledWith(`${url}/${id}`, mockUser, { source });
	});

	test('deleteUser calls Api put method with the correct arguments', () => {
		const spy = jest.spyOn(Api, 'delete');
		UserService.deleteUser(id, source);
		expect(spy).toHaveBeenCalledWith(`${url}/${id}`, { source });
	});
});
