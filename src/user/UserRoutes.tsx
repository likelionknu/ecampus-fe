import { lazy, Suspense, type ReactElement } from "react";
import type { RouteObject } from "react-router-dom";
import { SessionTabLayout } from "@shared/layouts";

const UserDashboardPage = lazy(() =>
  import("@/user/domains/dashboard/pages").then((module) => ({
    default: module.UserDashboardPage,
  })),
);
const UserSessionQuestionsPage = lazy(() =>
  import("./domains/session/pages/question").then((module) => ({
    default: module.UserSessionQuestionsPage,
  })),
);
const UserSessionQuestionCreatePage = lazy(() =>
  import("./domains/session/pages/question").then((module) => ({
    default: module.UserSessionQuestionCreatePage,
  })),
);
const UserSessionGroupPage = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.UserSessionGroupPage,
  })),
);
const UserSessionSelect = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.UserSessionSelect,
  })),
);
const UserSessionAssignments = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.UserSessionAssignments,
  })),
);
const UserSessionAssignmentsView = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.UserSessionAssignmentsView,
  })),
);
const UserSessionFilesPage = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.UserSessionFilesPage,
  })),
);
const UserSessionFilesViewPage = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.UserSessionFilesViewPage,
  })),
);
const UserListPage = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.UserList,
  })),
);
const UserQuestionsPage = lazy(() =>
  import("./domains/question/pages").then((module) => ({
    default: module.UserQuestionsPage,
  })),
);
const UserQuestionDetailPage = lazy(() =>
  import("./shared/pages").then((module) => ({
    default: module.UserQuestionDetailPage,
  })),
);
const UserNotificationPage = lazy(() =>
  import("./domains/notification/pages").then((module) => ({
    default: module.UserNotificationPage,
  })),
);

const withSuspense = (element: ReactElement) => (
  <Suspense fallback={null}>{element}</Suspense>
);

const userRoutes: RouteObject[] = [
  {
    children: [
      {
        path: "dashboard",
        element: withSuspense(<UserDashboardPage />),
        handle: { title: "대시보드" },
      },
      {
        path: "sessions",
        element: withSuspense(<UserSessionSelect />),
        handle: { title: "세션" },
      },
      {
        path: "notification",
        element: withSuspense(<UserNotificationPage />),
        handle: { title: "알림" },
      },
      {
        path: "questions",
        element: withSuspense(<UserQuestionsPage />),
        handle: { title: "질문" },
      },
      {
        path: "list",
        element: withSuspense(<UserListPage />),
        handle: { title: "그룹" },
      },
      {
        path: "questions/:questionId/:sessionId",
        element: withSuspense(<UserQuestionDetailPage />),
        handle: { title: "질문 상세" },
      },
    ],
  },

  {
    path: "sessions/:sid",
    element: <SessionTabLayout tabType="userSession" />,
    handle: { title: "세션" },
    children: [
      { path: "files", element: withSuspense(<UserSessionFilesPage />) },
      {
        path: "files/:fileId",
        element: withSuspense(<UserSessionFilesViewPage />),
      },
      {
        path: "assignments",
        element: withSuspense(<UserSessionAssignments />),
      },
      {
        path: "assignments/:assignmentId",
        element: withSuspense(<UserSessionAssignmentsView />),
      },
      { path: "groups", element: withSuspense(<UserSessionGroupPage />) },
      {
        path: "questions",
        element: withSuspense(<UserSessionQuestionsPage />),
      },
      {
        path: "questions/new",
        element: withSuspense(<UserSessionQuestionCreatePage />),
      },
    ],
  },
];

export default userRoutes;
