import type { RouteObject } from "react-router-dom";
import AdminSessionsPage from "./domains/session/pages/AdminSessionsPage";
import AdminDashBoardPage from "./domains/dashboard/pages/AdminDashBoardPage";
import SessionTabLayout from "@/shared/layouts/SessionTabLayout";
import AdminGroupPage from "./domains/session/pages/AdminGroupPage";

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
    path: "dashboard",
    element: <AdminDashBoardPage />,
    handle: { title: "관리자" },
  },
];

export default adminRoutes;
