import express from 'express';
const router = express.Router();

import { signup, login,sendOtp,sendUrlForPasswordReset,resetPassword } from '../controllers/auth.js';
import { auth } from '../middlewares/auth.js';

router.post('/sendOtp', sendOtp);
router.post('/signup', signup);
router.post('/login', login);
router.post('/sendUrlForPasswordReset', sendUrlForPasswordReset);
router.put('/resetPassword/:userId',resetPassword)

export default router;