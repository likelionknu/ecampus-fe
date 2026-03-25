import type { RouteObject } from "react-router-dom";
import { AdminSessionsPage, AdminGroupPage, AdminQuestionPage, AdminNotionPage, NoticeUploadPage, NoticeViewPage, NoticeModifyPage } from "./domains/management/pages";
import { SessionTabLayout } from "@/shared/layouts";
import { DataManagementPage, TaskManagementPage, FilesUploadPage, FilesViewPage, FilesModifyPage, AdminDashboardPage, AdminSessionAssignmentsView, AdminSessionAssignmentUpload } from "./domains/session/pages";
import { AdminQuestionManageView, AdminQuestionView } from "./domains/question/pages";

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
      { path: "notices", element: <AdminNotionPage /> },
      { path: "notices/upload", element: <NoticeUploadPage /> },
      { path: "notices/:nid", element: <NoticeViewPage /> },
      { path: "notices/:nid/modify", element: <NoticeModifyPage /> },
    ],
  },
  {
    path: "sessions/:sid",
    element: <SessionTabLayout tabType="adminDashboard" />,
    handle: { title: "세션 관리 / [14기] 아기사자 - 백엔드 파트" },
    children: [
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "assignments", element: <TaskManagementPage /> },
      { path: "assignments/upload", element: <AdminSessionAssignmentUpload /> },
      { path: "assignments/:aid", element: <AdminSessionAssignmentsView /> },
      { path: "files", element: <DataManagementPage /> },
      { path: "files/upload", element: <FilesUploadPage /> },
      { path: "files/:fid", element: <FilesViewPage /> },
      { path: "files/:fid/modify", element: <FilesModifyPage /> },
    ],
  },
];

export default adminRoutes;
