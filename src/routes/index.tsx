import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import ProductDetail from "../pages/Product/ProductDetail";
import Lab from "../pages/Lab/Lab";
import MakeJelly from "../pages/Lab/MakeJelly";
import Contest from "../pages/Contest/Contest";
import WinnerProduct from "../pages/Contest/WinnerProduct";
import About from "../pages/About/About";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import MyPage from "../pages/MyPage/MyPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "product", element: <Product /> },
        { path: "product/:id", element: <ProductDetail /> },
        { path: "lab", element: <Lab /> },
        { path: "lab/make", element: <MakeJelly /> },
        { path: "contest", element: <Contest /> },
        { path: "contest/winner", element: <WinnerProduct /> },
        { path: "about", element: <About /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "mypage", element: <MyPage /> },
        { path: "admin", element: <AdminDashboard /> },
      ],
    },
  ],
  {
    basename: "/haribo",
  }
);


