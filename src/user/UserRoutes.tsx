import type { RouteObject } from "react-router-dom";
import UserDashBoardPage from "@/user/domains/dashboard/pages/UserDashboardPage";
import UserSessionsPage from "./domains/session/pages/UserSeesionPage";
import UserSessionQuestionListPage from "./domains/session/pages/UserSessionQuestionListPage";
import UserSessionQuestionDetailPage from "./domains/session/pages/UserSessionQuestionDetailPage";
import UserSessionQuestionCreatePage from "./domains/session/pages/UserSessionQuestionCreatePage";
import SessionLayout from "./layouts/SessionLayout";
import UserSessionAssignments from "./domains/session/pages/UserSessionAssignments";
import UserSessionAssignmentsView from "./domains/session/pages/UserSessionAssignmentsView";

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
    path: "session/assignments",
    element: <SessionLayout />,
    children: [
      { index: true, element: <UserSessionAssignments /> },
      // path: "questions/list/:id",
      { path: "detail", element: <UserSessionAssignmentsView /> },
    ],
  },
];

export default userRoutes;
