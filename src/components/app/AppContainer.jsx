import React from 'react';
import { hot } from 'react-hot-loader/root';
import UserService from '@src/services/user-service';
import { UserContext } from '@src/common/contexts/user-context';
import Api from '@src/api/Api';
import App from './App';

class AppContainer extends React.Component {
	constructor() {
		super();

		this.source = Api.source();

		this.state = {
			users: [],
			error: false
		};
	}

	async componentDidMount() {
		await this.getUsers();
	}

	componentWillUnmount() {
		this.source.cancel();
	}

	getUsers = async () => {
		try {
			const result = await UserService.getUsers(this.source);
			const { users } = result.data;
			this.setState({ error: false, users });
		} catch (err) {
			if (!Api.isCancel(err)) {
				this.setState({ error: true });
			}
		}
	};

	render() {
		const { users, error } = this.state;

		return (
			<UserContext.Provider
				value={{
					users,
					getUsers: this.getUsers
				}}
			>
				<App error={error} />
			</UserContext.Provider>
		);
	}
}

export default hot(AppContainer);
