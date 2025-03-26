import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layout";
import Page404 from "@/pages/Page404";

import HomeRoutes from "./HomeRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Page404 />,
    children: HomeRoutes,
  },
]);

export default routes;
