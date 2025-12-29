import { StrictMode, useContext } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from './App.jsx'
import { CartContext, CartProvider } from './Context/CartContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <CartProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </CartProvider>
   </AuthProvider> 
  </StrictMode>
)
