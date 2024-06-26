import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Profile from './pages/profile';
import Catalog from './pages/catalog';
import Product from './pages/product';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/signin',
    element:<Signin/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/catalog',
    element:<Catalog/>
  },
  {
    path:'/product/productId',
    element:<Product/>
  }
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
