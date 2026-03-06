import type { RouteObject } from "react-router-dom";
import UserDashBoardPage from "@/user/domains/dashboard/pages/UserDashboardPage";
import UserSessionsPage from "./domains/session/pages/UserSeesionPage";
import UserSessionQuestionsPage from "./domains/session/pages/UserSessionQuestionsPage";
import UserSessionQuestionCreatePage from "./domains/session/pages/UserSessionQuestionCreatePage";
import SessionLayout from "./layouts/SessionLayout";
import UserSessionSelect from "./domains/session/pages/UserSessionSelect";
import UserSessionAssignments from "./domains/session/pages/UserSessionAssignments";
import UserSessionAssignmentsView from "./domains/session/pages/UserSessionAssignmentsView";
import UserSessionGroupPage from "./domains/session/pages/UserSessionGroupPage";
import UserSessionFilesPage from "./domains/session/pages/UserSessionFilesPage";
import UserSessionFilesViewPage from "./domains/session/pages/UserSessionFilesViewPage";
import UserQuestionsPage from "./domains/question/pages/UserQuestionsPage";
import UserQuestionDetailPage from "./shared/pages/UserQuestionDetailPage";
import NotificationPage from "./domains/notification/pages/NotificationPage";

const userRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <UserDashBoardPage />,
    handle: { title: "대시보드" },
  },
  // 쓰레기 경로
  {
    path: "sessions",
    element: <UserSessionsPage />,
    handle: { title: "세션" },
  },
  {
    path: "sessions/select",
    element: <UserSessionSelect />,
    handle: { title: "세션" },
  },
  {
    path: "sessions/files",
    element: <SessionLayout />,
    children: [
      { index: true, element: <UserSessionFilesPage /> },
      // path: "files/:id",
      { path: "detail", element: <UserSessionFilesViewPage /> },
    ],
  },
  {
    path: "sessions/assignments",
    element: <SessionLayout />,
    children: [
      { index: true, element: <UserSessionAssignments /> },
      // path: "assignments/:id",
      { path: "detail", element: <UserSessionAssignmentsView /> },
    ],
  },
  {
    path: "sessions/questions",
    element: <SessionLayout />,
    children: [
      { index: true, element: <UserSessionQuestionsPage /> },
      // path: "sessions/questions/:id",
      {
        path: "detail",
        element: <UserQuestionDetailPage />,
        handle: { title: "질문 상세", showDeleteButton: true },
      },
      { path: "new", element: <UserSessionQuestionCreatePage /> },
    ],
  },
  {
    path: "sessions/group",
    element: <SessionLayout />,
    children: [{ index: true, element: <UserSessionGroupPage /> }],
  },

  {
    path: "notification",
    element: <NotificationPage />,
    handle: { title: "세션" },
  },
  {
    path: "questions",
    element: <UserQuestionsPage />,
    handle: { title: "질문" },
  },
  {
    // path: "questions/:id",
    path: "questions/detail",
    element: <UserQuestionDetailPage />,
    handle: { title: "질문 상세" },
  },
];

export default userRoutes;
