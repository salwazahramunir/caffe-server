const MenuController = require('../controller/MenuController');

const menuRouter = require('express').Router();

menuRouter.get('/', MenuController.readAllMenu);
menuRouter.post('/', MenuController.createMenu);
menuRouter.get('/:id', MenuController.showMenu);
menuRouter.put('/:id', MenuController.updateMenu);
menuRouter.delete('/:id', MenuController.deleteMenu);

module.exports = menuRouter;