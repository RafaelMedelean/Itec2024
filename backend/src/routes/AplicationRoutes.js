// src/routes/userRoutes.js
import express from 'express';
import { 
    sendAplication,
    getAplication,
    addEndpoint
} from '../controllers/AplicationController.js';

const router = express.Router();

router.post('/sendAplication', sendAplication);
router.get('/getAplication', getAplication);
router.get('/addEndpoint', addEndpoint);

export default router;

// src/controllers/userController.js