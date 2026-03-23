export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
}

export interface AdminDashboardMemberRow {
  id: number;
  course: number;
  name: string;
  part: string;
  email: string;
  registeredAt: string;
  invitedBy: string;
}

export interface SelectedUserChip {
  id: number;
  label: string;
  type: "user" | "part";
}
