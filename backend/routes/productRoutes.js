import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Define routes for products with descriptive paths
router.post('/createProduct', createProduct); // Create a new product
router.get('/getAllProducts', getAllProducts); // Get all products
router.get('/getProductById/:id', getProductById); // Get product by ID
router.put('/updateProduct/:id', updateProduct); // Update product
router.delete('/deleteProduct/:id', deleteProduct); // Delete product

export default router;
