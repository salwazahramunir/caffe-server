const RoomController = require('../controller/RoomController');

const roomRouter = require('express').Router();

roomRouter.get('/', RoomController.readAllRoom);
roomRouter.post('/', RoomController.createRoom);
roomRouter.get('/:id', RoomController.showRoom);
roomRouter.put('/:id', RoomController.updateRoom);
roomRouter.delete('/:id', RoomController.deleteRoom);

module.exports = roomRouter;