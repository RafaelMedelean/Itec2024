// src/routes/userRoutes.js
import express from 'express';
import { accoutInfo,allAplications } from '../controllers/dashboardController.js';

const router = express.Router();

router.post('/',accoutInfo);
router.get('/chart',allAplications);

export default router;

// src/controllers/userController.js