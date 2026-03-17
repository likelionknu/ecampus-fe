import type { RouteObject } from "react-router-dom";
import AdminSessionsPage from "./domains/management/pages/AdminSessionsPage";
import SessionTabLayout from "@/shared/layouts/SessionTabLayout";
import AdminGroupPage from "./domains/management/pages/AdminGroupPage";
import AdminDashboardPage from "./domains/session/pages/AdminDashboardPage";
import AdminSessionAssignmentsView from "./domains/session/pages/AdminSessionAssignmentsView";
import AdminSessionAssignmentUpload from "./domains/session/pages/AdminSessionAssignmentUpload";

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
    handle: { title: "세션 관리 / [14기] 아기사자 - 백엔드 파트" },
    children: [
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "assignments", element: <AdminSessionAssignmentsView /> },
      { path: "assignments/upload", element: <AdminSessionAssignmentUpload /> },
    ],
  },
];

export default adminRoutes;
