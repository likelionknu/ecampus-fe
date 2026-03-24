import type { RouteObject } from "react-router-dom";
import SessionTabLayout from "@shared/layouts/SessionTabLayout";
import UserDashBoardPage from "@/user/domains/dashboard/pages/UserDashboardPage";
import UserSessionQuestionsPage from "./domains/session/pages/question/UserSessionQuestionsPage";
import UserSessionQuestionCreatePage from "./domains/session/pages/question/UserSessionQuestionCreatePage";
import UserSessionGroupPage from "./domains/session/pages/UserSessionGroupPage";
import UserSessionSelect from "./domains/session/pages/UserSessionSelect";
import UserSessionAssignments from "./domains/session/pages/UserSessionAssignments";
import UserSessionAssignmentsView from "./domains/session/pages/UserSessionAssignmentsView";
import UserSessionFilesPage from "./domains/session/pages/UserSessionFilesPage";
import UserSessionFilesViewPage from "./domains/session/pages/UserSessionFilesViewPage";
import UserQuestionsPage from "./domains/question/pages/UserQuestionsPage";
import UserQuestionDetailPage from "./shared/pages/UserQuestionDetailPage";
import UserListPage from "./domains/session/pages/UserList";
import UserNotificationPage from "./domains/notification/pages/UserNotificationPage";

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
