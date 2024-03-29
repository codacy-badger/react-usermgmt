import { createMuiTheme } from '@material-ui/core/styles';
import constants from '@src/scss/_constants';

const theme = createMuiTheme({
	typography: {
		fontFamily: constants.primaryfont
	},
	palette: {
		primary: {
			main: constants.blueprimary
		},
		secondary: {
			main: constants.orange
		},
		error: {
			main: constants.red
		}
	}
});

export default theme;
