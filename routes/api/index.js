const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');

router.get('/users', (req, res) => {
    const file = `${global.__dirname}/public/data/userData.json`;
    jsonfile.readFile(file, (err, obj) => {
        if (!err) res.send(obj);
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

router.post('/users', (req, res) => {
    const file = `${global.__dirname}/public/data/userData.json`;
    jsonfile.writeFile(file, req.body.robots, err => {
        if (!err) res.sendStatus(200);
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

module.exports = router;