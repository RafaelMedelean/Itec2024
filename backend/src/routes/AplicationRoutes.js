// src/routes/userRoutes.js
import express from 'express';
import {
    addEndpoint,
    getAplication,
    getAplicationall,
    sendAplication,
    getAplicationallNoLogin,
    sendBugReport
} from '../controllers/AplicationController.js';

const router = express.Router();

router.post('/sendAplication', sendAplication);
router.get('/getAplication', getAplication);
router.post('/addEndpoint', addEndpoint);
router.get('/getAplicationall', getAplicationall);
router.get('/getAplicationallNoLogin', getAplicationallNoLogin);
router.post('/sendBugReport', sendBugReport);


export default router;

// src/controllers/userController.js