import React from 'react';
import { shallow } from 'enzyme';
import Container from '@material-ui/core/Container';
import Header from '@components/header';
import Footer from '@components/footer';
import Modal from '@shared/modal';
import Toast from '@shared/toast';
import App from './App';

describe('App', () => {
	const setup = propOverrides => {
		const props = {
			error: false,
			...propOverrides
		};

		const wrapper = shallow(<App {...props} />);
		return { wrapper, props };
	};

	it('renders the global pieces of the UI', () => {
		const { wrapper } = setup();

		expect(wrapper.find(Header).exists()).toBe(true);
		expect(wrapper.find(Container).exists()).toBe(true);
		expect(wrapper.find(Footer).exists()).toBe(true);
		expect(wrapper.find(Modal).exists()).toBe(true);
		expect(wrapper.find(Toast).exists()).toBe(true);
	});

	it('renders the error text when AppContainer provides an API error', () => {
		const { wrapper } = setup({ error: true });
		expect(wrapper.find('.error-message').exists()).toBe(true);
	});
});
