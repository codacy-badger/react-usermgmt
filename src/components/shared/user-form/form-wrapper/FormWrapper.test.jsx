import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'formik';
import Button from '@material-ui/core/Button';
import FormWrapper from './FormWrapper';

describe('FormWrapper', () => {
	const setup = () => {
		const props = {
			errors: {
				firstName: 'firstName',
				lastName: 'lastName',
				username: 'username',
				gender: 'gender',
				address: 'address'
			},
			handleSubmit: jest.fn()
		};

		const wrapper = shallow(<FormWrapper {...props} />);
		return { wrapper, props };
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
});
