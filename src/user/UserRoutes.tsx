import type { RouteObject } from "react-router-dom";
import UserDashBoardPage from "@/user/domains/dashboard/pages/UserDashboardPage";
import UserSessionsPage from "./domains/session/pages/UserSeesionPage";
import UserSessionQuestionsPage from "./domains/session/pages/UserSessionQuestionsPage";
import UserSessionQuestionDetailPage from "./domains/session/pages/UserSessionQuestionDetailPage";
import UserSessionQuestionCreatePage from "./domains/session/pages/UserSessionQuestionCreatePage";
import SessionLayout from "./layouts/SessionLayout";
import UserQuestionsPage from "./domains/question/pages/UserQuestionsPage";

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
    path: "session/questions",
    element: <SessionLayout />,
    children: [
      { index: true, element: <UserSessionQuestionsPage /> },
      // path: "questions/list/:id",
      { path: "detail", element: <UserSessionQuestionDetailPage /> },
      { path: "new", element: <UserSessionQuestionCreatePage /> },
    ],
  },
];

export default userRoutes;

