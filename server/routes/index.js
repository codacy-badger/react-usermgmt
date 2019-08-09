const express = require('express');
const UserService = require('./services/UserService');

const router = express.Router();
const userService = new UserService();

router.get('/users', (req, res) => userService.getUsers(req, res));
router.get('/users/:id', (req, res) => userService.getUser(req, res));
router.post('/users', (req, res) => userService.setUsers(req, res));
router.put('/users/:id', (req, res) => userService.updateUser(req, res));
router.delete('/users/:id', (req, res) => userService.deleteUser(req, res));

module.exports = router;
