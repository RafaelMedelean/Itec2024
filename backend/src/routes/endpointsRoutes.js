// src/routes/userRoutes.js
import express from 'express';
import { SendEndPoints,GetEndPoints } from '../controllers/endPointsController.js';

const router = express.Router();

router.post('/sendData', SendEndPoints);
router.get('/getData', GetEndPoints);

export default router;

// src/controllers/userController.js