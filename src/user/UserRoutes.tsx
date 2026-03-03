import type { RouteObject } from "react-router-dom";
import UserDashBoardPage from "@/user/domains/dashboard/pages/UserDashboardPage";
import UserSessionsPage from "./domains/session/pages/UserSeesionPage";
import UserSessionQuestionListPage from "./domains/session/pages/UserSessionQuestionListPage";
import UserSessionQuestionDetailPage from "./domains/session/pages/UserSessionQuestionDetailPage";
import UserSessionQuestionCreatePage from "./domains/session/pages/UserSessionQuestionCreatePage";
import SessionLayout from "./layouts/SessionLayout";
import UserSessionFilesPage from "./domains/session/pages/UserSessionFilesPage";
import UserSessionFilesViewPage from "./domains/session/pages/UserSessionFilesViewPage";

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
    path: "session/questions",
    element: <SessionLayout />,
    children: [
      { index: true, element: <UserSessionQuestionListPage /> },
      // path: "questions/list/:id",
      { path: "detail", element: <UserSessionQuestionDetailPage /> },
      { path: "new", element: <UserSessionQuestionCreatePage /> },
    ],
  },
  {
    path: "session/files",
    element: <SessionLayout />,
    children: [
      { index: true, element: <UserSessionFilesPage /> },
      // path: "files/list/:id",
      { path: "detail", element: <UserSessionFilesViewPage /> },
    ],
  },
];

export default userRoutes;
