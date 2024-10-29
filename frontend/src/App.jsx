import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage"; // Updated import
import Navbar from "./Components/Navbar";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import default styles

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} /> {/* No change here */}
      </Routes>
      <ToastContainer /> {/* Add ToastContainer here */}
    </Box>
  );
}

export default App;
