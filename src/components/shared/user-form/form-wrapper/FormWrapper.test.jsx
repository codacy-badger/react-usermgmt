import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'formik';
import Button from '@material-ui/core/Button';
import FormWrapper from './FormWrapper';

jest.mock('@src/common/contexts/modal-context/WithModalContext');
jest.mock('react-router-dom', () => ({
	withRouter: Component => Component
}));

describe('FormWrapper', () => {
	const setup = propOverrides => {
		const props = {
			dirty: false,
			history: {
				block: jest.fn(() => ({
					pathname: '/'
				})),
				push: jest.fn(),
				location: {
					pathname: '/pathname'
				}
			},
			errors: {
				firstName: 'firstName',
				lastName: 'lastName',
				username: 'username',
				gender: 'gender',
				address: 'address'
			},
			handleSubmit: jest.fn(),
			modalContext: {
				closeModal: jest.fn(),
				openModal: jest.fn(),
				isModalOpen: false,
				content: {
					title: 'Modal Title',
					message: 'hello world',
					action: jest.fn()
				}
			},
			...propOverrides
		};

		const wrapper = shallow(<FormWrapper {...props} />);

		return {
			wrapper,
			props
		};
	};

	it('renders the relevant form fields', () => {
		const { wrapper, props } = setup();

		expect(
			wrapper
				.find(Field)
				.at(0)
				.props().name
		).toBe('firstName');
		expect(
			wrapper
				.find(Field)
				.at(0)
				.props().error
		).toBe(props.errors.firstName);

		expect(
			wrapper
				.find(Field)
				.at(1)
				.props().name
		).toBe('lastName');
		expect(
			wrapper
				.find(Field)
				.at(1)
				.props().error
		).toBe(props.errors.lastName);

		expect(
			wrapper
				.find(Field)
				.at(2)
				.props().name
		).toBe('username');
		expect(
			wrapper
				.find(Field)
				.at(2)
				.props().error
		).toBe(props.errors.username);

		expect(
			wrapper
				.find(Field)
				.at(3)
				.props().name
		).toBe('address');
		expect(
			wrapper
				.find(Field)
				.at(3)
				.props().error
		).toBe(props.errors.address);

		expect(
			wrapper
				.find(Field)
				.at(4)
				.props().name
		).toBe('gender');
		expect(
			wrapper
				.find(Field)
				.at(4)
				.props().error
		).toBe(props.errors.gender);
	});

	it('handles form submission', () => {
		const { wrapper, props } = setup();

		wrapper.find(Button).simulate('click');

		expect(props.handleSubmit).toHaveBeenCalled();
	});

	it('calls the unblock handler on unmount', () => {
		const { wrapper } = setup({ dirty: true });

		wrapper.instance().unblock = jest.fn();
		const spy = jest.spyOn(wrapper.instance(), 'unblock');

		wrapper.unmount();

		expect(spy).toHaveBeenCalled();
	});

	describe('openLeaveWithoutSaveModal', () => {
		it('prompts the leave without save modal on unmount', () => {
			const { wrapper, props } = setup();

			wrapper.instance().openLeaveWithoutSaveModal();

			expect(props.modalContext.openModal).toHaveBeenCalledWith(
				'Leave without saving?',
				'The user will not be saved in the system.',
				expect.any(Function)
			);
		});
	});

	describe('handleUnblock', () => {
		it('unblocks the router', () => {
			const { wrapper, props } = setup();

			wrapper.instance().unblock = jest.fn();
			wrapper.instance().handleUnblock();

			expect(wrapper.state().unblock).toBe(true);
			expect(props.modalContext.closeModal).toHaveBeenCalled();
			expect(props.history.push).toHaveBeenCalledWith(expect.any(String));
		});
	});

	describe('handleHistory', () => {
		it('blocks react router history from proceeding', () => {
			const { wrapper, props } = setup();

			wrapper.instance().handleHistory();

			expect(props.history.block).toHaveBeenCalled();
		});
	});

	describe('historyCallback', () => {
		it('triggers the leave without save modal handler', () => {
			const { wrapper } = setup({ dirty: true });
			const spy = jest.spyOn(wrapper.instance(), 'openLeaveWithoutSaveModal');

			wrapper.instance().historyCallback({ pathname: '/' });

			expect(spy).toHaveBeenCalled();
		});

		it('returns false when the target pathname matches the current pathname', () => {
			const { wrapper } = setup({ dirty: true });

			const result = wrapper.instance().historyCallback({ pathname: '/pathname' });

			expect(result).toBe(false);
		});

		it('returns false when the target pathname does not match the current pathname', () => {
			const { wrapper } = setup();

			const result = wrapper.instance().historyCallback({ pathname: '/fake' });

			expect(result).toBe(true);
		});
	});
});
