import axios from 'axios';
import Api from './Api';

jest.mock('axios', () => ({
	isCancel: jest.fn(),
	request: jest.fn()
}));

describe('Api', () => {
	const source = 'source';
	const url = '/api/users';
	const data = {};
	const patchHeaders = { 'Content-Type': 'application/json-patch+json' };
	const err = { err: 'err' };

	test('request calls axios.request with the correct arguments', () => {
		const opts = {
			url,
			data,
			method: 'GET',
			params: {},
			headers: {},
			responseType: 'json'
		};
		const spy = jest.spyOn(axios, 'request');

		Api.request(opts);

		expect(spy).toHaveBeenCalledWith(opts);
	});

	test('delete calls request with the correct arguments', () => {
		const spy = jest.spyOn(Api, 'request');
		Api.delete(url, { source });
		expect(spy).toHaveBeenCalledWith({ source, url, method: 'DELETE' });
	});

	test('get calls request with the correct arguments', () => {
		const spy = jest.spyOn(Api, 'request');
		Api.get(url, { source });
		expect(spy).toHaveBeenCalledWith({ source, url, method: 'GET' });
	});

	test('patch calls request with the correct arguments', () => {
		const spy = jest.spyOn(Api, 'request');
		Api.patch(url, data, { source });
		expect(spy).toHaveBeenCalledWith({
			source,
			url,
			data,
			method: 'PATCH',
			headers: patchHeaders
		});
	});

	test('post calls request with the correct arguments', () => {
		const spy = jest.spyOn(Api, 'request');
		Api.post(url, data, { source });
		expect(spy).toHaveBeenCalledWith({
			source,
			url,
			data,
			method: 'POST'
		});
	});

	test('put calls request with the correct arguments', () => {
		const spy = jest.spyOn(Api, 'request');
		Api.put(url, data, { source });
		expect(spy).toHaveBeenCalledWith({
			source,
			url,
			data,
			method: 'PUT'
		});
	});

	test('isCancel calls axios.isCancel with the correct error object', () => {
		const spy = jest.spyOn(axios, 'isCancel');
		Api.isCancel(err);
		expect(spy).toHaveBeenCalledWith(err);
	});
});
