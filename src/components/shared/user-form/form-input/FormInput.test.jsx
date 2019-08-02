import React from 'react';
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import FormInput from './FormInput';

describe('FormInput', () => {
	const setup = () => {
		const props = {
			error: undefined,
			label: 'hello world',
			field: {
				name: 'name',
				onBlur: jest.fn(),
				onChange: jest.fn(),
				value: 'foo'
			}
		};

		const wrapper = shallow(<FormInput {...props} />);
		return { wrapper, props };
	};

	it('renders the Material UI TextField', () => {
		const { wrapper } = setup();

		expect(wrapper.find(TextField).exists()).toBe(true);
		expect(wrapper.find(TextField).props().error).toBe(false);
		expect(wrapper.find(TextField).props().value).toEqual('foo');
	});
});
