import express from 'express';
import UserController from './UserController';
import { UserCreateValidation, UserLoginValidation } from './UserValidations';

const controller = new UserController();

const UserRouter = express.Router();

UserRouter.post('/', UserCreateValidation, controller.create);
/**
 * @openapi
 * /users/auth:
 *  post:
 *      description: authenticate user using json web token.
 *      responses:
 *          200:
 *              description: Returns the user data and the authentication json web token.
 */
UserRouter.post('/auth', UserLoginValidation, controller.auth);

export default UserRouter;
