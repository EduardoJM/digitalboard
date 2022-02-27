import express from 'express';
import UserController from './UserController';
import { UserCreateValidation, UserLoginValidation } from './UserValidations';

const controller = new UserController();

const UserRouter = express.Router();

UserRouter.post('/', UserCreateValidation, controller.create);
UserRouter.post('/auth', UserLoginValidation, controller.auth);

export default UserRouter;
