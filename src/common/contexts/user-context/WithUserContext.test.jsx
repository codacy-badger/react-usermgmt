import React from 'react';
import { mount } from 'enzyme';
import withUserContext from './WithUserContext';

describe('withUserContext', () => {
	const MockComponent = () => <div>Foo</div>;

	const setup = () => {
		const MockComponentWithContext = withUserContext(MockComponent);
		const wrapper = mount(<MockComponentWithContext />);

		return { wrapper };
	};

	it('injects UserContext props', () => {
		const { wrapper } = setup();

		const wrapperProps = wrapper.find(MockComponent).props().userContext;

		expect(wrapperProps.users).toEqual([]);
		expect(typeof wrapperProps.getUsers).toBe('function');
	});
});
