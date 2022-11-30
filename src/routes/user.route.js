import { Router } from 'express';
import ApiError from '../utils/ApiError';
import UserService from '../service/user.service';
import UserController from '../controllers/user.ctrl';

const apiError = new ApiError();
const userService = new UserService(apiError);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.post('/users/register', userController.register);

export { userRouter };
