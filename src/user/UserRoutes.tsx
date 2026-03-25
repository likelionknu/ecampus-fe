import type { RouteObject } from "react-router-dom";
import { SessionTabLayout } from "@shared/layouts";
import { UserDashboardPage as UserDashBoardPage } from "@/user/domains/dashboard/pages";
import { UserSessionQuestionsPage, UserSessionQuestionCreatePage } from "./domains/session/pages/question";
import { UserSessionGroupPage, UserSessionSelect, UserSessionAssignments, UserSessionAssignmentsView, UserSessionFilesPage, UserSessionFilesViewPage, UserList as UserListPage } from "./domains/session/pages";
import { UserQuestionsPage } from "./domains/question/pages";
import { UserQuestionDetailPage } from "./shared/pages";
import { UserNotificationPage } from "./domains/notification/pages";

const userRoutes: RouteObject[] = [
  {
    children: [
      {
        path: "dashboard",
        element: <UserDashBoardPage />,
        handle: { title: "대시보드" },
      },
      {
        path: "sessions",
        element: <UserSessionSelect />,
        handle: { title: "세션" },
      },
      {
        path: "notification",
        element: <UserNotificationPage />,
        handle: { title: "알림" },
      },
      {
        path: "questions",
        element: <UserQuestionsPage />,
        handle: { title: "질문" },
      },
      {
        path: "list",
        element: <UserListPage />,
        handle: { title: "그룹" },
      },
      {
        path: "questions/:questionId/:sessionId",
        element: <UserQuestionDetailPage />,
        handle: { title: "질문 상세" },
      },
    ],
  },

  {
    path: "sessions/:sid",
    element: <SessionTabLayout tabType="userSession" />,
    handle: { title: "세션" },
    children: [
      { path: "files", element: <UserSessionFilesPage /> },
      { path: "files/:fileId", element: <UserSessionFilesViewPage /> },
      { path: "assignments", element: <UserSessionAssignments /> },
      {
        path: "assignments/:assignmentId",
        element: <UserSessionAssignmentsView />,
      },
      { path: "groups", element: <UserSessionGroupPage /> },
      { path: "questions", element: <UserSessionQuestionsPage /> },
      { path: "questions/new", element: <UserSessionQuestionCreatePage /> },
    ],
  },
];

export default userRoutes;
