import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import EditIcon from '@material-ui/icons/EditOutlined';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import UserForm from '@shared/user-form';
import { withModalContext } from '@common/contexts/modal-context';
import { userProps, modalContextProps } from '@common/prop-types';
import maleIcon from '@assets/images/male-icon.png';
import femaleIcon from '@assets/images/female-icon.png';
import './UserInfoTable.scss';

class UserInfoTable extends React.Component {
	static propTypes = {
		deleteUser: PropTypes.func.isRequired,
		user: userProps.isRequired,
		modalContext: modalContextProps.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			userId: props.user.id,
			isEditMode: false
		};
	}

	toggleEditMode = () => {
		this.setState({ isEditMode: !this.state.isEditMode });
	};

	deleteUser = async () => {
		const {
			deleteUser,
			modalContext: { closeModal }
		} = this.props;

		await deleteUser(this.state.userId);
		closeModal();
	};

	openDeleteModal = () => {
		const {
			modalContext: { openModal }
		} = this.props;

		openModal(
			'Are you sure?',
			'You are about to delete a user. This action cannot be undone.',
			this.deleteUser
		);
	};

	render() {
		const { address, firstName, gender, id, lastName, username } = this.props.user;
		return !this.state.isEditMode ? (
			<div className="table-entry">
				<MediaQuery query="(min-width: 36.25rem)">
					<img
						className="user-icon"
						alt="User Icon"
						src={gender === 'male' || gender === 'other' ? maleIcon : femaleIcon}
					/>
				</MediaQuery>
				<table className="user-info">
					<tbody>
						<tr>
							<th colSpan="2">
								{firstName} {lastName}
							</th>
						</tr>
						<tr>
							<td>Username</td>
							<td>{username}</td>
						</tr>
						<tr>
							<td>ID #</td>
							<td>{id}</td>
						</tr>
						<tr>
							<td>Gender</td>
							<td>{gender.charAt(0).toUpperCase() + gender.slice(1)}</td>
						</tr>
						<tr>
							<td>Address</td>
							<td>{address}</td>
						</tr>
					</tbody>
				</table>
				<div className="actions">
					<IconButton
						onClick={this.openDeleteModal}
						color="inherit"
						classes={{ colorInherit: 'delete-icon' }}
					>
						<TrashIcon />
					</IconButton>
					<IconButton
						onClick={this.toggleEditMode}
						color="inherit"
						classes={{ colorInherit: 'edit-icon' }}
					>
						<EditIcon />
					</IconButton>
				</div>
			</div>
		) : (
			<div className="update-user-form">
				<UserForm
					variant="update"
					initialValues={this.props.user}
					callback={this.toggleEditMode}
				/>
				<Button
					onClick={this.toggleEditMode}
					color="secondary"
					variant="outlined"
					className="cancel-button"
				>
					Cancel
				</Button>
			</div>
		);
	}
}

export default withModalContext(UserInfoTable);
