import React, { useState } from 'react';
import {
  Box,
  HStack,
  IconButton,
  useColorModeValue,
  Image,
  Heading,
  Text,
  useDisclosure,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../Store/products';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');
  const { deleteProduct, updateProduct  } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State for updating product
  const [updateProducts, setupdateProducts] = useState({
    name: product.name,
    price: product.price,
    url: product.url,
  });

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    toast({
      title: success ? 'Product Deleted.' : 'Error.',
      description: success
        ? 'The product has been successfully deleted.'
        : message || 'Failed to delete the product.',
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdate = async (pid, updateProducts) => {
  const {success, message}=  await updateProduct(pid, updateProducts)
    onClose(); 
    if(!success){
      toast({
        title: 'Error',
        description: message || 'Failed to update the product.',
        status: 'error',
        duration: 3000,
        isClosable:  true,

      })
    }
    else{
      toast({
        title:  'Product Updated',
        description: 'The product has been successfully updated.',
        duration: 3000,
        isClosable: true,
        status: "success"
      })
    }
  };

  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontSize="lg" fontWeight="bold" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme="blue"
            aria-label="Edit Product"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(product._id)}
            colorScheme="red"
            aria-label="Delete Product"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updateProducts.name}
                  onChange={(e) =>
                    setupdateProducts((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />

                <Input
                  placeholder="Product Price"
                  name="price"
                  type="number"
                  value={updateProducts.price}
                  onChange={(e) =>
                    setupdateProducts((prev) => ({
                      ...prev,
                      price: parseFloat(e.target.value) || 0, // Ensure a number
                    }))
                  }
                />

                <Input
                  placeholder="Product URL"
                  name="url"
                  value={updateProducts.url}
                  onChange={(e) =>
                    setupdateProducts((prev) => ({
                      ...prev,
                      url: e.target.value,
                    }))
                  }
                />

                <Flex justifyContent="flex-end" width="full" spacing={4}>
                  <Button colorScheme="blue" onClick={()=> handleUpdate(product._id, updateProducts)}>
                    Update
                  </Button>
                  <Button onClick={onClose} colorScheme="gray">
                    Cancel
                  </Button>
                </Flex>
              </VStack>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};

export default ProductCard;
