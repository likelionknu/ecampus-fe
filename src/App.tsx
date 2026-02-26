import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AdminRoutes from "@admin/AdminRoutes";
import BaseLayout from "@shared/layouts/BaseLayout";
import ErrorPage from "@shared/pages/ErrorPage";
import UserRoutes from "@user/UserRoutes";

const router = createBrowserRouter([
  {
    path: "/user",
    element: <BaseLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      ...UserRoutes,
    ],
  },
  {
    path: "/admin",
    element: <BaseLayout />,
    children: [
      { index: true, element: <Navigate to="sessions" replace /> },
      ...AdminRoutes,
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
    handle: { title: "Not Found" },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
