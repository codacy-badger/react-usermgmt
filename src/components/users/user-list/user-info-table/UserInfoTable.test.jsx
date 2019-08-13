import React from 'react';
import { shallow } from 'enzyme';
import EditIcon from '@material-ui/icons/EditOutlined';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import UserInfoTable from './UserInfoTable';

jest.mock('@common/contexts/modal-context/WithModalContext');

describe('UserInfoTable', () => {
	const mockUser = {
		id: '12345',
		address: '123 Wall Ave',
		firstName: 'Pink',
		lastName: 'Floyd',
		gender: 'other',
		username: 'darkside1973'
	};

	const setup = () => {
		const props = {
			deleteUser: jest.fn(),
			user: mockUser,
			modalContext: {
				closeModal: jest.fn(),
				openModal: jest.fn(),
				isModalOpen: false,
				content: {
					title: 'Modal Title',
					message: 'hello world',
					action: jest.fn()
				}
			}
		};

		const wrapper = shallow(<UserInfoTable {...props} />);

		return {
			wrapper,
			props
		};
	};

	it('renders the user icon, personal information and actions', () => {
		const { wrapper } = setup();

		expect(wrapper.find('.user-icon').exists()).toBe(true);
		expect(wrapper.find('.user-info').exists()).toBe(true);
		expect(wrapper.find('.actions').exists()).toBe(true);
	});

	it('toggles opens the delete modal', () => {
		const { wrapper, props } = setup();

		wrapper
			.find(TrashIcon)
			.parent()
			.simulate('click');

		expect(props.modalContext.openModal).toHaveBeenCalledWith(
			'Are you sure?',
			'You are about to delete a user. This action cannot be undone.',
			expect.any(Function)
		);
	});

	it('toggles edit mode', () => {
		const { wrapper } = setup();

		wrapper
			.find(EditIcon)
			.parent()
			.simulate('click');

		expect(wrapper.find('.update-user-form').exists()).toBe(true);

		wrapper.find('.cancel-button').simulate('click');

		expect(wrapper.find('.update-user-form').exists()).toBe(false);
	});

	describe('deleteUser', () => {
		it('fires a call to delete the user and closes the modal', async () => {
			const { wrapper, props } = setup();

			await wrapper.instance().deleteUser();

			expect(props.deleteUser).toHaveBeenCalled();
			expect(props.modalContext.closeModal).toHaveBeenCalled();
		});
	});
});
