import { Router } from 'express';
import { getBrands, getFuelTypes, getModels, getTransmissions } from '../controllers/car-controller';

const router = Router();

router.get('/brands', getBrands);
router.get('/models', getModels);
router.get('/transmissions', getTransmissions);
router.get('/fuelTypes', getFuelTypes);

export default router;
