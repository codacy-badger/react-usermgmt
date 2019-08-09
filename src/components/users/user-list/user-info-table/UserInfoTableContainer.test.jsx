import React from 'react';
import { shallow } from 'enzyme';
import Api from '@api/Api';
import UserService from '@services/user-service';
import UserInfoTableContainer from './UserInfoTableContainer';
import UserInfoTable from './UserInfoTable';

jest.mock('axios');
jest.mock('@api/Api');
jest.mock('@services/user-service');
jest.mock('@common/contexts/toast-context/WithToastContext');
jest.mock('@common/contexts/user-context/WithUserContext');

describe('UserInfoTableContainer', () => {
	const mockUser = {
		id: '12345',
		address: '123 Wall Ave',
		firstName: 'Pink',
		lastName: 'Floyd',
		gender: 'other',
		username: 'darkside1973'
	};

	const setup = () => {
		const props = {
			toastContext: {
				isToastOpen: false,
				message: 'hello world',
				variant: 'success',
				openToast: jest.fn(),
				closeToast: jest.fn()
			},
			userContext: {
				users: [mockUser],
				getUsers: jest.fn()
			},
			user: mockUser
		};

		const wrapper = shallow(<UserInfoTableContainer {...props} />);
		return { wrapper, props };
	};

	it('renders the UserInfoTable', () => {
		const { wrapper } = setup();
		expect(wrapper.find(UserInfoTable).exists()).toBe(true);
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

	describe('deleteUser', () => {
		it('deletes the user and triggers success toast', async () => {
			UserService.deleteUser.mockImplementation(() => Promise.resolve());
			const spy = jest.spyOn(UserService, 'deleteUser');
			const { wrapper, props } = setup();

			await wrapper.instance().deleteUser('12345');

			expect(spy).toHaveBeenCalledWith('12345', 'source');
			expect(props.toastContext.openToast).toHaveBeenCalledWith(
				'success',
				'User successfully deleted.'
			);
		});

		it('triggers error toast when the call fails', async () => {
			UserService.deleteUser.mockImplementation(() => Promise.reject());
			const { wrapper, props } = setup();

			await wrapper.instance().deleteUser('12345');

			expect(props.toastContext.openToast).toHaveBeenCalledWith(
				'error',
				'There was an error deleting the user.'
			);
		});

		it('swallows the error when the call is cancelled', async () => {
			Api.isCancel = jest.fn(() => true);
			UserService.deleteUser.mockImplementation(() => Promise.reject());
			const { wrapper, props } = setup();

			await wrapper.instance().deleteUser('12345');

			expect(props.toastContext.openToast).not.toHaveBeenCalled();
		});
	});
});
