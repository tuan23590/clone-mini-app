import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./pages/Home";
import CategoryListPage from "./pages/catalog";
import CartPage from "./pages/cart";
import ProfilePage from "./pages/profile";
import SearchPage from "./pages/search";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        handle: {
          logo: true,
        },
      },
      {
        path: "/categories",
        element: <CategoryListPage />,
        handle: {
          title: "Danh mục sản phẩm",
          back: false,
        },
      },
      {
        path: "/cart",
        element: <CartPage />,
        handle: {
          title: "Giỏ hàng",
        },
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        handle: {
          logo: true,
        },
      },
      {
        path: "/search",
        element: <SearchPage />,
        handle: {
          title: "Tìm kiếm",
        },
      },
    ],
  },
]);
export default router;
