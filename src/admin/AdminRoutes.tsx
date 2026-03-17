import type { RouteObject } from "react-router-dom";
import AdminSessionsPage from "./domains/management/pages/AdminSessionsPage";
import SessionTabLayout from "@/shared/layouts/SessionTabLayout";
import AdminGroupPage from "./domains/management/pages/AdminGroupPage";
import DataManagementPage from "./domains/session/pages/DataManagementPage";
import TaskManagementPage from "./domains/session/pages/TaskManagementPage";
import AdminQuestionPage from "./domains/management/pages/AdminQuestionPage";
import AdminNotionPage from "./domains/management/pages/AdminNotionPage";

const adminRoutes: RouteObject[] = [
  {
    path: "sessions",
    element: <SessionTabLayout tabType="adminSession" />,
    children: [
      { index: true, element: <AdminSessionsPage /> },
      { path: "group", element: <AdminGroupPage /> },
      { path: "data/management", element: <DataManagementPage /> },
      { path: "task/management", element: <TaskManagementPage /> },
      { path: "question", element: <AdminQuestionPage /> },
      { path: "notion", element: <AdminNotionPage /> },
    ],
  },
];

export default adminRoutes;
