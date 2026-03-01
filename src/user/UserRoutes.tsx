import type { RouteObject } from "react-router-dom";
import UserDashBoardPage from "@/user/domains/dashboard/pages/UserDashboardPage";
import UserSessionsPage from "./domains/session/pages/UserSeesionPage";
import SessionQuestionListPage from "./domains/session/pages/SessionQuestionListPage";
import SessionQuestionDetailPage from "./domains/session/pages/SessionQuestionDetailPage";
import SessionQuestionCreatePage from "./domains/session/pages/SessionQuestionCreatePage";
import SessionLayout from "./layouts/SessionLayout";

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
    path: "session/list",
    element: <SessionLayout />,
    children: [
      { index: true, element: <SessionQuestionListPage /> },
      // path: "session/list/:id",
      { path: "detail", element: <SessionQuestionDetailPage /> },
      { path: "new", element: <SessionQuestionCreatePage /> },
    ],
  },
];

export default userRoutes;
