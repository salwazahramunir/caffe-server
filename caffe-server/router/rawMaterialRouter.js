const RawMaterialController = require('../controller/RawMaterialController');

const rawMaterialRouter = require('express').Router();

rawMaterialRouter.get('/', RawMaterialController.readAllRawMaterial);
rawMaterialRouter.post('/', RawMaterialController.createRawMaterial);
rawMaterialRouter.get('/:id', RawMaterialController.showRawMaterial);

module.exports = rawMaterialRouter;