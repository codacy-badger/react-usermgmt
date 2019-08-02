import React from 'react';
import { shallow } from 'enzyme';
import LoadingIndicator from '@shared/loading-indicator';
import dynamicImport from './DynamicImport';

describe('dynamicImport', () => {
	const setup = () => {
		const DynamicImport = dynamicImport('path');

		const wrapper = shallow(<DynamicImport />);
		return { wrapper };
	};

	it('displays the loading indicator as a fallback until the component loads', () => {
		const { wrapper } = setup();

		expect(wrapper.find('Suspense').exists()).toBe(true);
		expect(wrapper.find('Suspense').props().fallback).toEqual(<LoadingIndicator />);
	});
});
