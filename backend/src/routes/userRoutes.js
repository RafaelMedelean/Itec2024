// src/routes/userRoutes.js
import express from 'express';
import passport from 'passport';
import { loginUser, signupUser,logoutUser,currentUser,bugList,solveBug } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/current', currentUser);
router.get('/bugList',bugList);
router.post('/solve/:bugId',solveBug);

export default router;

// src/controllers/userController.js