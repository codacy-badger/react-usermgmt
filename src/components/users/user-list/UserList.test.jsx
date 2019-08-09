import React from 'react';
import { shallow, mount } from 'enzyme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import UserList from './UserList';
import UserListTable from './user-list-table';
import UserInfoTableContainer from './user-info-table';

jest.mock('@common/contexts/user-context/WithUserContext');

describe('UserList', () => {
	const mockUser = {
		id: '12345',
		address: '123 Wall Ave',
		firstName: 'Pink',
		lastName: 'Floyd',
		gender: 'other',
		username: 'darkside1973'
	};

	const setup = isMount => {
		const props = {
			userContext: {
				users: [mockUser],
				getUsers: jest.fn()
			}
		};

		const wrapper = isMount
			? mount(<UserList {...props} />)
			: shallow(<UserList {...props} />);

		return { wrapper, props };
	};

	it('renders the header and subtext', () => {
		const { wrapper } = setup(true);

		expect(wrapper.find('h2').text()).toEqual('Current Users');
		expect(wrapper.find('p').text()).toEqual('1 user found.');
	});

	it('renders the user list table when admin view is disabled', () => {
		const { wrapper } = setup();

		expect(wrapper.find(UserListTable).exists()).toBe(true);
		expect(wrapper.find(FormControlLabel).props().label).toEqual('Admin mode disabled.');
	});

	it('renders the user info tables when admin view is enabled', () => {
		const { wrapper } = setup();

		wrapper.instance().toggleView();

		expect(wrapper.find(UserInfoTableContainer).exists()).toBe(true);
		expect(wrapper.find(FormControlLabel).props().label).toEqual('Admin mode enabled.');
	});

	it('renders the horizontal rule when there is more than one user', () => {
		const { wrapper } = setup();

		wrapper.instance().props.userContext.users.push(mockUser);
		wrapper.instance().toggleView();

		expect(wrapper.find('.gray-rule').exists()).toBe(true);
	});

	it('renders the redirect link when there are no users', () => {
		const { wrapper } = setup();

		wrapper.instance().props.userContext.users.pop();
		wrapper.instance().toggleView();

		expect(
			wrapper
				.find('Link')
				.at(0)
				.props().to
		).toEqual('/new-user');
	});
});
