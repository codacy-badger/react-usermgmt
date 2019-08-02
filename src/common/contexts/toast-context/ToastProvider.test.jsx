import React from 'react';
import { shallow } from 'enzyme';
import ToastContext from './ToastContext';
import ToastProvider from './ToastProvider';

describe('ToastProvider', () => {
	const setup = () => {
		const wrapper = shallow(
			<ToastProvider>
				<p id="text">foo</p>
			</ToastProvider>
		);
		return { wrapper };
	};

	it('renders children and stores/updates the toast content', () => {
		const { wrapper } = setup();

		wrapper.instance().openToast('success', 'message');

		expect(wrapper.find('#text').text()).toEqual('foo');
		expect(wrapper.find(ToastContext.Provider).props().value.isToastOpen).toBe(true);
		expect(wrapper.find(ToastContext.Provider).props().value.message).toEqual('message');
		expect(wrapper.find(ToastContext.Provider).props().value.variant).toEqual('success');
	});

	it('closes the toast through provider values', () => {
		const { wrapper } = setup();

		wrapper.setState({ isToastOpen: true });
		wrapper
			.find(ToastContext.Provider)
			.props()
			.value.closeToast();

		expect(wrapper.find(ToastContext.Provider).props().value.isToastOpen).toBe(false);
	});

	describe('openToast', () => {
		it('throws an error when the variant or message arguments are missing', () => {
			const { wrapper } = setup();

			try {
				wrapper.instance().openToast();
				expect(true).toBe(false);
			} catch (err) {
				expect(err.message).toEqual(
					'Toast arguments "variant" and "message" are both required.'
				);
			}
		});
	});
});
