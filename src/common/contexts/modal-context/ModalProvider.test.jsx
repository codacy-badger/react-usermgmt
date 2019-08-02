import React from 'react';
import { shallow } from 'enzyme';
import ModalContext from './ModalContext';
import ModalProvider from './ModalProvider';

describe('ModalProvider', () => {
	const setup = () => {
		const wrapper = shallow(
			<ModalProvider>
				<p id="text">foo</p>
			</ModalProvider>
		);
		return { wrapper };
	};

	it('renders children and stores/updates the modal content', () => {
		const { wrapper } = setup();
		const action = jest.fn();

		wrapper.instance().openModal('title', 'message', action);

		expect(wrapper.find('#text').text()).toEqual('foo');
		expect(wrapper.find(ModalContext.Provider).props().value.isModalOpen).toBe(true);
		expect(wrapper.find(ModalContext.Provider).props().value.content).toEqual({
			title: 'title',
			message: 'message',
			action
		});
	});

	it('closes the modal through provider values', () => {
		const { wrapper } = setup();

		wrapper.setState({ isModalOpen: true });
		wrapper
			.find(ModalContext.Provider)
			.props()
			.value.closeModal();

		expect(wrapper.find(ModalContext.Provider).props().value.isModalOpen).toBe(false);
	});

	describe('openModal', () => {
		it('throws an error when the title or message arguments are missing', () => {
			const { wrapper } = setup();

			try {
				wrapper.instance().openModal();
				expect(true).toBe(false);
			} catch (err) {
				expect(err.message).toEqual(
					'Modal arguments "title" and "message" are both required.'
				);
			}
		});
	});
});
