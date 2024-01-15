import App from './App.jsx'
import Products from './components/products.jsx';
import Storefront from './components/storefront.jsx';
import Cart from './components/cart.jsx';
import ErrorPage from './error-page.jsx';
import { createBrowserRouter } from 'react-router-dom';
import ProductDetails from './components/ProductDetails.jsx';

const routesConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "products/:id", element: <ProductDetails /> },
      { path: "/", element: <Storefront /> },
      { path: "storefront", element: <Storefront /> },
      { path: "products", element: <Products /> },
      { path: "cart", element: <Cart /> },
    ]
  },
]

const routes = createBrowserRouter(routesConfig)

export { routes, routesConfig }