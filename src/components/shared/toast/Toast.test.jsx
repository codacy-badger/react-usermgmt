import React from 'react';
import { shallow } from 'enzyme';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Toast from './Toast';

jest.mock('@common/contexts/toast-context/WithToastContext');

describe('Toast', () => {
	const setup = () => {
		const props = {
			toastContext: {
				isToastOpen: false,
				message: 'hello world',
				variant: 'success',
				openToast: jest.fn(),
				closeToast: jest.fn()
			}
		};

		const wrapper = shallow(<Toast {...props} />);
		return { wrapper, props };
	};

	it('displays the snackbar content', () => {
		const { wrapper } = setup();
		expect(wrapper.find(SnackbarContent).exists()).toBe(true);
	});

	it('closes when the action button is clicked', () => {
		const { wrapper, props } = setup();

		wrapper
			.find(SnackbarContent)
			.props()
			.action[0].props.onClick();

		expect(props.toastContext.closeToast).toHaveBeenCalled();
	});
});
