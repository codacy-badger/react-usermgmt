import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import theme from '@src/theme/default';
import AppContainer from './components/app';
import './scss/style';

const Main = () => (
	<ThemeProvider theme={theme}>
		<Router basename="/">
			<AppContainer />
		</Router>
	</ThemeProvider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
