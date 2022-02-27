import express from 'express';
import UserController from './UserController';
import { UserCreateValidation } from './UserValidations';

const controller = new UserController();

const UserRouter = express.Router();

UserRouter.post('/', UserCreateValidation, controller.create);

export default UserRouter;
