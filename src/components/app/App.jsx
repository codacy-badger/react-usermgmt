import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { ModalProvider } from '@common/contexts/modal-context';
import { ToastProvider } from '@common/contexts/toast-context';
import Modal from '@shared/modal';
import Toast from '@shared/toast';
import Header from '@components/header';
import Footer from '@components/footer';
import Missing from '@components/missing';
import routes from '@routes/app-routes';
import './App.scss';

const propTypes = {
	error: PropTypes.bool.isRequired
};

const App = ({ error }) =>
	!error ? (
		<ModalProvider>
			<ToastProvider>
				<Header />
				<Container maxWidth="xl" classes={{ maxWidthXl: 'main-content' }}>
					<Switch>
						{routes.map(route => (
							<Route exact key={route.path} {...route} />
						))}
						<Route component={Missing} />
					</Switch>
				</Container>
				<Footer />
				<Modal />
				<Toast />
			</ToastProvider>
		</ModalProvider>
	) : (
		<p className="error-message">
			There was an unfortunate error and we were unable to retrieve the users. Luckily
			this is merely a demo app, and this would &apos;never&apos; happen in a real work
			situation.
		</p>
	);

App.propTypes = propTypes;

export default App;
