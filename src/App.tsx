import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AdminRoutes } from "@admin";
import { GoogleCallback } from "@auth/api";
import { LoginErrorPage, LoginPage } from "@auth/pages";
import { BaseLayout } from "@shared/layouts";
import { ErrorPage, MaintenancePage, PreparingPage, PrivacyPolicyPage, ScreenSizeErrorPage } from "@shared/pages";
import { UserRoutes } from "@user";
import { TestPage } from "./shared/pages";
import { RequireAuth } from "./auth/components";

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
    element: <BaseLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      ...UserRoutes,
    ],
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <BaseLayout />
      </RequireAuth>
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
