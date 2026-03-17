import type { RouteObject } from "react-router-dom";
import AdminSessionsPage from "./domains/management/pages/AdminSessionsPage";
import SessionTabLayout from "@/shared/layouts/SessionTabLayout";
import AdminGroupPage from "./domains/management/pages/AdminGroupPage";

const adminRoutes: RouteObject[] = [
  {
    path: "sessions",
    element: <SessionTabLayout tabType="adminSession" />,
    children: [
      { index: true, element: <AdminSessionsPage /> },
      { path: "group", element: <AdminGroupPage /> },
    ],
  },
  {
    path: "/sessions/dashboard",
    element: <SessionTabLayout tabType="adminDashboard" />,
  },
];

export default adminRoutes;
