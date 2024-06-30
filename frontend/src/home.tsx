import React from 'react';
import Navbar from './components/nav-bar';
import ProductCatalog from './components/product-catalog';
import { Outlet, Route, Routes } from 'react-router-dom';
import Profile from './pages/profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CategoryCatalog from './components/category-catalog';

function Home() {
  const queryClient = new QueryClient()
  return (
    <div className="flex flex-col items-center justify-center">
      <QueryClientProvider client={queryClient}>
        <Navbar/>
        <Routes>
          <Route path='/' element=<CategoryCatalog/> />
        </Routes>
        <Outlet/>
      </QueryClientProvider>
    </div>
  );
}


export default Home;
