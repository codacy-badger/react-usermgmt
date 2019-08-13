import React from 'react';
import { shallow } from 'enzyme';
import SectionHeader from './SectionHeader';

describe('SectionHeader', () => {
	const setup = () => {
		const props = {
			title: 'Page Title',
			subtext: 'hello world'
		};

		const wrapper = shallow(<SectionHeader {...props} />);

		return {
			wrapper,
			props
		};
	};

	it('renders the header and subtext content', () => {
		const { wrapper, props } = setup();

		expect(wrapper.find('h2').text()).toEqual(props.title);
		expect(wrapper.find('p').text()).toEqual(props.subtext);
	});
});
