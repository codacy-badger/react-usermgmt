import axios, { CancelToken } from 'axios';

class Api {
	/**
	 * { data, params, headers, responseType, source }
	 */
	static delete(url, opts) {
		return this.request({ ...opts, url, method: 'DELETE' });
	}

	/**
	 * { params, headers, responseType, source }
	 */
	static get(url, opts) {
		return this.request({ ...opts, url, method: 'GET' });
	}

	/**
	 * { params, headers, responseType, source }
	 */
	static patch(url, data, opts) {
		const { headers = {} } = opts;
		const patchHeaders = {
			...headers,
			'Content-Type': 'application/json-patch+json'
		};
		return this.request({ ...opts, url, method: 'PATCH', data, headers: patchHeaders });
	}

	/**
	 * { params, headers, responseType, source }
	 */
	static post(url, data, opts) {
		return this.request({ ...opts, url, method: 'POST', data });
	}

	/**
	 * { params, headers, responseType, source }
	 */
	static put(url, data, opts) {
		return this.request({ ...opts, url, method: 'PUT', data });
	}

	static request({ url, method, data, params, headers, responseType = 'json', source }) {
		const opts = {
			url,
			method,
			data,
			params,
			headers,
			responseType
		};

		if (source) {
			opts.cancelToken = source.token;
		}

		return axios.request(opts);
	}

	static source() {
		return CancelToken.source();
	}

	static isCancel(error) {
		return axios.isCancel(error);
	}
}

export default Api;
