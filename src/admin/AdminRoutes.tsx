import type { RouteObject } from "react-router-dom";
import AdminSessionsPage from "./domains/management/pages/AdminSessionsPage";
import PreparingPage from "@shared/pages/PreparingPage";
import SessionTabLayout from "@/shared/layouts/SessionTabLayout";
import AdminGroupPage from "./domains/management/pages/AdminGroupPage";
import AdminQuestionManageView from "./domains/question/pages/AdminQuestionManageView";
import AdminQuestionView from "./domains/question/pages/AdminQuestionView";
import AdminDashboardPage from "./domains/session/pages/AdminDashboardPage";
import AdminSessionAssignmentsView from "./domains/session/pages/AdminSessionAssignmentsView";
import AdminSessionAssignmentUpload from "./domains/session/pages/AdminSessionAssignmentUpload";

const adminRoutes: RouteObject[] = [
  {
    element: <SessionTabLayout tabType="adminSession" />,
    children: [
      { path: "sessions", element: <AdminSessionsPage /> },
      { path: "groups", element: <AdminGroupPage /> },
      {
        path: "sessions/qna",
        element: <AdminQuestionView />,
        handle: { title: "질문" },
      },
      {
        path: "sessions/qna/manage",
        element: <AdminQuestionManageView />,
        handle: { title: "질문" },
      },
      {
        path: "sessions/notices",
        element: <PreparingPage />,
        handle: { title: "공지사항" },
      },
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
