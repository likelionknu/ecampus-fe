export interface TabItemConfig {
  label: string;
  path: string;
  end?: boolean;
}

export const ADMIN_DASHBOARD_TAG_ITEMS: TabItemConfig[] = [
  { label: "대시보드", path: "/admin/sessions/dashboard" },
  { label: "자료 관리", path: "/admin/sessions/data/management" },
  { label: "과제 관리", path: "/admin/sessions/task/management" },
];

export const ADMIN_MANAGEMENT_TAG_ITEMS: TabItemConfig[] = [
  { label: "세션 관리", path: "/admin/sessions", end: true },
  { label: "사용자 및 그룹", path: "/admin/groups", end: true },
  { label: "질문 및 답변", path: "/admin/question" },
  { label: "공지사항", path: "/admin/notices", end: true },
];

export const USER_SESSION_TAG_ITEMS: TabItemConfig[] = [
  { label: "자료", path: "/user/sessions/files" },
  { label: "과제", path: "/user/sessions/assignments" },
  { label: "사용자 및 그룹", path: "/user/sessions/groups" },
  { label: "질문 및 답변", path: "/user/sessions/questions" },
];
