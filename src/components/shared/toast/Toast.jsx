import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { withToastContext } from '@src/common/contexts/toast-context';
import { toastContextProps } from '@src/common/prop-types';

const propTypes = {
	toastContext: toastContextProps.isRequired
};

const Toast = ({ toastContext }) => {
	const variantIcon = {
		success: CheckCircleIcon,
		warning: WarningIcon,
		error: ErrorIcon,
		info: InfoIcon
	};

	const styles = makeStyles(theme => ({
		success: {
			backgroundColor: green[600]
		},
		error: {
			backgroundColor: theme.palette.error.main
		},
		info: {
			backgroundColor: theme.palette.primary.main
		},
		warning: {
			backgroundColor: amber[700]
		},
		icon: {
			fontSize: 20
		},
		iconVariant: {
			opacity: 0.9,
			marginRight: theme.spacing(1)
		},
		message: {
			alignItems: 'center',
			display: 'flex'
		}
	}))();

	const handleSnackbarClose = () => {
		toastContext.closeToast();
	};

	const Icon = variantIcon[toastContext.variant];

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
			autoHideDuration={5000}
			open={toastContext.isToastOpen}
			onClose={handleSnackbarClose}
		>
			<SnackbarContent
				className={styles[toastContext.variant]}
				message={
					<span className={styles.message}>
						<Icon className={`${styles.icon} ${styles.iconVariant}`} />
						{toastContext.message}
					</span>
				}
				action={[
					<IconButton key="close" color="inherit" onClick={handleSnackbarClose}>
						<CloseIcon className={styles.icon} />
					</IconButton>
				]}
			/>
		</Snackbar>
	);
};

Toast.propTypes = propTypes;

export default withToastContext(Toast);
