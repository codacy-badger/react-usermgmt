import React from 'react';
import { shallow } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator', () => {
	const setup = () => {
		const wrapper = shallow(<LoadingIndicator />);
		return { wrapper };
	};

	it('displays the Material UI Circular Progress component', () => {
		const { wrapper } = setup();
		expect(wrapper.find(CircularProgress).exists()).toBe(true);
	});
});
