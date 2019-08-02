import React from 'react';

const ToastContext = React.createContext({
	isToastOpen: false,
	message: '',
	variant: 'info',
	openToast: () => {},
	closeToast: () => {}
});

export default ToastContext;
