import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const LoadingIndicator = () => {
	const styles = makeStyles(() => ({
		progress: {
			marginLeft: 'calc(50% - 1.25rem)',
			marginTop: '3.125rem'
		}
	}))();

	return <CircularProgress className={styles.progress} color="secondary" />;
};

export default LoadingIndicator;
