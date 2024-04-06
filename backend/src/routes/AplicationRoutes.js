// src/routes/userRoutes.js
import express from 'express';
import { 
    sendAplication,
    getAplication,
    addEndpoint,
    getAplicationall
} from '../controllers/AplicationController.js';

const router = express.Router();

router.post('/sendAplication', sendAplication);
router.get('/getAplication', getAplication);
router.post('/addEndpoint', addEndpoint);
router.get('/getAplicationall', getAplicationall);


export default router;

// src/controllers/userController.js