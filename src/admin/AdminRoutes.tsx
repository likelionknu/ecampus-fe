import { lazy, Suspense, type ReactElement } from "react";
import type { RouteObject } from "react-router-dom";
import { SessionTabLayout } from "@/shared/layouts";

const AdminSessionsPage = lazy(() =>
  import("./domains/management/pages").then((module) => ({
    default: module.AdminSessionsPage,
  })),
);

const AdminGroupPage = lazy(() =>
  import("./domains/management/pages").then((module) => ({
    default: module.AdminGroupPage,
  })),
);

const AdminQuestionPage = lazy(() =>
  import("./domains/management/pages").then((module) => ({
    default: module.AdminQuestionPage,
  })),
);

const AdminNotionPage = lazy(() =>
  import("./domains/management/pages").then((module) => ({
    default: module.AdminNotionPage,
  })),
);

const NoticeUploadPage = lazy(() =>
  import("./domains/management/pages").then((module) => ({
    default: module.NoticeUploadPage,
  })),
);

const NoticeViewPage = lazy(() =>
  import("./domains/management/pages").then((module) => ({
    default: module.NoticeViewPage,
  })),
);

const NoticeModifyPage = lazy(() =>
  import("./domains/management/pages").then((module) => ({
    default: module.NoticeModifyPage,
  })),
);

const DataManagementPage = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.DataManagementPage,
  })),
);

const TaskManagementPage = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.TaskManagementPage,
  })),
);

const FilesViewPage = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.FilesViewPage,
  })),
);

const FilesUploadPage = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.FilesUploadPage,
  })),
);

const FilesModifyPage = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.FilesModifyPage,
  })),
);

const AdminDashboardPage = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.AdminDashboardPage,
  })),
);

const AdminSessionAssignmentsView = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.AdminSessionAssignmentsView,
  })),
);

const AdminSessionAssignmentUpload = lazy(() =>
  import("./domains/session/pages").then((module) => ({
    default: module.AdminSessionAssignmentUpload,
  })),
);

const AdminQuestionView = lazy(() =>
  import("./domains/question/pages").then((module) => ({
    default: module.AdminQuestionView,
  })),
);

const AdminQuestionManageView = lazy(() =>
  import("./domains/question/pages").then((module) => ({
    default: module.AdminQuestionManageView,
  })),
);

const withSuspense = (element: ReactElement) => (
  <Suspense fallback={null}>{element}</Suspense>
);

const adminRoutes: RouteObject[] = [
  {
    element: <SessionTabLayout tabType="adminManagement" />,
    children: [
      { path: "sessions", element: withSuspense(<AdminSessionsPage />) },
      { path: "groups", element: withSuspense(<AdminGroupPage />) },
      { path: "questions", element: withSuspense(<AdminQuestionPage />) },
      {
        handle: { title: "질문" },
        path: "questions/detail",
        element: withSuspense(<AdminQuestionView />),
      },
      {
        path: "questions/manage",
        element: withSuspense(<AdminQuestionManageView />),
        handle: { title: "질문" },
      },
      { path: "notices", element: withSuspense(<AdminNotionPage />) },
      { path: "notices/upload", element: withSuspense(<NoticeUploadPage />) },
      { path: "notices/:nid", element: withSuspense(<NoticeViewPage />) },
      {
        path: "notices/:nid/modify",
        element: withSuspense(<NoticeModifyPage />),
      },
    ],
  },
  {
    path: "sessions/:sid",
    element: <SessionTabLayout tabType="adminDashboard" />,
    handle: { title: "세션 관리 / [14기] 아기사자 - 백엔드 파트" },
    children: [
      { path: "dashboard", element: withSuspense(<AdminDashboardPage />) },
      { path: "assignments", element: withSuspense(<TaskManagementPage />) },
      {
        path: "assignments/upload",
        element: withSuspense(<AdminSessionAssignmentUpload />),
      },
      {
        path: "assignments/:aid",
        element: withSuspense(<AdminSessionAssignmentsView />),
      },
      { path: "files", element: withSuspense(<DataManagementPage />) },
      { path: "files/upload", element: withSuspense(<FilesUploadPage />) },
      { path: "files/:fid", element: withSuspense(<FilesViewPage />) },
      { path: "files/:fid/modify", element: withSuspense(<FilesModifyPage />) },
    ],
  },
];

export default adminRoutes;
