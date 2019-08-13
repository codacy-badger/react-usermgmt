import dynamicImport from '@shared/dynamic-import';
import UserList from '@src/components/users/user-list';

const routes = [
	{
		path: '/',
		component: UserList
	},
	{
		path: '/new-user',
		component: dynamicImport(() =>
			import(/* webpackChunkName: "newuser" */ '@src/components/users/new-user')
		)
	}
];

export default routes;
