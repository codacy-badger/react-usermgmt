import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, ErrorMessage } from 'formik';
import Button from '@material-ui/core/Button';
import FormInput from '../form-input';
import FormSelect from '../form-select';
import './FormWrapper.scss';

const propTypes = {
	errors: PropTypes.shape({
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		username: PropTypes.string,
		gender: PropTypes.string,
		address: PropTypes.string
	}),
	handleSubmit: PropTypes.func.isRequired
};

const defaultProps = {
	errors: {
		firstName: false,
		lastName: false,
		username: false,
		gender: false,
		address: false
	}
};

const FormWrapper = ({ errors, handleSubmit }) => (
	<Form className="form-wrapper">
		<div className="form-row">
			<div className="form-item">
				<Field
					name="firstName"
					label="First Name"
					placeholder="Fakey"
					error={errors.firstName}
					component={FormInput}
				/>
				<ErrorMessage name="firstName" component="p" />
			</div>
			<div className="form-item">
				<Field
					name="lastName"
					label="Last Name"
					placeholder="McFakerson"
					error={errors.lastName}
					component={FormInput}
				/>
				<ErrorMessage name="lastName" component="p" />
			</div>
		</div>
		<div className="form-row">
			<div className="form-item">
				<Field
					name="username"
					label="Username"
					placeholder="foobar123"
					error={errors.username}
					component={FormInput}
				/>
				<ErrorMessage name="username" component="p" />
			</div>
			<div className="form-item">
				<Field
					name="address"
					label="Address"
					placeholder="21 Jump St, Denver, CO 80203"
					error={errors.address}
					component={FormInput}
				/>
				<ErrorMessage name="address" component="p" />
			</div>
		</div>
		<div className="form-row">
			<div className="form-item">
				<Field
					name="gender"
					label="Gender"
					options={[
						<option key="male" value="male">
							Male
						</option>,
						<option key="female" value="female">
							Female
						</option>,
						<option key="other" value="other">
							Other
						</option>
					]}
					error={errors.gender}
					component={FormSelect}
				/>
				<ErrorMessage name="gender" component="p" />
			</div>
			<Button
				onClick={handleSubmit}
				color="primary"
				variant="outlined"
				className="submit-button"
			>
				Submit
			</Button>
		</div>
	</Form>
);

FormWrapper.propTypes = propTypes;
FormWrapper.defaultProps = defaultProps;

export default FormWrapper;
