import React from 'react';
import { mount } from 'enzyme';
import withModalContext from './WithModalContext';

describe('withModalContext', () => {
	const MockComponent = () => <div>Foo</div>;

	const setup = () => {
		const MockComponentWithContext = withModalContext(MockComponent);
		const wrapper = mount(<MockComponentWithContext />);

		return { wrapper };
	};

	it('injects ModalContext props', () => {
		const { wrapper } = setup();

		const wrapperProps = wrapper.find(MockComponent).props().modalContext;

		expect(wrapperProps.isModalOpen).toBe(false);
		expect(typeof wrapperProps.openModal).toBe('function');
		expect(typeof wrapperProps.closeModal).toBe('function');
		expect(wrapperProps.content).toEqual({
			title: '',
			message: '',
			action: null
		});
	});
});
