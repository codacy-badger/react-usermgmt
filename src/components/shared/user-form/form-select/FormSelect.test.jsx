import React from 'react';
import { shallow } from 'enzyme';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormSelect from './FormSelect';

describe('FormSelect', () => {
	const setup = () => {
		const props = {
			error: undefined,
			label: 'label',
			options: [
				<option key="one" value="one">
					one
				</option>,
				<option key="two" value="two">
					two
				</option>,
				<option key="three" value="three">
					three
				</option>
			],
			field: {
				name: 'name',
				onBlur: jest.fn(),
				onChange: jest.fn(),
				value: 'foo'
			}
		};

		const wrapper = shallow(<FormSelect {...props} />);
		return { wrapper, props };
	};

	it('renders the Material UI Select and other label', () => {
		const { wrapper } = setup();

		expect(wrapper.find(Select).exists()).toBe(true);
		expect(wrapper.find(FormControl).props().error).toBe(false);
		expect(wrapper.find(InputLabel).text()).toEqual('label');
		expect(
			wrapper
				.find('option')
				.at(1)
				.props().value
		).toBe('one');
	});
});
