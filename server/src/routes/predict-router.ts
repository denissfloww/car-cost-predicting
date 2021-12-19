import { Router } from 'express';
import {
    getAverageBrandPricePerDay,
    getHistoryPerDay,
    getPredictResult,
    getQueriesCountForAllTime,
} from '../controllers/predict-controller';

const router = Router();

router.get('/predict', getPredictResult);
router.get('/queries', getHistoryPerDay);
router.get('/queries/all/count', getQueriesCountForAllTime);
router.get('/queries/statistics/average/brand', getAverageBrandPricePerDay);

export default router;
