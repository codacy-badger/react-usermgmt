import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { fieldProps } from '@common/prop-types';

const propTypes = {
	error: PropTypes.string,
	label: PropTypes.string.isRequired,
	field: fieldProps.isRequired
};

const FormInput = ({ error, label, field }) => {
	const styles = makeStyles(theme => ({
		textField: {
			marginRight: theme.spacing(1)
		}
	}))();

	return (
		<TextField
			required
			error={Boolean(error)}
			label={label}
			className={clsx(styles.textField, 'form-input')}
			margin="normal"
			variant="outlined"
			{...field}
		/>
	);
};

FormInput.propTypes = propTypes;

export default FormInput;
