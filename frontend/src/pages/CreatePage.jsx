import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, Text, Image, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../Store/products';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const CreatePage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const [errors, setErrors] = useState({});
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast.success(message);
      setNewProduct({ name: '', price: '', image: '' });
      navigate('/');
    } else {
      console.error("Error creating product:", message);
      toast.error(`Error: ${message}`);
    }
  };

  const validateInputs = () => {
    let errors = {};
  
    // Validate Product Name
    if (!newProduct.name) {
      errors.name = "Product name is required";
    } else if (newProduct.name.length < 3) {
      errors.name = "Product name must be at least 3 characters long";
    }
  
    // Validate Price
    if (!newProduct.price) {
      errors.price = "Price is required";
    } else if (isNaN(newProduct.price) || newProduct.price.trim() === '') {
      errors.price = "Price must be a valid number"; // Invalid numeric input
    } else if (newProduct.price.includes('e')) {
      errors.price = "Scientific notation is not allowed"; // Disallow scientific notation
    } else if (Number(newProduct.price) <= 0) {
      errors.price = "Price must be greater than zero"; // Ensure price is positive
    }
  
    // Validate Image URL
    if (!newProduct.image) {
      errors.image = "Image URL is required";
    } else if (!/^https?:\/\//i.test(newProduct.image)) {
      errors.image = "Image URL must start with http:// or https://"; // Basic URL validation
    }
  
    setErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if there are no errors
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    setErrors({ ...errors, [name]: "" });
    // setNewProduct({ images: "", price:"", name:""})
  };

  return (
    <Container maxW={"container.md"} mt={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create a New Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue('white', 'gray.800')}
          p={8}
          rounded="lg"
          shadow="lg"
          border="1px solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          transition="all 0.3s"
          _hover={{ transform: 'scale(1.02)', shadow: 'xl' }}
        >
          <VStack spacing={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Product Name</FormLabel>
              <Input
                placeholder="Enter product name"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _hover={{ borderColor: 'blue.500' }}
                _focus={{ borderColor: 'blue.500' }}
              />
              {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.price}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Enter price"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _hover={{ borderColor: 'blue.500' }}
                _focus={{ borderColor: 'blue.500' }}
              />
              {errors.price && <FormErrorMessage>{errors.price}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.image}>
              <FormLabel>Image URL</FormLabel>
              <Input
                placeholder="Enter image URL"
                name="image"
                value={newProduct.image}
                onChange={handleChange}
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _hover={{ borderColor: 'blue.500' }}
                _focus={{ borderColor: 'blue.500' }}
              />
              {errors.image && <FormErrorMessage>{errors.image}</FormErrorMessage>}
            </FormControl>

            {newProduct.image && (
              <Box w="full" textAlign="center" mt={4}>
                <Text fontSize="md" fontWeight="semibold" mb={2}>
                  Image Preview:
                </Text>
                <Image
                  src={newProduct.image}
                  alt="Product Preview"
                  boxSize="150px"
                  objectFit="cover"
                  borderRadius="lg"
                  shadow="md"
                  mx="auto"
                />
              </Box>
            )}

            <Button
              colorScheme="blue"
              onClick={() => {
                if (validateInputs()) handleAddProduct();
              }}
              w="full"
              size="lg"
              shadow="lg"
              transition="all 0.3s"
              _hover={{ bg: 'blue.600', transform: 'scale(1.02)' }}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
