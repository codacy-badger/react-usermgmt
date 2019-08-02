import React from 'react';
import { shallow } from 'enzyme';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Modal from './Modal';

jest.mock('@common/contexts/modal-context/WithModalContext');

describe('Modal', () => {
	const setup = action => {
		const props = {
			modalContext: {
				closeModal: jest.fn(),
				openModal: jest.fn(),
				isModalOpen: false,
				content: {
					title: 'Modal Title',
					message: 'hello world',
					action
				}
			}
		};

		const wrapper = shallow(<Modal {...props} />);
		return { wrapper, props };
	};

	it('displays the dialog title and message', () => {
		const { wrapper } = setup();

		expect(wrapper.find(DialogTitle).text()).toEqual('Modal Title');
		expect(wrapper.find(DialogContentText).text()).toEqual('hello world');
	});

	it('closes the modal when the default button is clicked', () => {
		const { wrapper, props } = setup();

		wrapper.find(Button).simulate('click');

		expect(props.modalContext.closeModal).toHaveBeenCalled();
	});

	it('renders the optional button when the action is present', () => {
		let counter = 0;
		const { wrapper } = setup(() => counter++);

		wrapper
			.find(Button)
			.at(0)
			.simulate('click');

		expect(counter).toEqual(1);
	});
});
