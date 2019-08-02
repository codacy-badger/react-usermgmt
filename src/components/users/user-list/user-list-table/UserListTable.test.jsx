import React from 'react';
import { mount } from 'enzyme';
import UserListTable from './UserListTable';

jest.mock('@common/contexts/user-context/WithUserContext');

describe('UserListTable', () => {
	const setup = () => {
		const props = {
			users: [mockUser]
		};

		const wrapper = mount(<UserListTable {...props} />);
		return { wrapper, props };
	};

	const mockUser = {
		id: '12345',
		address: '123 Wall Ave',
		firstName: 'Pink',
		lastName: 'Floyd',
		gender: 'other',
		username: 'darkside1973'
	};

	it('renders the appropriate columns', () => {
		const { wrapper } = setup();

		const tableHeaders = wrapper.find('th');

		expect(tableHeaders.at(0).text()).toEqual('Username');
		expect(tableHeaders.at(1).text()).toEqual('ID #');
		expect(tableHeaders.at(2).text()).toEqual('First Name');
		expect(tableHeaders.at(3).text()).toEqual('Last Name');
		expect(tableHeaders.at(4).text()).toEqual('Gender');
		expect(tableHeaders.at(5).text()).toEqual('Address');
	});
});
