import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
	const setup = () => {
		const wrapper = shallow(<Footer />);
		return { wrapper };
	};

	it('renders the copyright info', () => {
		const { wrapper } = setup();

		expect(wrapper.find('footer').exists()).toBe(true);
		expect(wrapper.find('.t-copyright').exists()).toBe(true);
	});
});
