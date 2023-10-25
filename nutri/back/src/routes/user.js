import express from 'express';
import UserController from '../controllers/user.js';
import { authorizationMiddleware } from '../middlewares/authorization.js';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/', userController.createUser);
userRouter.get('/', authorizationMiddleware, userController.getAllUsers);
userRouter.get('/:userId', authorizationMiddleware, userController.getUser);
userRouter.put('/:userId', authorizationMiddleware, userController.editUser);