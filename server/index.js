const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const chalk = require('chalk');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.port || 8080;
const isDevelopment = process.argv.indexOf('--env=dev') !== -1;

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.use(history());

if (isDevelopment) {
	const { devMiddleware, hotMiddleware } = require('./middleware/dev-middleware');
	app.use(devMiddleware);
	app.use(hotMiddleware);
} else {
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
	});
}

app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => {
	console.log(chalk.cyan(`Server booted up on port ${port}.`));
});
