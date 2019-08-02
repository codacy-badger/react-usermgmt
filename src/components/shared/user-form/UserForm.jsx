import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import uuidv4 from 'uuid/v4';
import UserService from '@services/user-service';
import { withToastContext } from '@common/contexts/toast-context';
import { withUserContext } from '@common/contexts/user-context';
import { toastContextProps, userContextProps, userProps } from '@common/prop-types';
import Api from '@api/Api';
import FormWrapper from './form-wrapper';

const propTypes = {
	callback: PropTypes.func,
	initialValues: userProps,
	userContext: userContextProps.isRequired,
	toastContext: toastContextProps.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	variant: PropTypes.oneOf(['create', 'update'])
};

const defaultProps = {
	callback: () => {},
	initialValues: {
		id: '',
		firstName: '',
		lastName: '',
		username: '',
		gender: '',
		address: ''
	},
	variant: 'create'
};

const UserForm = ({
	callback,
	initialValues,
	toastContext: { openToast },
	userContext: { getUsers },
	history,
	variant
}) => {
	const source = Api.source();

	useEffect(() => {
		return () => {
			source.cancel();
		};
	}, [source]);

	const isUpdateVariant = variant === 'update';

	const handleSubmit = async values => {
		try {
			const payload = { ...values, id: isUpdateVariant ? values.id : uuidv4() };

			await (isUpdateVariant
				? UserService.updateUser(values.id, payload, source)
				: UserService.createUser(payload, source));

			await getUsers();
			await openToast(
				'success',
				`User successfully ${isUpdateVariant ? 'updated' : 'created'}.`
			);

			if (!isUpdateVariant) {
				history.push('/');
			} else {
				callback();
			}
		} catch (err) {
			if (!Api.isCancel(err)) {
				openToast(
					'error',
					`There was an error ${isUpdateVariant ? 'updating' : 'creating'} the user.`
				);
			}
		}
	};

	const validationSchema = (() => {
		const defineValidationRoutine = field => {
			return Yup.string()
				.required(`${field} is required.`)
				.trim(`${field} is required.`);
		};

		return Yup.object().shape({
			firstName: defineValidationRoutine('First name'),
			lastName: defineValidationRoutine('Last name'),
			username: defineValidationRoutine('Username'),
			address: defineValidationRoutine('Address'),
			gender: defineValidationRoutine('Gender')
		});
	})();

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			enableReinitialize={true}
			validateOnBlur={false}
			validateOnChange={false}
			validationSchema={validationSchema}
			component={FormWrapper}
		/>
	);
};

UserForm.propTypes = propTypes;
UserForm.defaultProps = defaultProps;

export default compose(
	withToastContext,
	withUserContext,
	withRouter
)(UserForm);
