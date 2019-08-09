import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import UserService from '@services/user-service';
import { UserContext } from '@common/contexts/user-context';
import AppContainer from './AppContainer';

jest.mock('axios');
jest.mock('@services/user-service');

describe('AppContainer', () => {
	const setup = () => {
		const wrapper = shallow(<AppContainer />);
		return { wrapper };
	};

	const mockUsersResponse = {
		data: {
			users: []
		}
	};

	it('renders the App', () => {
		const { wrapper } = setup();
		expect(wrapper.find('App').exists()).toBe(true);
	});

	it('triggers source.cancel on unmount', () => {
		const { wrapper } = setup();
		let counter = 0;
		wrapper.instance().source = {
			cancel: jest.fn(() => {
				counter += 1;
			})
		};

		wrapper.unmount();

		expect(counter).toEqual(1);
	});

	describe('getUsers', () => {
		it('retrieves the user list and sets users in context provider', async () => {
			UserService.getUsers.mockImplementation(() => Promise.resolve(mockUsersResponse));
			const { wrapper } = setup();

			await wrapper.instance().getUsers();

			expect(wrapper.state().users).toEqual(mockUsersResponse.data.users);
			expect(wrapper.find(UserContext.Provider).props().value.users).toEqual(
				mockUsersResponse.data.users
			);
		});

		it('sets the error state when the call fails', async () => {
			UserService.getUsers.mockImplementation(() => Promise.reject());
			const { wrapper } = setup();

			await wrapper.instance().getUsers();

			expect(wrapper.state().error).toBe(true);
		});

		it('swallows the error when the call is cancelled', async () => {
			axios.isCancel.mockImplementation(() => true);
			UserService.getUsers.mockImplementation(() => Promise.reject());
			const { wrapper } = setup();

			await wrapper.instance().getUsers();

			expect(wrapper.state().error).toBe(false);
		});
	});
});
