// routes/index.js
import express from 'express';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);  // Make sure to use '/users' for user routes
router.use('/products', productRoutes); // Make sure to use '/products' for product routes

export default router;
