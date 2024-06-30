import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Profile from './pages/profile';
import Catalog from './pages/catalog';
import { Provider } from 'react-redux';
import store from './store';
import Product from './pages/product';
import OrderConfirm from './pages/order-confirm';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    children:[
      {
        path:'/profile',
        element:<Profile/>
      },
      {
        path:'/catalog',
        element:<Catalog/>
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
        path:'/product/:productSlug',
        element:<Product/>
      },
      {
        path:'/order-confirm/:id',
        element:<OrderConfirm/>
      }
    ]
  }
])



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
