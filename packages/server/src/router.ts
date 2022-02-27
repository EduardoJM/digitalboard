import express from 'express';
import UserRouter from './modules/user/UserRouter';

const Router = express.Router();
Router.use('/users', UserRouter);

export default Router;
