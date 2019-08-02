import UserList from '@components/users/user-list';
import dynamicImport from '@shared/dynamic-import';

const routes = [
	{
		path: '/',
		component: UserList
	},
	{
		path: '/new-user',
		component: dynamicImport(() =>
			import(/* webpackChunkName: "newuser" */ '@components/users/new-user')
		)
	}
];

export default routes;
