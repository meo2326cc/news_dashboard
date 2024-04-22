import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider , ColorModeScript } from '@chakra-ui/react'
import { HashRouter , Route , Routes } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import theme from '../theme.js'
import Register from './pages/Register.jsx'
import 'material-icons/iconfont/material-icons.css';
import { QueryClientProvider, QueryClient  } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
  <ColorModeScript initialColorMode={theme.config.initialColorMode} />
  <ChakraProvider >
    <HashRouter>
    <Routes> 
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/Register' element={<Register />}></Route>
    </Routes>      
    </HashRouter>
  </ChakraProvider>
  </QueryClientProvider>
  </React.StrictMode>
)
