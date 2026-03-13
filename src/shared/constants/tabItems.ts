export interface TabItemConfig {
  label: string;
  path: string;
}

export const DASHBOARD_TAG_ITEMS: TabItemConfig[] = [
  { label: "대시보드", path: "/admin/dashboard" },
  { label: "자료 관리", path: "/admin/materials" },
  { label: "과제 관리", path: "/admin/assignments" },
];

export const SESSION_MANAGEMENT_TAG_ITEMS: TabItemConfig[] = [
  { label: "세션 관리", path: "/admin/sessions" },
  { label: "사용자 및 그룹", path: "/admin/sessions/users" },
  { label: "질문 및 답변", path: "/admin/sessions/qna" },
];

export const SESSION_TAG_ITEMS: TabItemConfig[] = [
  { label: "자료", path: "/user/sessions/files" },
  { label: "과제", path: "/user/sessions/assignments" },
  { label: "사용자 및 그룹", path: "/user/sessions/group" },
  { label: "질문 및 답변", path: "/user/sessions/questions" },
];
