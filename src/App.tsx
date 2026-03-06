import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AdminRoutes from "@admin/AdminRoutes";
import LoginErrorPage from "@auth/pages/LoginErrorPage";
import LoginLoadingPage from "@auth/pages/LoginLoadingPage";
import LoginPage from "@auth/pages/LoginPage";
import BaseLayout from "@shared/layouts/BaseLayout";
import ErrorPage from "@shared/pages/ErrorPage";
import MaintenancePage from "@shared/pages/MaintenancePage";
import PreparingPage from "@shared/pages/PreparingPage";
import PrivacyPolicyPage from "@shared/pages/PrivacyPolicyPage";
import UserRoutes from "@user/UserRoutes";
import TestPage from "./shared/pages/TestPage";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
    handle: { title: "Login" },
  },
  {
    path: "/auth/login-error",
    element: <LoginErrorPage />,
    handle: { title: "Login Error" },
  },
  {
    path: "/auth/login-loading",
    element: <LoginLoadingPage />,
    handle: { title: "Login Loading" },
  },
  {
    path: "/preparing",
    element: <PreparingPage />,
    handle: { title: "Preparing" },
  },
  {
    path: "/maintenance",
    element: <MaintenancePage />,
    handle: { title: "Maintenance" },
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
    handle: { title: "Privacy Policy" },
  },
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
