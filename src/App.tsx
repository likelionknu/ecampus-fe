import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AdminRoutes from "@admin/AdminRoutes";
// import RequireAuth from "@auth/components/RequireAuth";
import GoogleCallback from "@auth/api/GoogleCallback";
import LoginErrorPage from "@auth/pages/LoginErrorPage";
import LoginPage from "@auth/pages/LoginPage";
import BaseLayout from "@shared/layouts/BaseLayout";
import ErrorPage from "@shared/pages/ErrorPage";
import MaintenancePage from "@shared/pages/MaintenancePage";
import PreparingPage from "@shared/pages/PreparingPage";
import PrivacyPolicyPage from "@shared/pages/PrivacyPolicyPage";
import ScreenSizeErrorPage from "@shared/pages/ScreenSizeErrorPage";
import UserRoutes from "@user/UserRoutes";
import TestPage from "./shared/pages/TestPage";

const router = createBrowserRouter([
  { path: "/", element: <GoogleCallback /> },
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
    path: "/screen-size-error",
    element: <ScreenSizeErrorPage />,
    handle: { title: "화면 크기 에러 페이지" },
  },
  {
    path: "/user",
    element: (
      // <RequireAuth allowedRoles={["USER"]}>
      <BaseLayout />
      // </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      ...UserRoutes,
    ],
  },
  {
    path: "/admin",
    element: (
      // <RequireAuth allowedRoles={["ADMIN"]}>
      <BaseLayout />
      // </RequireAuth>
    ),
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
