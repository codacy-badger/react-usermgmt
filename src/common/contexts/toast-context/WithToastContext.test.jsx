import React from 'react';
import { mount } from 'enzyme';
import withToastContext from './WithToastContext';

describe('withToastContext', () => {
	const MockComponent = () => <div>Foo</div>;

	const setup = () => {
		const MockComponentWithContext = withToastContext(MockComponent);
		const wrapper = mount(<MockComponentWithContext />);

		return { wrapper };
	};

	it('injects ToastContext props', () => {
		const { wrapper } = setup();

		const wrapperProps = wrapper.find(MockComponent).props().toastContext;

		expect(wrapperProps.isToastOpen).toBe(false);
		expect(wrapperProps.message).toBe('');
		expect(wrapperProps.variant).toBe('info');
		expect(typeof wrapperProps.openToast).toBe('function');
		expect(typeof wrapperProps.closeToast).toBe('function');
	});
});
