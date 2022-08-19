const LogRawMaterialController = require('../controller/LogRawMaterialController');

const logRawMaterialRouter = require('express').Router();

logRawMaterialRouter.get('/', LogRawMaterialController.readAllLogRawMaterial);

module.exports = logRawMaterialRouter;