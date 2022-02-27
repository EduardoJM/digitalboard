import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import Router from './router';
import swaggerSpec from './swagger';
import errors from './middlewares/Celebrate';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(Router);

app.use(errors());

export default app;
