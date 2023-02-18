import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import Builder from './components/Builder';

function App() {
  return (
    <ChakraProvider>
      <Builder />
    </ChakraProvider>
  );
}

export default App;
