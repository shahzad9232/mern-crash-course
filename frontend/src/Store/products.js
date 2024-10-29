import { create } from "zustand";
import { apiRequest } from "../APIs/apiHandler"; // Adjust the import path as necessary

export const useProductStore = create((set) => ({
  products: [],

  // Function to set products
  setProducts: (products) => set(() => ({ products })),

  // Function to create a new product
  createProduct: async (newProduct) => {
    // Validate input
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all fields" };
    }

    try {
      const endpoint = "http://localhost:5000/api/products/createProduct"; // Updated endpoint
      const response = await apiRequest(endpoint, "POST", newProduct);

      // Assuming response contains the created product data
      set((state) => ({ products: [...state.products, response] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Failed to create product:", error);
      return { success: false, message: "Failed to create product" };
    }
  },

  // Function to fetch all products
  fetchProducts: async () => {
    const endpoint = "http://localhost:5000/api/products/getAllProducts"; // Updated endpoint
    try {
      const response = await apiRequest(endpoint, "GET");
      console.log("Data:", response);
      set({ products: response });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  // Function to fetch a product by ID
  fetchProductById: async (id) => {
    const endpoint = `http://localhost:5000/api/products/getProductById/${id}`; // Updated endpoint
    try {
      const response = await apiRequest(endpoint, "GET");
      return response; // Assuming response contains the product data
    } catch (error) {
      console.error("Failed to fetch product:", error);
      return null;
    }
  },

  // Function to update a product by ID
  updateProduct: async (id, updatedProduct) => {
    const endpoint = `http://localhost:5000/api/products/updateProduct/${id}`;
    try {
      const response = await apiRequest(endpoint, "PUT", updatedProduct);
  
      // Log to confirm the response structure
      console.log("Res", response);
  
      // Update the product list in the state with only the updated product data
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? response.product : product 
        ),
      }));
  
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Failed to update product:", error);
      return { success: false, message: "Failed to update product" };
    }
  },
  

  // Function to delete a product by ID
  deleteProduct: async (id) => {
    const endpoint = `http://localhost:5000/api/products/deleteProduct/${id}`; // Updated endpoint
    try {
      await apiRequest(endpoint, "DELETE");

      // Remove the product from the state
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Failed to delete product:", error);
      return { success: false, message: "Failed to delete product" };
    }
  },
}));
