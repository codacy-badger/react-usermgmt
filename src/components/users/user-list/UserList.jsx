import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ContentContainer from '@shared/page-layout/content-container';
import SectionHeader from '@shared/page-layout/section-header';
import { userContextProps } from '@src/common/prop-types';
import { withUserContext } from '@src/common/contexts/user-context';
import UserInfoTableContainer from './user-info-table';
import UserListTable from './user-list-table';
import './UserList.scss';

class UserList extends React.Component {
	static propTypes = {
		userContext: userContextProps.isRequired
	};

	constructor() {
		super();

		this.state = {
			isAdminView: false
		};
	}

	toggleView = () => {
		this.setState(prevState => ({ isAdminView: !prevState.isAdminView }));
	};

	render() {
		const { isAdminView } = this.state;
		const {
			userContext: { users }
		} = this.props;

		const numUsers = users.length;

		const entries =
			numUsers > 0 ? (
				users.map((user, index) => (
					<Fragment key={user.id}>
						<UserInfoTableContainer user={user} />
						{index !== users.indexOf(users[users.length - 1]) && (
							<hr className="gray-rule" />
						)}
					</Fragment>
				))
			) : (
				<p>
					Let&apos;s get things started: <Link to="/new-user">click here</Link> to create
					a user.
				</p>
			);

		return (
			<ContentContainer className="user-list">
				<SectionHeader
					title="Current Users"
					subtext={`${numUsers} user${numUsers !== 1 ? 's' : ''} found.`}
				/>
				<FormGroup classes={{ root: 'form-group' }}>
					<FormControlLabel
						classes={{ root: 'form-control-label' }}
						control={
							<Switch
								checked={isAdminView}
								onChange={this.toggleView}
								value="view"
								color="secondary"
							/>
						}
						label={`Admin mode ${isAdminView ? 'enabled' : 'disabled'}.`}
					/>
				</FormGroup>
				{isAdminView ? entries : <UserListTable users={users} />}
			</ContentContainer>
		);
	}
}

export default withUserContext(UserList);
