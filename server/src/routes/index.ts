import { Router } from "express";
import CarRouter from "./car-router";

const router = Router();
router.use(CarRouter);
export default router;
