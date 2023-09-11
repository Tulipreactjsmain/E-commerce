import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "../component";
import {
  Collections,
  Home,
  ProductDetail,
  Bag,
  Checkout,
  Account,
  Orders,
} from "../pages";
import Categories from "../pages/Categories";

export default function Routespath() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/collections",
          element: <Collections />,
          children: [
            {
              path: ":collectionName",
              element: <Categories />,
            },
            {
              path: ":collectionName/:slug",
              element: <ProductDetail />,
            },
          ],
        },
        {
          path: "bag",
          element: <Bag />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "account",
          element: <Account />,
          children: [
            {
              path: ":username/orders",
              element: <Orders />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
