import express from 'express';
import { signupUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// Define user routes
router.post('/signup', signupUser); // Signup
router.post('/login', loginUser);    // Login

export default router;
