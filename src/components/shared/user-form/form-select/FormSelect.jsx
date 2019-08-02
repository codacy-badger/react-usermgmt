import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fieldProps } from '@common/prop-types';

const propTypes = {
	error: PropTypes.string,
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.node).isRequired,
	field: fieldProps.isRequired
};

const FormSelect = ({ error, label, options, field }) => {
	const styles = makeStyles(theme => ({
		formControl: {
			marginBottom: theme.spacing(1),
			marginRight: theme.spacing(1),
			minWidth: 120
		}
	}))();

	return (
		<FormControl
			required
			className={clsx(styles.formControl, 'form-input')}
			error={Boolean(error)}
		>
			<InputLabel htmlFor="gender">{label}</InputLabel>
			<Select native {...field}>
				<option value="" />
				{options}
			</Select>
		</FormControl>
	);
};

FormSelect.propTypes = propTypes;

export default FormSelect;
