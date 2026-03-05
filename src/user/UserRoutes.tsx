import type { RouteObject } from "react-router-dom";
import UserDashBoardPage from "@/user/domains/dashboard/pages/UserDashboardPage";
import UserSessionsPage from "./domains/session/pages/UserSeesionPage";
import UserSessionQuestionsPage from "./domains/session/pages/UserSessionQuestionsPage";
import UserSessionQuestionCreatePage from "./domains/session/pages/UserSessionQuestionCreatePage";
import SessionLayout from "./layouts/SessionLayout";
import UserQuestionsPage from "./domains/question/pages/UserQuestionsPage";
import UserQuestionDetailPage from "./shared/pages/UserQuestionDetailPage";
import NotificationPage from "./domains/notification/pages/NotificationPage";

const userRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <UserDashBoardPage />,
    handle: { title: "대시보드" },
  },
  {
    path: "sessions",
    element: <UserSessionsPage />,
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
  {
    path: "notification",
    element: <NotificationPage />,
    handle: { title: "세션" },
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
];

export default userRoutes;
