const userRouter = require('express').Router();
const UserController = require('../controller/UserController');

userRouter.get('/', UserController.readAllUser);
userRouter.post('/', UserController.createUser);
userRouter.get('/show-profile', UserController.profileUser);
userRouter.get('/:id', UserController.showUser);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);


module.exports = userRouter;