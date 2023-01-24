import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration";
import Category from "../Pages/Category";
import Checkout from "../Pages/Checkout/Checkout";
import Home from "../Pages/Home";
import Product from "../Pages/Product";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/register",
      element: <Registration />,
    },
    {
      path: "/product/details/:productId",
      element: <Product />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "products/:category",
      element: <Category />
    }
  ]);