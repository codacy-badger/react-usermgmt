import React from 'react';
import { compose } from 'redux';
import UserService from '@src/services/user-service';
import { withToastContext } from '@src/common/contexts/toast-context';
import { withUserContext } from '@src/common/contexts/user-context';
import { toastContextProps, userContextProps, userProps } from '@src/common/prop-types';
import Api from '@src/api/Api';
import UserInfoTable from './UserInfoTable';

class UserInfoTableContainer extends React.Component {
	static propTypes = {
		toastContext: toastContextProps.isRequired,
		userContext: userContextProps.isRequired,
		user: userProps.isRequired
	};

	constructor() {
		super();
		this.source = Api.source();
	}

	componentWillUnmount() {
		this.source.cancel();
	}

	deleteUser = async id => {
		const {
			toastContext: { openToast },
			userContext: { getUsers }
		} = this.props;

		try {
			await UserService.deleteUser(id, this.source);
			await getUsers();
			openToast('success', 'User successfully deleted.');
		} catch (err) {
			if (!Api.isCancel(err)) {
				openToast('error', 'There was an error deleting the user.');
			}
		}
	};

	render() {
		const { user } = this.props;

		return <UserInfoTable deleteUser={this.deleteUser} user={user} />;
	}
}

export default compose(
	withToastContext,
	withUserContext
)(UserInfoTableContainer);
