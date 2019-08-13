import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Form, Field, ErrorMessage } from 'formik';
import Button from '@material-ui/core/Button';
import { withModalContext } from '@common/contexts/modal-context';
import { modalContextProps } from '@common/prop-types';
import FormInput from '../form-input';
import FormSelect from '../form-select';
import './FormWrapper.scss';

class FormWrapper extends React.Component {
	static propTypes = {
		dirty: PropTypes.bool.isRequired,
		history: PropTypes.shape({
			block: PropTypes.func.isRequired,
			push: PropTypes.func.isRequired,
			location: PropTypes.shape({
				pathname: PropTypes.string.isRequired
			}).isRequired
		}).isRequired,
		errors: PropTypes.shape({
			firstName: PropTypes.string,
			lastName: PropTypes.string,
			username: PropTypes.string,
			gender: PropTypes.string,
			address: PropTypes.string
		}),
		handleSubmit: PropTypes.func.isRequired,
		modalContext: modalContextProps.isRequired
	};

	static defaultProps = {
		errors: {
			firstName: false,
			lastName: false,
			username: false,
			gender: false,
			address: false
		}
	};

	constructor() {
		super();

		this.state = {
			pathname: '',
			unblock: false
		};
	}

	componentDidMount() {
		this.unblock = this.handleHistory();
	}

	componentWillUnmount() {
		this.unblock();
	}

	openLeaveWithoutSaveModal = () => {
		const {
			modalContext: { openModal }
		} = this.props;

		openModal(
			'Leave without saving?',
			'The user will not be saved in the system.',
			this.handleUnblock
		);
	};

	historyCallback = ({ pathname }) => {
		const { unblock } = this.state;
		const { dirty, history } = this.props;

		if (dirty && !unblock && history.location.pathname !== pathname) {
			this.setState({ pathname }, this.openLeaveWithoutSaveModal);
		}

		return (unblock || !dirty) && history.location.pathname !== pathname;
	};

	handleHistory = () => {
		const { history } = this.props;

		return history.block(this.historyCallback);
	};

	handleUnblock = () => {
		const { pathname } = this.state;
		const {
			history,
			modalContext: { closeModal }
		} = this.props;

		this.setState({ unblock: true }, () => {
			closeModal();
			this.unblock();
			history.push(pathname);
		});
	};

	render() {
		const { errors, handleSubmit } = this.props;

		return (
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
	}
}

export default compose(
	withModalContext,
	withRouter
)(FormWrapper);
