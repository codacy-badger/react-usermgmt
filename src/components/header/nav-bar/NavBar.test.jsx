import React from 'react';
import { shallow } from 'enzyme';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import NavBar from './NavBar';

describe('NavBar', () => {
	const setup = () => {
		const wrapper = shallow(<NavBar />);

		return { wrapper };
	};

	it('displays the desktop menu within the appropriate MediaQuery', () => {
		const { wrapper } = setup();

		const mediaQuery = wrapper.find('[query="(min-width: 36.251rem)"]');

		expect(
			mediaQuery
				.children()
				.find('.desktop-menu')
				.exists()
		).toBe(true);
	});

	it('displays the mobile menu within the appropriate MediaQuery', () => {
		const { wrapper } = setup();

		const mediaQuery = wrapper.find('[query="(max-width: 36.25rem)"]');
		const children = mediaQuery.children();

		expect(children.find('.icon-button-container').exists()).toBe(true);
		expect(children.find(Menu).exists()).toBe(true);
		expect(children.find(MenuItem).length > 0).toBe(true);
	});

	it('sets and removes an anchor element for the mobile menu', () => {
		const { wrapper } = setup();

		wrapper.find(IconButton).simulate('click', { currentTarget: 'element' });
		expect(wrapper.state().anchorEl).toEqual('element');

		wrapper
			.find(MenuItem)
			.at(0)
			.simulate('click');
		expect(wrapper.state().anchorEl).toEqual(null);
	});
});
