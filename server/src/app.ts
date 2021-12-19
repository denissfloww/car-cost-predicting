import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import BaseRouter from './routes/index';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', BaseRouter);

export default app;
