import React from 'react';
import { shallow } from 'enzyme';
import ContentContainer from './ContentContainer';

describe('ContentContainer', () => {
	const setup = () => {
		const props = {
			className: 'test-class'
		};

		const wrapper = shallow(
			<ContentContainer {...props}>
				<div id="test-div">hello world</div>
			</ContentContainer>
		);
		return { wrapper, props };
	};

	it('renders the provided children', () => {
		const { wrapper } = setup();

		expect(wrapper.find('.test-class').exists()).toBe(true);
		expect(wrapper.find('#test-div').text()).toEqual('hello world');
	});
});
