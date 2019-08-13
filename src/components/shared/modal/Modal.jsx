import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withModalContext } from '@src/common/contexts/modal-context';
import { modalContextProps } from '@src/common/prop-types';
import './Modal.scss';

const propTypes = {
	modalContext: modalContextProps.isRequired
};

const Modal = ({ modalContext }) => {
	const {
		content: { title, message, action },
		closeModal,
		isModalOpen
	} = modalContext;

	return (
		<Dialog onBackdropClick={closeModal} open={isModalOpen} classes={{ paper: 'dialog' }}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{action && (
					<Button onClick={action} color="primary">
						Proceed
					</Button>
				)}
				<Button onClick={closeModal} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

Modal.propTypes = propTypes;

export default withModalContext(Modal);
