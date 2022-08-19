const TransactionController = require('../controller/TransactionController');

const transactionRouter = require('express').Router();

transactionRouter.get('/', TransactionController.readlAllTransaction);
transactionRouter.post('/', TransactionController.createTransaction);

module.exports = transactionRouter;