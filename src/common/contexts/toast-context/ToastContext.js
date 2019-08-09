import React from 'react';

const ToastContext = React.createContext({
	message: '',
	variant: 'info',
	isToastOpen: false,
	openToast: () => {},
	closeToast: () => {}
});

export default ToastContext;
