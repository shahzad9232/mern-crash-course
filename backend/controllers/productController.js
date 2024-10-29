import Product from '../models/product.model.js';

// CREATE Product
export const createProduct = async (req, res) => {
  console.log('Received request to create product:', req.body); 
  try {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ error: 'Product already exists.' });
    }

    const createdProduct = await Product.create({ name, price, image });
    res.status(201).json({ message: 'Product created successfully.', product: createdProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ Single Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    console.log("rrq", req.body)

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product updated successfully.', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE Product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
