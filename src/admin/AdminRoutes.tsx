import type { RouteObject } from "react-router-dom";
import AdminSessionsPage from "./domains/management/pages/AdminSessionsPage";
import SessionTabLayout from "@/shared/layouts/SessionTabLayout";
import AdminGroupPage from "./domains/management/pages/AdminGroupPage";
import AdminDashboardPage from "./domains/session/pages/AdminDashboardPage";

const adminRoutes: RouteObject[] = [
  {
    element: <SessionTabLayout tabType="adminSession" />,
    children: [
      { path: "sessions", element: <AdminSessionsPage /> },
      { path: "groups", element: <AdminGroupPage /> },
    ],
  },
  {
    path: "sessions",
    element: <SessionTabLayout tabType="adminDashboard" />,
    children: [{ path: "dashboard", element: <AdminDashboardPage /> }],
  },
];

export default adminRoutes;
