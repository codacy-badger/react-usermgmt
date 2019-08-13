import React from 'react';
import { shallow } from 'enzyme';
import { Formik } from 'formik';
import uuidv4 from 'uuid/v4';
import Api from '@api/Api';
import UserService from '@services/user-service';
import UserForm from './UserForm';
import FormWrapper from './form-wrapper';

jest.mock('axios');
jest.mock('uuid/v4');
jest.mock('@api/Api');
jest.mock('@services/user-service');
jest.mock('@common/contexts/toast-context/WithToastContext');
jest.mock('@common/contexts/user-context/WithUserContext');

jest.mock('react-router-dom', () => ({
	withRouter: Component => Component
}));

describe('UserForm', () => {
	const mockUser = {
		id: '12345',
		address: '123 Wall Ave',
		firstName: 'Pink',
		lastName: 'Floyd',
		gender: 'other',
		username: 'darkside1973'
	};

	const setup = propOverrides => {
		const props = {
			callback: jest.fn(),
			initialValues: mockUser,
			userContext: {
				users: [mockUser],
				getUsers: jest.fn()
			},
			toastContext: {
				isToastOpen: false,
				message: '',
				variant: 'info',
				openToast: jest.fn(),
				closeToast: jest.fn()
			},
			history: {
				push: jest.fn()
			},
			variant: 'create',
			...propOverrides
		};

		const wrapper = shallow(<UserForm {...props} />);

		return {
			wrapper,
			props
		};
	};

	it('passes the correct values to Formik', () => {
		const { wrapper } = setup();

		expect(wrapper.find(Formik).props().initialValues).toEqual(mockUser);
		expect(wrapper.find(Formik).props().component).toEqual(FormWrapper);
	});

	describe('handleSubmit', () => {
		it('creates a user, triggers success toast and redirects back to the home route', async () => {
			uuidv4.mockImplementation(() => 'mockedId');
			const spy = jest.spyOn(UserService, 'createUser');
			const { wrapper, props } = setup();

			await wrapper
				.find(Formik)
				.props()
				.onSubmit(mockUser);

			expect(spy).toHaveBeenCalledWith({ ...mockUser, id: 'mockedId' }, 'source');
			expect(props.toastContext.openToast).toHaveBeenCalledWith(
				'success',
				'User successfully created.'
			);
			expect(props.history.push).toHaveBeenCalledWith('/');
		});

		it('updates a user, triggers success toast and triggers the callback', async () => {
			const spy = jest.spyOn(UserService, 'updateUser');
			const { wrapper, props } = setup({ variant: 'update' });

			await wrapper
				.find(Formik)
				.props()
				.onSubmit(mockUser);

			expect(spy).toHaveBeenCalledWith('12345', mockUser, 'source');
			expect(props.toastContext.openToast).toHaveBeenCalledWith(
				'success',
				'User successfully updated.'
			);
			expect(props.callback).toHaveBeenCalled();
		});

		it('triggers error toast when the createUser call fails', async () => {
			UserService.createUser.mockImplementation(() => Promise.reject());
			const { wrapper, props } = setup();

			await wrapper
				.find(Formik)
				.props()
				.onSubmit(null);

			expect(props.toastContext.openToast).toHaveBeenCalledWith(
				'error',
				'There was an error creating the user.'
			);
		});

		it('triggers error toast when the updateUser call fails', async () => {
			UserService.updateUser.mockImplementation(() => Promise.reject());
			const { wrapper, props } = setup({ variant: 'update' });

			await wrapper
				.find(Formik)
				.props()
				.onSubmit(null);

			expect(props.toastContext.openToast).toHaveBeenCalledWith(
				'error',
				'There was an error updating the user.'
			);
		});

		it('swallows the error when the call is cancelled', async () => {
			Api.isCancel = jest.fn(() => true);
			UserService.createUser.mockImplementation(() => Promise.reject());
			const { wrapper, props } = setup();

			await wrapper
				.find(Formik)
				.props()
				.onSubmit(null);

			expect(props.toastContext.openToast).not.toHaveBeenCalled();
		});
	});
});
