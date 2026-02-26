import type { RouteObject } from "react-router-dom";
import AdminSessionsPage from "./domains/session/pages/AdminSessionsPage";
import AdminDashBoardPage from "./domains/dashboard/pages/AdminDashBoardPage";

const adminRoutes: RouteObject[] = [
  {
    path: "sessions",
    element: <AdminSessionsPage />,
    handle: { title: "관리자" },
  },
  {
    path: "dashboard",
    element: <AdminDashBoardPage />,
    handle: { title: "관리자" },
  },
];

export default adminRoutes;
