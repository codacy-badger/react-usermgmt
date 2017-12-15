const express = require('express');
const app = express();
const path = require('path');
const apiRoutes = require('./routes/api');

global.__dirname = __dirname;

app.get('*/app.min.js', (req, res, next) => {
    req.url = `${req.url}.gz`;
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.get(['/', '/add'], (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(3000, () => {
    console.log('react-usermgmt booted up on port 3000');
});