import type { RouteObject } from "react-router-dom";
import AdminSessionsPage from "./domains/management/pages/AdminSessionsPage";
import PreparingPage from "@shared/pages/PreparingPage";
import SessionTabLayout from "@/shared/layouts/SessionTabLayout";
import AdminGroupPage from "./domains/management/pages/AdminGroupPage";
import DataManagementPage from "./domains/session/pages/DataManagementPage";
import TaskManagementPage from "./domains/session/pages/TaskManagementPage";
import AdminQuestionPage from "./domains/management/pages/AdminQuestionPage";
import AdminNotionPage from "./domains/management/pages/AdminNotionPage";
import AdminQuestionManageView from "./domains/question/pages/AdminQuestionManageView";
import AdminQuestionView from "./domains/question/pages/AdminQuestionView";
import FilesUploadPage from "./domains/session/pages/FilesUploadPage";
import FilesViewPage from "./domains/session/pages/FilesViewPage";
import FilesModifyPage from "./domains/session/pages/FilesModifyPage";
import NoticeUploadPage from "./domains/management/pages/NoticeUploadPage";
import NoticeViewPage from "./domains/management/pages/NoticeViewPage";
import NoticeModifyPage from "./domains/management/pages/NoticeModifyPage";
import AdminDashboardPage from "./domains/session/pages/AdminDashboardPage";
import AdminSessionAssignmentsView from "./domains/session/pages/AdminSessionAssignmentsView";
import AdminSessionAssignmentUpload from "./domains/session/pages/AdminSessionAssignmentUpload";

const adminRoutes: RouteObject[] = [
  {
    element: <SessionTabLayout tabType="adminManagement" />,
    children: [
      { path: "sessions", element: <AdminSessionsPage /> },
      { path: "groups", element: <AdminGroupPage /> },
      { path: "questions", element: <AdminQuestionPage /> },
      {
        handle: { title: "질문" },
        path: "questions/detail",
        element: <AdminQuestionView />,
      },
      {
        path: "questions/manage",
        element: <AdminQuestionManageView />,
        handle: { title: "질문" },
      },
      {
        path: "notices",
        element: <PreparingPage />,
        handle: { title: "공지사항" },
      },
      { path: "notices/upload", element: <NoticeUploadPage /> },
      { path: "notices/:nid", element: <NoticeViewPage /> },
      { path: "notices/:nid/modify", element: <NoticeModifyPage /> },
    ],
  },
  {
    path: "sessions",
    element: <SessionTabLayout tabType="adminDashboard" />,
    handle: { title: "세션 관리 / [14기] 아기사자 - 백엔드 파트" },
    children: [
      { path: "data/management", element: <DataManagementPage /> },
      { path: "task/management", element: <TaskManagementPage /> },
      { path: "notion", element: <AdminNotionPage /> },
      { path: "dashboard/:sessionId", element: <AdminDashboardPage /> },
    ],
  },
  {
    path: "sessions/:sid",
    element: <SessionTabLayout tabType="adminDashboard" />,
    handle: { title: "세션 관리 / [14기] 아기사자 - 백엔드 파트" },
    children: [
      { path: "assignments", element: <AdminSessionAssignmentsView /> },
      { path: "assignments/upload", element: <AdminSessionAssignmentUpload /> },
      { path: "files/upload", element: <FilesUploadPage /> },
      { path: "files/:fid", element: <FilesViewPage /> },
      { path: "files/:fid/modify", element: <FilesModifyPage /> },
    ],
  },
];

export default adminRoutes;
