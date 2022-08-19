const kitchenStoreRouter = require('express').Router()
const KitchenStoreController = require('../controller/KitchenStoreController')

kitchenStoreRouter.get('/', KitchenStoreController.readAllKitchenStore);
kitchenStoreRouter.post('/', KitchenStoreController.createKitchenStore);
kitchenStoreRouter.get('/:id', KitchenStoreController.showKitchenStore);
kitchenStoreRouter.put('/:id', KitchenStoreController.updateKitchenStore);
kitchenStoreRouter.delete('/:id', KitchenStoreController.deleteKitchenStore);

module.exports = kitchenStoreRouter;