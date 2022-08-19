const AuthController = require('../controller/AuthController');

const authRouter = require('express').Router();

authRouter.post('/login', AuthController.login);

module.exports = authRouter;