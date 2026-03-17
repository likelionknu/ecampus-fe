import type { RouteObject } from "react-router-dom";
import AdminSessionsPage from "./domains/management/pages/AdminSessionsPage";
import SessionTabLayout from "@/shared/layouts/SessionTabLayout";
import AdminGroupPage from "./domains/management/pages/AdminGroupPage";
import FilesUploadPage from "./domains/session/pages/FilesUploadPage";
import FilesViewPage from "./domains/session/pages/FilesViewPage";
import FilesModifyPage from "./domains/session/pages/FilesModifyPage";
import NoticeUploadPage from "./domains/management/pages/NoticeUploadPage";
import NoticeViewPage from "./domains/management/pages/NoticeViewPage";
import NoticeModifyPage from "./domains/management/pages/NoticeModifyPage";
import AdminDashboardPage from "./domains/session/pages/AdminDashboardPage";

const adminRoutes: RouteObject[] = [
  {
    element: <SessionTabLayout tabType="adminSession" />,
    children: [
      { path: "sessions", element: <AdminSessionsPage /> },
      { path: "groups", element: <AdminGroupPage /> },
      { path: "notices/upload", element: <NoticeUploadPage /> },
      { path: "notices/view", element: <NoticeViewPage /> },
      { path: "notices/modify", element: <NoticeModifyPage /> },
    ],
  },
  {
    path: "sessions",
    element: <SessionTabLayout tabType="adminDashboard" />,
    children: [
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "files/upload", element: <FilesUploadPage /> },
      { path: "files/view", element: <FilesViewPage /> },
      { path: "files/modify", element: <FilesModifyPage /> },
    ],
  },
];

export default adminRoutes;
