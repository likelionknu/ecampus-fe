export interface TabItemConfig {
  label: string;
  path: string;
  end?: boolean;
}

export const SESSION_DASHBOARD_TAG_ITEMS: TabItemConfig[] = [
  { label: "대시보드", path: "/admin/dashboard" },
  { label: "자료 관리", path: "/admin/materials" },
  { label: "과제 관리", path: "/admin/assignments" },
];

export const SESSION_MANAGEMENT_TAG_ITEMS: TabItemConfig[] = [
  { label: "세션 관리", path: "/admin/sessions", end: true },
  { label: "사용자 및 그룹", path: "/admin/sessions/group", end: true },
  { label: "질문 및 답변", path: "/admin/sessions/qna", end: true },
  { label: "공지사항", path: "/admin/sessions/qna", end: true },
];

export const SESSION_TAG_ITEMS: TabItemConfig[] = [
  { label: "자료", path: "/user/sessions/files" },
  { label: "과제", path: "/user/sessions/assignments" },
  { label: "사용자 및 그룹", path: "/user/sessions/group" },
  { label: "질문 및 답변", path: "/user/sessions/questions" },
];
