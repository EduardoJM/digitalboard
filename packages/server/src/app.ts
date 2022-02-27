import express from 'express';
import cors from 'cors';
import Router from './router';
import errors from './middlewares/Celebrate';

const app = express();

app.use(express.json());
app.use(cors());

app.use(Router);

app.use(errors());

export default app;
