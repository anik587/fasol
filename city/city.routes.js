import {Router} from 'express';

import * as controllers from './city.controllers.js';
import {cityCreate, cityUpdate} from '../middleware/index.js';

const router = Router();

router.get('/',  controllers.fetchAllCities);
router.post('/',  cityCreate, controllers.saveCity);
router.patch('/:uuid', cityUpdate, controllers.updateCity);

export default router;