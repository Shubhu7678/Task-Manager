import express from 'express';
const router = express.Router();

import { signup, login,sendOtp } from '../controllers/auth.js';
import { auth } from '../middlewares/auth.js';

router.post('/sendOtp', sendOtp);
router.post('/signup', signup);
router.post('/login', login);

export default router;