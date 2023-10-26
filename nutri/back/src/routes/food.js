import express from 'express';
import FoodController from '../controllers/food.js';
import { authorizationMiddleware } from '../middlewares/authorization.js';
import { adminMiddleware } from '../middlewares/admin.js';

export const foodRouter = express.Router();

const foodController = new FoodController();

foodRouter.post('/', adminMiddleware, foodController.createFood);
foodRouter.get('/', authorizationMiddleware, foodController.getAllFoods);
foodRouter.get('/:foodId', authorizationMiddleware, foodController.getFood);
foodRouter.put('/:foodId', adminMiddleware, foodController.editFood);