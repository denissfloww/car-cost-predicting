import { Router } from "express";
import {getHistory, getPredictResult} from "../controllers/predict-controller";

const router = Router();

router.get("/predict", getPredictResult);
router.get("/queries", getHistory)

export default router;
