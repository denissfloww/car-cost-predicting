import { Router } from 'express';
import CarRouter from './car-router';
import PredictRouter from './predict-router';

const router = Router();
router.use(CarRouter);
router.use(PredictRouter);

export default router;
