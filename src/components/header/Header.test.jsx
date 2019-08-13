import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
	const setup = () => {
		const wrapper = shallow(<Header />);

		return { wrapper };
	};

	it('renders the page title and NavBar', () => {
		const { wrapper } = setup();

		expect(wrapper.find('header').exists()).toBe(true);
		expect(wrapper.find('NavBar').exists()).toBe(true);
		expect(wrapper.find('.page-title').text()).toEqual('AnonCorp User Management');
	});
});
