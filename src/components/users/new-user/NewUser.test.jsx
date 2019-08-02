import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import NewUser from './NewUser';

describe('NewUser', () => {
	const setup = () => {
		const wrapper = mount(
			<Router basename="/">
				<NewUser />
			</Router>
		);
		return { wrapper };
	};

	it('renders the page title and UserForm', () => {
		const { wrapper } = setup();

		expect(wrapper.find('.new-user').exists()).toBe(true);
		expect(wrapper.find('h2').text()).toEqual('Create a User');
		expect(wrapper.find('form').exists()).toBe(true);
	});
});
