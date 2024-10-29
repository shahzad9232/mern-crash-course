import { Container, VStack, Text, Link, SimpleGrid } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom
import React, { useEffect } from "react";
import { useProductStore } from "../Store/products";
import ProductCard from "../Components/ProductCard";

const Home = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("prod", products);

  return (
    <Container maxW="container.xl" py={2}>
      <VStack spacing={8}>
        <Text
          fontSize={"30px"} // Updated to include 'px' for font size
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Product
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <Text
              fontSize={"xl"}
              textAlign={"center"}
              fontWeight={"bold"}
              color={"gray.500"}
            >
              No Product Found
              <Link
                as={RouterLink} // Use RouterLink for navigation
                to="/create"
                fontSize={"20px"} // Set font size for the link
                fontWeight={"medium"}
                color={"blue.500"}
                textAlign={"center"}
                _hover={{ textDecoration: "underline", color: "blue.700" }} // Add hover effects
              >
                Add New Product
              </Link>
            </Text>
          )}
        </SimpleGrid>

        {/* Add New Product Link */}
      </VStack>
    </Container>
  );
};

export default Home;
