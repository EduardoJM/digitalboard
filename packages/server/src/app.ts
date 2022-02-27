import express from 'express';
import cors from 'cors';
import Router from './router';

const app = express();

app.use(express.json());
app.use(cors());

app.use(Router);

export default app;
