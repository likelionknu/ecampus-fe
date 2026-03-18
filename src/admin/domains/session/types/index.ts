export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
}

export interface AdminDashboardMemberRow {
  id: number;
  generation: number;
  name: string;
  part: string;
  email: string;
  addedAt: string;
  inviter: string;
}

export interface SelectedUserChip {
  id: number;
  label: string;
  type: "user" | "part";
}
