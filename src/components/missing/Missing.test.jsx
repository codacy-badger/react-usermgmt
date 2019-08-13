import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import Missing from './Missing';

describe('Missing', () => {
	const setup = () => {
		const wrapper = mount(
			<Router basename="/">
				<Missing />
			</Router>
		);

		return { wrapper };
	};

	it('renders the page content and provides a link to the home screen', () => {
		const { wrapper } = setup();

		expect(wrapper.find('.missing').exists()).toBe(true);
		expect(wrapper.find('h2').text()).toEqual("That's a 404");
		expect(
			wrapper
				.find('Link')
				.at(0)
				.props().to
		).toEqual('/');
	});
});
